import { useEffect, useState } from "react";
import { Plus, Search, MoreHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { fetchParticipants, addParticipant, Participant } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

const statusColor: Record<string, string> = {
  Active: "bg-surface-sage text-secondary",
  "On Hold": "bg-surface-peach text-primary",
  Discharged: "bg-muted text-muted-foreground",
};

const Participants = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const [newParticipant, setNewParticipant] = useState({
    name: "",
    ndis_number: "",
    primary_service: "",
    support_coordinator: "",
    status: "Active" as "Active" | "On Hold" | "Discharged",
    joined_at: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    loadParticipants();
  }, []);

  const loadParticipants = async () => {
    try {
      setLoading(true);
      const data = await fetchParticipants();
      setParticipants(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load participants');
    } finally {
      setLoading(false);
    }
  };

  const filtered = participants.filter(
    (p) =>
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.ndis_number.includes(q) ||
      p.primary_service.toLowerCase().includes(q.toLowerCase())
  );

  const handleAddParticipant = async () => {
    try {
      await addParticipant(newParticipant);
      setDialogOpen(false);
      loadParticipants();
      setNewParticipant({
        name: "",
        ndis_number: "",
        primary_service: "",
        support_coordinator: "",
        status: "Active",
        joined_at: new Date().toISOString().split('T')[0],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add participant');
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-display font-bold">Participants</h2>
            <p className="text-muted-foreground text-sm">Manage everyone receiving support.</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="rounded-full">
                <Plus className="w-4 h-4" /> Add Participant
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Participant</DialogTitle>
              </DialogHeader>
              <form onSubmit={(e) => { e.preventDefault(); handleAddParticipant(); }} className="space-y-4">
                <Input 
                  placeholder="Full Name" 
                  value={newParticipant.name}
                  onChange={(e) => setNewParticipant({...newParticipant, name: e.target.value})}
                  required 
                />
                <Input 
                  placeholder="NDIS Number" 
                  value={newParticipant.ndis_number}
                  onChange={(e) => setNewParticipant({...newParticipant, ndis_number: e.target.value})}
                  required 
                />
                <Input 
                  placeholder="Primary Service" 
                  value={newParticipant.primary_service}
                  onChange={(e) => setNewParticipant({...newParticipant, primary_service: e.target.value})}
                  required 
                />
                <Input 
                  placeholder="Support Coordinator" 
                  value={newParticipant.support_coordinator}
                  onChange={(e) => setNewParticipant({...newParticipant, support_coordinator: e.target.value})}
                  required 
                />
                <Input 
                  type="date" 
                  value={newParticipant.joined_at}
                  onChange={(e) => setNewParticipant({...newParticipant, joined_at: e.target.value})}
                  required 
                />
                <Select 
                  value={newParticipant.status}
                  onValueChange={(value: "Active" | "On Hold" | "Discharged") => setNewParticipant({...newParticipant, status: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="On Hold">On Hold</SelectItem>
                    <SelectItem value="Discharged">Discharged</SelectItem>
                  </SelectContent>
                </Select>
                <Button type="submit" className="w-full">Add Participant</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-destructive/10 text-destructive text-sm">
            {error}
          </div>
        )}

        <Card className="p-5 rounded-2xl border-border/60">
          <div className="relative mb-4">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, NDIS #, or service..." className="pl-9 rounded-full bg-muted/50 border-transparent" />
          </div>

          <div className="rounded-xl border border-border/60 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead>Participant</TableHead>
                  <TableHead>NDIS #</TableHead>
                  <TableHead>Primary Service</TableHead>
                  <TableHead>Coordinator</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Joined</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary-soft text-primary flex items-center justify-center font-semibold text-sm">
                          {p.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <span className="font-medium">{p.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{p.ndis_number}</TableCell>
                    <TableCell>{p.primary_service}</TableCell>
                    <TableCell className="text-muted-foreground">{p.support_coordinator}</TableCell>
                    <TableCell>
                      <Badge className={cn("rounded-full font-medium", statusColor[p.status])} variant="secondary">{p.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground text-sm">
                      {new Date(p.joined_at).toLocaleDateString("en-AU")}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">No participants found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Participants;