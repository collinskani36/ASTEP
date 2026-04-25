import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Mail, Phone, Calendar, ChevronDown, ChevronUp, MessageSquare } from "lucide-react";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  service_slug: string;
  service_title: string;
  message: string;
  status: string;
  created_at: string;
}

const statusColors = {
  New: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Contacted: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  Converted: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Archived: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
};

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const { data, error } = await supabase
        .from("enquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setEnquiries(data || []);
    } catch (error) {
      console.error("Error fetching enquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("enquiries")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;
      
      setEnquiries(enquiries.map(e => 
        e.id === id ? { ...e, status: newStatus } : e
      ));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-display font-bold tracking-tight">Service Enquiries</h2>
            <p className="text-muted-foreground mt-1">
              Manage and respond to service enquiries from potential participants
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading enquiries...</div>
        ) : enquiries.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No enquiries yet</h3>
              <p className="text-muted-foreground">Enquiries from the website will appear here.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {enquiries.map((enquiry) => (
              <Card key={enquiry.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {enquiry.name}
                        <Badge className={statusColors[enquiry.status as keyof typeof statusColors]}>
                          {enquiry.status}
                        </Badge>
                      </CardTitle>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5" /> {enquiry.email}
                        </span>
                        {enquiry.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5" /> {enquiry.phone}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" /> 
                          {format(new Date(enquiry.created_at), "MMM dd, yyyy")}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedId(expandedId === enquiry.id ? null : enquiry.id)}
                    >
                      {expandedId === enquiry.id ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                
                {expandedId === enquiry.id && (
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-sm mb-1">Service Interested In:</h4>
                        <p className="text-muted-foreground">{enquiry.service_title}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-1">Message:</h4>
                        <p className="text-muted-foreground leading-relaxed">{enquiry.message}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-2">Update Status:</h4>
                        <div className="flex gap-2">
                          {Object.keys(statusColors).map((status) => (
                            <Button
                              key={status}
                              size="sm"
                              variant={enquiry.status === status ? "default" : "outline"}
                              onClick={() => updateStatus(enquiry.id, status)}
                            >
                              {status}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Enquiries;