import { useEffect, useState } from "react";
import { Plus, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { fetchSupportSessions, addSupportSession, formatCurrency, SupportSession } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

const statusColor: Record<string, string> = {
  Completed: "bg-surface-sage text-secondary",
  Scheduled: "bg-surface-sky text-secondary",
  Cancelled: "bg-muted text-muted-foreground",
};

const SessionTable = ({ sessions, filter }: { sessions: SupportSession[]; filter: string }) => {
  const rows = filter === "all" ? sessions : sessions.filter((s) => s.status.toLowerCase() === filter);
  return (
    <div className="rounded-xl border border-border/60 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40">
            <TableHead>Date</TableHead>
            <TableHead>Participant</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Worker</TableHead>
            <TableHead className="text-right">Hours</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((s) => (
            <TableRow key={s.id}>
              <TableCell className="text-sm">{new Date(s.date).toLocaleDateString("en-AU")}</TableCell>
              <TableCell className="font-medium">{s.participant_name}</TableCell>
              <TableCell className="text-muted-foreground">{s.service}</TableCell>
              <TableCell className="text-muted-foreground">{s.worker}</TableCell>
              <TableCell className="text-right">{s.hours}h</TableCell>
              <TableCell className="text-right font-medium">{formatCurrency(s.hours * s.rate)}</TableCell>
              <TableCell>
                <Badge className={cn("rounded-full", statusColor[s.status])} variant="secondary">{s.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const Sessions = () => {
  const [sessions, setSessions] = useState<SupportSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const [newSession, setNewSession] = useState({
    participant_id: "",
    participant_name: "",
    service: "",
    worker: "",
    date: new Date().toISOString().split('T')[0],
    hours: 1,
    rate: 67.56,
    notes: "",
    status: "Scheduled" as "Scheduled" | "Completed" | "Cancelled",
  });

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      setLoading(true);
      const data = await fetchSupportSessions();
      setSessions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load sessions');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSession = async () => {
    try {
      await addSupportSession({
        ...newSession,
        hours: Number(newSession.hours),
        rate: Number(newSession.rate),
      });
      setDialogOpen(false);
      loadSessions();
      setNewSession({
        participant_id: "",
        participant_name: "",
        service: "",
        worker: "",
        date: new Date().toISOString().split('T')[0],
        hours: 1,
        rate: 67.56,
        notes: "",
        status: "Scheduled",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add session');
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
            <h2 className="text-2xl font-display font-bold">Support Sessions</h2>
            <p className="text-muted-foreground text-sm">Track delivered and scheduled support.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-full">
              <Calendar className="w-4 h-4" /> Calendar
            </Button>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="rounded-full">
                  <Plus className="w-4 h-4" /> Log Session
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Log New Session</DialogTitle>
                </DialogHeader>
                <form onSubmit={(e) => { e.preventDefault(); handleAddSession(); }} className="space-y-4">
                  <Input 
                    placeholder="Participant ID" 
                    value={newSession.participant_id}
                    onChange={(e) => setNewSession({...newSession, participant_id: e.target.value})}
                    required 
                  />
                  <Input 
                    placeholder="Participant Name" 
                    value={newSession.participant_name}
                    onChange={(e) => setNewSession({...newSession, participant_name: e.target.value})}
                    required 
                  />
                  <Input 
                    placeholder="Service" 
                    value={newSession.service}
                    onChange={(e) => setNewSession({...newSession, service: e.target.value})}
                    required 
                  />
                  <Input 
                    placeholder="Worker" 
                    value={newSession.worker}
                    onChange={(e) => setNewSession({...newSession, worker: e.target.value})}
                    required 
                  />
                  <Input 
                    type="date" 
                    value={newSession.date}
                    onChange={(e) => setNewSession({...newSession, date: e.target.value})}
                    required 
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input 
                      type="number" 
                      placeholder="Hours" 
                      step="0.5"
                      value={newSession.hours}
                      onChange={(e) => setNewSession({...newSession, hours: Number(e.target.value)})}
                      required 
                    />
                    <Input 
                      type="number" 
                      placeholder="Rate" 
                      step="0.01"
                      value={newSession.rate}
                      onChange={(e) => setNewSession({...newSession, rate: Number(e.target.value)})}
                      required 
                    />
                  </div>
                  <Input 
                    placeholder="Notes" 
                    value={newSession.notes}
                    onChange={(e) => setNewSession({...newSession, notes: e.target.value})}
                  />
                  <Select 
                    value={newSession.status}
                    onValueChange={(value: "Scheduled" | "Completed" | "Cancelled") => setNewSession({...newSession, status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button type="submit" className="w-full">Log Session</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-destructive/10 text-destructive text-sm">
            {error}
          </div>
        )}

        <Card className="p-5 rounded-2xl border-border/60">
          <Tabs defaultValue="all">
            <TabsList className="rounded-full bg-muted/60">
              <TabsTrigger value="all" className="rounded-full">All</TabsTrigger>
              <TabsTrigger value="completed" className="rounded-full">Completed</TabsTrigger>
              <TabsTrigger value="scheduled" className="rounded-full">Scheduled</TabsTrigger>
              <TabsTrigger value="cancelled" className="rounded-full">Cancelled</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4"><SessionTable sessions={sessions} filter="all" /></TabsContent>
            <TabsContent value="completed" className="mt-4"><SessionTable sessions={sessions} filter="completed" /></TabsContent>
            <TabsContent value="scheduled" className="mt-4"><SessionTable sessions={sessions} filter="scheduled" /></TabsContent>
            <TabsContent value="cancelled" className="mt-4"><SessionTable sessions={sessions} filter="cancelled" /></TabsContent>
          </Tabs>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Sessions;