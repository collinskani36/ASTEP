import { useEffect, useState } from "react";
import { Download, FileText, BarChart3, Users, Wallet } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { fetchMonthlyRevenue, fetchSessionsByService, formatCurrency, MonthlyRevenue, SessionsByService } from "@/lib/dashboard-data";

const COLORS = ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--surface-peach))", "hsl(var(--surface-sky))", "hsl(var(--surface-lavender))", "hsl(var(--surface-sage))"];

const reportTemplates = [
  { title: "Monthly Service Delivery", desc: "Hours delivered by service & worker.", icon: BarChart3 },
  { title: "Participant Outcomes", desc: "Goal progress per participant.", icon: Users },
  { title: "NDIS Claims Summary", desc: "Submitted, paid & outstanding claims.", icon: Wallet },
  { title: "Compliance & Incidents", desc: "Incident reports and follow-ups.", icon: FileText },
];

const Reports = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState<MonthlyRevenue[]>([]);
  const [sessionsByService, setSessionsByService] = useState<SessionsByService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [revenueData, serviceData] = await Promise.all([
        fetchMonthlyRevenue(),
        fetchSessionsByService(),
      ]);
      setMonthlyRevenue(revenueData);
      setSessionsByService(serviceData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load report data');
    } finally {
      setLoading(false);
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-display font-bold">Reports</h2>
            <p className="text-muted-foreground text-sm">Insight & exports for management and the NDIS.</p>
          </div>
          <Button size="sm" className="rounded-full">
            <Download className="w-4 h-4" /> Export All
          </Button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-destructive/10 text-destructive text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reportTemplates.map((r) => (
            <Card key={r.title} className="p-5 rounded-2xl border-border/60 hover:shadow-card transition-smooth cursor-pointer group">
              <div className="w-11 h-11 rounded-2xl bg-primary-soft text-primary flex items-center justify-center mb-3 group-hover:scale-105 transition-smooth">
                <r.icon className="w-5 h-5" />
              </div>
              <h3 className="font-display font-semibold mb-1">{r.title}</h3>
              <p className="text-xs text-muted-foreground mb-3">{r.desc}</p>
              <Button variant="ghost" size="sm" className="rounded-full -ml-3">Generate →</Button>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="p-5 rounded-2xl border-border/60">
            <h3 className="font-display font-semibold mb-1">Revenue trend</h3>
            <p className="text-xs text-muted-foreground mb-4">Claims paid over the last 6 months</p>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} formatter={(v: number) => formatCurrency(v)} />
                  <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5 rounded-2xl border-border/60">
            <h3 className="font-display font-semibold mb-1">Service mix</h3>
            <p className="text-xs text-muted-foreground mb-4">Share of sessions by service line</p>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={sessionsByService} dataKey="sessions" nameKey="service" innerRadius={60} outerRadius={95} paddingAngle={3}>
                    {sessionsByService.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;