import { supabase } from '@/lib/supabase';

export type Participant = {
  id: string;
  name: string;
  ndis_number: string;
  primary_service: string;
  support_coordinator: string;
  status: "Active" | "On Hold" | "Discharged";
  joined_at: string;
  created_at?: string;
};

export type SupportSession = {
  id: string;
  participant_id: string;
  participant_name: string;
  service: string;
  worker: string;
  date: string;
  hours: number;
  rate: number;
  notes: string;
  status: "Completed" | "Scheduled" | "Cancelled";
  created_at?: string;
};

export type Claim = {
  id: string;
  claim_number: string;
  participant_name: string;
  ndis_number: string;
  period_start: string;
  period_end: string;
  amount: number;
  submitted_at: string | null;
  status: "Draft" | "Submitted" | "Paid" | "Rejected";
  created_at?: string;
};

export type StaffMember = {
  id: string;
  name: string;
  role: string;
  email: string;
  active_participants: number;
  hours_this_month: number;
  created_at?: string;
};

export type MonthlyRevenue = {
  id?: string;
  month: string;
  revenue: number;
  created_at?: string;
};

export type SessionsByService = {
  id?: string;
  service: string;
  sessions: number;
  created_at?: string;
};

export type DashboardKPI = {
  id?: string;
  metric_name: string;
  metric_value: number;
  updated_at?: string;
};

// Fetch functions
export async function fetchParticipants(): Promise<Participant[]> {
  const { data, error } = await supabase
    .from('participants')
    .select('*')
    .order('name');
  
  if (error) throw error;
  return data || [];
}

export async function fetchSupportSessions(): Promise<SupportSession[]> {
  const { data, error } = await supabase
    .from('support_sessions')
    .select('*')
    .order('date', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

export async function fetchClaims(): Promise<Claim[]> {
  const { data, error } = await supabase
    .from('claims')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

export async function fetchStaff(): Promise<StaffMember[]> {
  const { data, error } = await supabase
    .from('staff')
    .select('*')
    .order('name');
  
  if (error) throw error;
  return data || [];
}

export async function fetchMonthlyRevenue(): Promise<MonthlyRevenue[]> {
  const { data, error } = await supabase
    .from('monthly_revenue')
    .select('*')
    .order('created_at');
  
  if (error) throw error;
  return data || [];
}

export async function fetchSessionsByService(): Promise<SessionsByService[]> {
  const { data, error } = await supabase
    .from('sessions_by_service')
    .select('*')
    .order('sessions', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

export async function fetchDashboardKPIs() {
  const { data, error } = await supabase
    .from('dashboard_kpis')
    .select('*');
  
  if (error) throw error;
  
  const kpis: Record<string, number> = {};
  data?.forEach((kpi: DashboardKPI) => {
    kpis[kpi.metric_name] = kpi.metric_value;
  });
  
  return kpis;
}

// Insert functions
export async function addParticipant(participant: Omit<Participant, 'id' | 'created_at'>): Promise<Participant> {
  const { data, error } = await supabase
    .from('participants')
    .insert([participant])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function addSupportSession(session: Omit<SupportSession, 'id' | 'created_at'>): Promise<SupportSession> {
  const { data, error } = await supabase
    .from('support_sessions')
    .insert([session])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function addClaim(claim: Omit<Claim, 'id' | 'created_at'>): Promise<Claim> {
  const { data, error } = await supabase
    .from('claims')
    .insert([claim])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function addStaffMember(staffMember: Omit<StaffMember, 'id' | 'created_at'>): Promise<StaffMember> {
  const { data, error } = await supabase
    .from('staff')
    .insert([staffMember])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function addMonthlyRevenue(revenue: Omit<MonthlyRevenue, 'id' | 'created_at'>): Promise<MonthlyRevenue> {
  const { data, error } = await supabase
    .from('monthly_revenue')
    .insert([revenue])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(n);