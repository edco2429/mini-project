
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import RoleSelection from "./pages/RoleSelection";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/About";
import { useAuth } from "./context/AuthContext";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/role-selection" replace />;
  }
  
  return <>{children}</>;
};

// Auth routes component to handle authentication state
const AuthRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

// Role protected route
const TeacherProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading, role } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/role-selection" replace />;
  }
  
  if (role !== 'teacher' && role !== 'committee') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

// Committee protected route
const CommitteeProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading, role } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/role-selection" replace />;
  }
  
  if (role !== 'committee') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

// Settings Component
const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        {children}
      </div>
    </div>
  );
};

// Settings pages (placeholders)
const ProfileSettings = () => (
  <SettingsLayout>
    <h2 className="text-2xl font-semibold mb-4">Profile Settings</h2>
    <p className="text-muted-foreground">Manage your profile information and preferences.</p>
  </SettingsLayout>
);

const AppearanceSettings = () => (
  <SettingsLayout>
    <h2 className="text-2xl font-semibold mb-4">Appearance Settings</h2>
    <p className="text-muted-foreground">Customize the look and feel of the application.</p>
  </SettingsLayout>
);

const NotificationSettings = () => (
  <SettingsLayout>
    <h2 className="text-2xl font-semibold mb-4">Notification Settings</h2>
    <p className="text-muted-foreground">Control how and when you receive notifications.</p>
  </SettingsLayout>
);

const AccountSettings = () => (
  <SettingsLayout>
    <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
    <p className="text-muted-foreground">Manage your account security and preferences.</p>
  </SettingsLayout>
);

// Events page
const Events = () => (
  <div className="min-h-screen pt-20">
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Events</h1>
      <p className="text-muted-foreground">Explore upcoming and past events hosted by CSI.</p>
    </div>
  </div>
);

// Contact page
const Contact = () => (
  <div className="min-h-screen pt-20">
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
      <p className="text-muted-foreground">Get in touch with the CSI team for inquiries and support.</p>
    </div>
  </div>
);

// App Component with Routes
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/events" element={<Events />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/role-selection" element={
        <AuthRoutes>
          <RoleSelection />
        </AuthRoutes>
      } />
      <Route path="/auth/:authType" element={
        <AuthRoutes>
          <Auth />
        </AuthRoutes>
      } />
      <Route path="/dashboard/*" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      {/* Teacher Dashboard Route */}
      <Route path="/teacher-dashboard/*" element={
        <TeacherProtectedRoute>
          <Navigate to="/dashboard/teacher" replace />
        </TeacherProtectedRoute>
      } />
      {/* Committee Dashboard Route */}
      <Route path="/committee-dashboard/*" element={
        <CommitteeProtectedRoute>
          <Navigate to="/dashboard/committee" replace />
        </CommitteeProtectedRoute>
      } />
      <Route path="/settings/profile" element={<ProfileSettings />} />
      <Route path="/settings/appearance" element={<AppearanceSettings />} />
      <Route path="/settings/notifications" element={<NotificationSettings />} />
      <Route path="/settings/account" element={<AccountSettings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
