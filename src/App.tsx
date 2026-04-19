import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import AppShowcase from "./pages/AppShowcase.tsx";
import Auth from "./pages/Auth.tsx";
import JoinCommunity from "./pages/JoinCommunity.tsx";
import Events from "./pages/Events.tsx";
import NotFound from "./pages/NotFound.tsx";
import InvestorProfile from "./pages/InvestorProfile.tsx";
import MentorSpotlight from "./pages/MentorSpotlight.tsx";
import StartupSandbox from "./pages/StartupSandbox.tsx";
import TeamHierarchy from "./pages/TeamHierarchy.tsx";
import NdaRedirect from "./pages/NdaRedirect.tsx";
import TeamHierarchyNdaGate from "./pages/TeamHierarchyNdaGate.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/apps" element={<AppShowcase />} />
          <Route path="/events" element={<Events />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/join" element={<JoinCommunity />} />
          <Route path="/investors/:slug" element={<InvestorProfile />} />
          <Route path="/mentor-spotlight" element={<MentorSpotlight />} />
          <Route path="/team-hierarchy" element={<TeamHierarchy />} />
          <Route path="/team-hierarchy/nda" element={<TeamHierarchyNdaGate />} />
          <Route path="/nda" element={<NdaRedirect />} />
          <Route path="/startup-sandbox" element={<StartupSandbox />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
