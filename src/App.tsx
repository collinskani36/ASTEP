import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Services from "./pages/Services.tsx";
import ServiceDetail from "./pages/ServiceDetail.tsx";
import GroupActivitiesPage from "./pages/GroupActivitiesPage.tsx";
import WorkWithUs from "./pages/WorkWithUs.tsx";
import Blog from "./pages/Blog.tsx";
import Contact from "./pages/Contact.tsx";
import ReferToUs from "./pages/ReferToUs.tsx";
import DashboardOverview from "./pages/dashboard/Overview.tsx";
import DashboardParticipants from "./pages/dashboard/Participants.tsx";
import DashboardSessions from "./pages/dashboard/Sessions.tsx";
import DashboardReports from "./pages/dashboard/Reports.tsx";
import DashboardClaims from "./pages/dashboard/Claims.tsx";
import DashboardStaff from "./pages/dashboard/Staff.tsx";
import DashboardEnquiries from "./pages/dashboard/Enquiries.tsx";
import AboutPage from "./pages/About.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/group-activities" element={<GroupActivitiesPage />} />
          <Route path="/work-with-us" element={<WorkWithUs />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/refer-to-us" element={<ReferToUs />} />
          <Route path="/dashboard" element={<DashboardOverview />} />
          <Route path="/dashboard/participants" element={<DashboardParticipants />} />
          <Route path="/dashboard/sessions" element={<DashboardSessions />} />
          <Route path="/dashboard/enquiries" element={<DashboardEnquiries />} />
          <Route path="/dashboard/reports" element={<DashboardReports />} />
          <Route path="/dashboard/claims" element={<DashboardClaims />} />
          <Route path="/dashboard/staff" element={<DashboardStaff />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;