
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Users, 
  Bell, 
  Settings, 
  LogOut, 
  Calendar as CalendarIcon,
  User,
  Home,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout, role } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  
  const getNavItems = () => {
    const commonItems = [
      { href: '/dashboard', label: 'Dashboard', icon: <Home className="h-5 w-5" /> },
      { href: '/dashboard/events', label: 'Events', icon: <CalendarIcon className="h-5 w-5" /> },
      { href: '/dashboard/notifications', label: 'Notifications', icon: <Bell className="h-5 w-5" /> },
      { href: '/dashboard/profile', label: 'Profile', icon: <User className="h-5 w-5" /> },
    ];
    
    const studentItems = [
      { href: '/dashboard/registrations', label: 'My Registrations', icon: <Users className="h-5 w-5" /> },
      { href: '/dashboard/calendar', label: 'Calendar', icon: <CalendarIcon className="h-5 w-5" /> },
    ];
    
    const teacherItems = [
      { href: '/dashboard/manage-registrations', label: 'Manage Registrations', icon: <Users className="h-5 w-5" /> },
      { href: '/dashboard/attendance', label: 'Attendance', icon: <Users className="h-5 w-5" /> },
      { href: '/dashboard/payments', label: 'Payments', icon: <Users className="h-5 w-5" /> },
    ];
    
    const committeeItems = [
      { href: '/dashboard/create-event', label: 'Create Event', icon: <CalendarIcon className="h-5 w-5" /> },
      { href: '/dashboard/committee-members', label: 'Committee Members', icon: <Users className="h-5 w-5" /> },
      { href: '/dashboard/attendance-history', label: 'Attendance History', icon: <Users className="h-5 w-5" /> },
    ];
    
    switch (role) {
      case 'student':
        return [...commonItems, ...studentItems];
      case 'teacher':
        return [...commonItems, ...teacherItems];
      case 'committee':
        return [...commonItems, ...committeeItems];
      default:
        return commonItems;
    }
  };
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 h-16 border-b bg-white z-50 lg:hidden">
        <div className="px-4 h-full flex items-center justify-between">
          <Link to="/dashboard" className="font-bold text-xl text-primary">CSI Connect</Link>
          
          <div className="flex items-center gap-2">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[300px] p-0">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user?.profileImage || '/placeholder.svg'} alt={user?.name || ''} />
                        <AvatarFallback>{user?.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user?.name}</div>
                        <div className="text-sm text-muted-foreground">{user?.email}</div>
                      </div>
                    </div>
                  </div>
                  
                  <nav className="flex-1 p-4 space-y-1">
                    {getNavItems().map((item, i) => (
                      <Link
                        key={i}
                        to={item.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                          isActive(item.href) 
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                  
                  <div className="p-4 border-t mt-auto">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-5 w-5 mr-3" />
                      Logout
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:w-64 lg:border-r lg:bg-white">
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center px-6 border-b">
            <Link to="/dashboard" className="font-bold text-xl text-primary">CSI Connect</Link>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <div className="px-4 py-5">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user?.profileImage || '/placeholder.svg'} alt={user?.name || ''} />
                  <AvatarFallback>{user?.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{user?.name}</div>
                  <div className="text-sm text-muted-foreground">{user?.email}</div>
                </div>
              </div>
            </div>
            
            <nav className="px-2 py-3 space-y-1">
              {getNavItems().map((item, i) => (
                <Link
                  key={i}
                  to={item.href}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm ${
                    isActive(item.href) 
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="p-4 border-t">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="lg:pl-64 pt-16">
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
