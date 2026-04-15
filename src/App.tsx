import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import AdminLayout from "./pages/AdminLayout.tsx";
import AdminSettings from "./pages/admin/AdminSettings.tsx";
import AdminProjects from "./pages/admin/AdminProjects.tsx";
import AdminMilestones from "./pages/admin/AdminMilestones.tsx";
import AdminCurrently from "./pages/admin/AdminCurrently.tsx";
import AdminSocial from "./pages/admin/AdminSocial.tsx";
import AdminFooter from "./pages/admin/AdminFooter.tsx";
import AdminWhatIBuild from "./pages/admin/AdminWhatIBuild.tsx";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAdmin, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><p className="text-muted-foreground text-sm font-mono">loading...</p></div>;
  if (!user || !isAdmin) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<Navigate to="/admin/settings" replace />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="what-i-build" element={<AdminWhatIBuild />} />
              <Route path="milestones" element={<AdminMilestones />} />
              <Route path="currently" element={<AdminCurrently />} />
              <Route path="social" element={<AdminSocial />} />
              <Route path="footer" element={<AdminFooter />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
