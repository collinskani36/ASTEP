import { useEffect, useState } from "react";
import { Users, CalendarCheck, Clock, Wallet, Receipt } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import {
  fetchSupportSessions,
  fetchMonthlyRevenue,
  fetchSessionsByService,
  fetchDashboardKPIs,
  addSupportSession,
  formatCurrency,
  SupportSession,
  MonthlyRevenue,
  SessionsByService,
} from "@/lib/dashboard-data";

const Overview = () => {
  const [sessions, setSessions] = useState<SupportSession[]>([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState<MonthlyRevenue[]>([]);
  const [sessionsByService, setSessionsByService] = useState<SessionsByService[]>([]);
  const [kpis, setKpis] = useState({ activeParticipants: 0, sessionsThisMonth: 0, hoursDelivered: 0, pendingClaimsAmount: 0, paidThisMonth: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Form state for new session
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
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [sessionsData, revenueData, serviceData, kpiData] = await Promise.all([
        fetchSupportSessions(),
        fetchMonthlyRevenue(),
        fetchSessionsByService(),
        fetchDashboardKPIs(),
      ]);
      
      setSessions(sessionsData);
      setMonthlyRevenue(revenueData);
      setSessionsByService(serviceData);
      
      setKpis({
        activeParticipants: kpiData.active_participants || 0,
        sessionsThisMonth: kpiData.sessions_this_month || 0,
        hoursDelivered: kpiData.hours_delivered || 0,
        pendingClaimsAmount: kpiData.pending_claims_amount || 0,
        paidThisMonth: kpiData.paid_this_month || 0,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const upcoming = sessions
    .filter((s) => s.status === "Scheduled")
    .slice(0, 5);

  const handleAddSession = async () => {
    try {
      await addSupportSession({
        ...newSession,
        hours: Number(newSession.hours),
        rate: Number(newSession.rate),
      });
      setDialogOpen(false);
      loadData();
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
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold">Welcome back, Ledama👋</h2>
            <p className="text-muted-foreground mt-1">Here's what's happening at Astep today.</p>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-destructive/10 text-destructive text-sm">
            {error}
          </div>
        )}

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard label="Active Participants" value={String(kpis.activeParticipants)} icon={Users} accent="lavender" trend={{ value: "+2 this month", direction: "up" }} />
          <StatCard label="Sessions This Month" value={String(kpis.sessionsThisMonth)} icon={CalendarCheck} accent="sage" trend={{ value: "+12% vs last", direction: "up" }} />
          <StatCard label="Hours Delivered" value={`${kpis.hoursDelivered}h`} icon={Clock} accent="peach" />
          <StatCard label="Pending Claims" value={formatCurrency(kpis.pendingClaimsAmount)} icon={Receipt} accent="sky" />
          <StatCard label="Paid This Month" value={formatCurrency(kpis.paidThisMonth)} icon={Wallet} accent="sage" trend={{ value: "+8.4%", direction: "up" }} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2 p-5 rounded-2xl border-border/60">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display font-semibold">Revenue (claims paid)</h3>
                <p className="text-xs text-muted-foreground">Last 6 months</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline" className="rounded-full">Add Revenue</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Monthly Revenue</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={(e) => { e.preventDefault(); /* Add revenue logic */ }} className="space-y-4">
                    <Input placeholder="Month (e.g., Jan)" required />
                    <Input type="number" placeholder="Revenue" step="0.01" required />
                    <Button type="submit">Add Revenue</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyRevenue}>
                  <defs>
                    <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }}
                    formatter={(v: number) => formatCurrency(v)}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#rev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5 rounded-2xl border-border/60">
            <div className="mb-4">
              <h3 className="font-display font-semibold">Sessions by Service</h3>
              <p className="text-xs text-muted-foreground">This month</p>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sessionsByService} layout="vertical" margin={{ left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis type="category" dataKey="service" stroke="hsl(var(--muted-foreground))" fontSize={12} width={80} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
                  <Bar dataKey="sessions" fill="hsl(var(--secondary))" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Upcoming sessions */}
        <Card className="p-5 rounded-2xl border-border/60">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h3 className="font-display font-semibold">Upcoming sessions</h3>
              <Badge variant="secondary" className="rounded-full">{upcoming.length} scheduled</Badge>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="rounded-full">
                  Add Session
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Support Session</DialogTitle>
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
                  <Button type="submit" className="w-full">Add Session</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <div className="divide-y divide-border/60">
            {upcoming.map((s) => (
              <div key={s.id} className="py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-medium truncate">{s.participant_name}</p>
                  <p className="text-xs text-muted-foreground truncate">{s.service} • {s.worker}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-medium">{new Date(s.date).toLocaleDateString("en-AU", { weekday: "short", day: "numeric", month: "short" })}</p>
                  <p className="text-xs text-muted-foreground">{s.hours}h</p>
                </div>
              </div>
            ))}
            {upcoming.length === 0 && <p className="text-sm text-muted-foreground py-6 text-center">No upcoming sessions.</p>}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Overview;
