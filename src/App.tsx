import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DemoModalProvider } from "@/components/layout/DemoModal";
import { SiteLayout } from "@/components/layout/SiteLayout";
import Index from "./pages/Index";
import { OwnerPage, CRMPage, PMSPage, RevenuePage, OperationsPage, AIPage, IntegrationsPage, SecurityPage } from "./pages/ProductPages";
import NotFound from "./pages/NotFound";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DemoModalProvider>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/owner" element={<OwnerPage />} />
              <Route path="/crm" element={<CRMPage />} />
              <Route path="/pms" element={<PMSPage />} />
              <Route path="/revenue-management" element={<RevenuePage />} />
              <Route path="/operations" element={<OperationsPage />} />
              <Route path="/ai" element={<AIPage />} />
              <Route path="/integrations" element={<IntegrationsPage />} />
              <Route path="/security" element={<SecurityPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DemoModalProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
