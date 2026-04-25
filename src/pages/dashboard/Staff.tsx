import { useEffect, useState } from "react";
import { Plus, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { fetchStaff, addStaffMember, StaffMember } from "@/lib/dashboard-data";

const Staff = () => {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const [newStaff, setNewStaff] = useState({
    name: "",
    role: "",
    email: "",
    active_participants: 0,
    hours_this_month: 0,
  });

  useEffect(() => {
    loadStaff();
  }, []);

  const loadStaff = async () => {
    try {
      setLoading(true);
      const data = await fetchStaff();
      setStaff(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load staff');
    } finally {
      setLoading(false);
    }
  };

  const handleAddStaff = async () => {
    try {
      await addStaffMember({
        ...newStaff,
        active_participants: Number(newStaff.active_participants),
        hours_this_month: Number(newStaff.hours_this_month),
      });
      setDialogOpen(false);
      loadStaff();
      setNewStaff({
        name: "",
        role: "",
        email: "",
        active_participants: 0,
        hours_this_month: 0,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add staff member');
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
            <h2 className="text-2xl font-display font-bold">Staff</h2>
            <p className="text-muted-foreground text-sm">Coordinators, support workers and practitioners.</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="rounded-full">
                <Plus className="w-4 h-4" /> Invite Staff
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Staff Member</DialogTitle>
              </DialogHeader>
              <form onSubmit={(e) => { e.preventDefault(); handleAddStaff(); }} className="space-y-4">
                <Input 
                  placeholder="Full Name" 
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                  required 
                />
                <Input 
                  placeholder="Role" 
                  value={newStaff.role}
                  onChange={(e) => setNewStaff({...newStaff, role: e.target.value})}
                  required 
                />
                <Input 
                  type="email" 
                  placeholder="Email" 
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                  required 
                />
                <Input 
                  type="number" 
                  placeholder="Active Participants" 
                  value={newStaff.active_participants}
                  onChange={(e) => setNewStaff({...newStaff, active_participants: Number(e.target.value)})}
                  required 
                />
                <Input 
                  type="number" 
                  placeholder="Hours This Month" 
                  value={newStaff.hours_this_month}
                  onChange={(e) => setNewStaff({...newStaff, hours_this_month: Number(e.target.value)})}
                  required 
                />
                <Button type="submit" className="w-full">Add Staff</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-destructive/10 text-destructive text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {staff.map((s) => (
            <Card key={s.id} className="p-5 rounded-2xl border-border/60 hover:shadow-card transition-smooth">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-soft text-primary flex items-center justify-center font-semibold">
                  {s.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <p className="font-display font-semibold truncate">{s.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{s.role}</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="p-3 rounded-xl bg-muted/40">
                  <p className="text-xs text-muted-foreground">Participants</p>
                  <p className="font-display font-bold text-lg">{s.active_participants}</p>
                </div>
                <div className="p-3 rounded-xl bg-muted/40">
                  <p className="text-xs text-muted-foreground">Hours / mo</p>
                  <p className="font-display font-bold text-lg">{s.hours_this_month}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="rounded-full w-full mt-4">
                <Mail className="w-4 h-4" /> {s.email}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Staff;