import { useEffect, useState } from "react";
import { Plus, Download, FileCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { fetchClaims, addClaim, formatCurrency, Claim } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

const statusColor: Record<string, string> = {
  Paid: "bg-surface-sage text-secondary",
  Submitted: "bg-surface-sky text-secondary",
  Draft: "bg-muted text-muted-foreground",
  Rejected: "bg-destructive/10 text-destructive",
};

const Claims = () => {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const [newClaim, setNewClaim] = useState({
    claim_number: "",
    participant_name: "",
    ndis_number: "",
    period_start: "",
    period_end: "",
    amount: 0,
    submitted_at: null as string | null,
    status: "Draft" as "Draft" | "Submitted" | "Paid" | "Rejected",
  });

  useEffect(() => {
    loadClaims();
  }, []);

  const loadClaims = async () => {
    try {
      setLoading(true);
      const data = await fetchClaims();
      setClaims(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load claims');
    } finally {
      setLoading(false);
    }
  };

  const handleAddClaim = async () => {
    try {
      await addClaim({
        ...newClaim,
        amount: Number(newClaim.amount),
        submitted_at: newClaim.submitted_at || null,
      });
      setDialogOpen(false);
      loadClaims();
      setNewClaim({
        claim_number: "",
        participant_name: "",
        ndis_number: "",
        period_start: "",
        period_end: "",
        amount: 0,
        submitted_at: null,
        status: "Draft",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add claim');
    }
  };

  const totalPaid = claims.filter((c) => c.status === "Paid").reduce((s, c) => s + c.amount, 0);
  const totalSubmitted = claims.filter((c) => c.status === "Submitted").reduce((s, c) => s + c.amount, 0);
  const totalDraft = claims.filter((c) => c.status === "Draft").reduce((s, c) => s + c.amount, 0);
  const totalRejected = claims.filter((c) => c.status === "Rejected").reduce((s, c) => s + c.amount, 0);

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
            <h2 className="text-2xl font-display font-bold">NDIS Claims</h2>
            <p className="text-muted-foreground text-sm">Submit, track and reconcile government claims.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-full">
              <Download className="w-4 h-4" /> Export Bulk File
            </Button>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="rounded-full">
                  <Plus className="w-4 h-4" /> New Claim
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Claim</DialogTitle>
                </DialogHeader>
                <form onSubmit={(e) => { e.preventDefault(); handleAddClaim(); }} className="space-y-4">
                  <Input 
                    placeholder="Claim Number" 
                    value={newClaim.claim_number}
                    onChange={(e) => setNewClaim({...newClaim, claim_number: e.target.value})}
                    required 
                  />
                  <Input 
                    placeholder="Participant Name" 
                    value={newClaim.participant_name}
                    onChange={(e) => setNewClaim({...newClaim, participant_name: e.target.value})}
                    required 
                  />
                  <Input 
                    placeholder="NDIS Number" 
                    value={newClaim.ndis_number}
                    onChange={(e) => setNewClaim({...newClaim, ndis_number: e.target.value})}
                    required 
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input 
                      type="date" 
                      placeholder="Period Start"
                      value={newClaim.period_start}
                      onChange={(e) => setNewClaim({...newClaim, period_start: e.target.value})}
                      required 
                    />
                    <Input 
                      type="date" 
                      placeholder="Period End"
                      value={newClaim.period_end}
                      onChange={(e) => setNewClaim({...newClaim, period_end: e.target.value})}
                      required 
                    />
                  </div>
                  <Input 
                    type="number" 
                    placeholder="Amount" 
                    step="0.01"
                    value={newClaim.amount}
                    onChange={(e) => setNewClaim({...newClaim, amount: Number(e.target.value)})}
                    required 
                  />
                  <Input 
                    type="date" 
                    placeholder="Submitted Date"
                    value={newClaim.submitted_at || ""}
                    onChange={(e) => setNewClaim({...newClaim, submitted_at: e.target.value || null})}
                  />
                  <Select 
                    value={newClaim.status}
                    onValueChange={(value: "Draft" | "Submitted" | "Paid" | "Rejected") => setNewClaim({...newClaim, status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Submitted">Submitted</SelectItem>
                      <SelectItem value="Paid">Paid</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button type="submit" className="w-full">Add Claim</Button>
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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Paid" value={formatCurrency(totalPaid)} icon={FileCheck} accent="sage" />
          <StatCard label="Submitted" value={formatCurrency(totalSubmitted)} icon={FileCheck} accent="sky" />
          <StatCard label="Draft" value={formatCurrency(totalDraft)} icon={FileCheck} accent="peach" />
          <StatCard label="Rejected" value={formatCurrency(totalRejected)} icon={FileCheck} accent="lavender" />
        </div>

        <Card className="p-5 rounded-2xl border-border/60">
          <div className="rounded-xl border border-border/60 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead>Claim #</TableHead>
                  <TableHead>Participant</TableHead>
                  <TableHead>NDIS #</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {claims.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-mono text-xs">{c.claim_number}</TableCell>
                    <TableCell className="font-medium">{c.participant_name}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{c.ndis_number}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(c.period_start).toLocaleDateString("en-AU", { day: "numeric", month: "short" })} – {new Date(c.period_end).toLocaleDateString("en-AU", { day: "numeric", month: "short" })}
                    </TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(c.amount)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {c.submitted_at ? new Date(c.submitted_at).toLocaleDateString("en-AU") : "—"}
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("rounded-full", statusColor[c.status])} variant="secondary">{c.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="rounded-full">View</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Claims;