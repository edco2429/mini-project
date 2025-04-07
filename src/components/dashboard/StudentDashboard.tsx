
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import FadeIn from '@/components/animations/FadeIn';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { 
  Calendar as CalendarIcon, 
  Users, 
  Bell, 
  Settings,
  CheckCircle2,
  XCircle,
  Clock,
  CreditCard,
  User,
  CalendarDays,
  FileText,
  PlusCircle,
  ChevronRight
} from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  fee: number;
  organizer?: string;
  image?: string;
}

interface Registration {
  id: number;
  eventId: number;
  eventTitle: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  paymentStatus: 'unpaid' | 'paid';
}

const mockEvents: Event[] = [
  {
    id: 1,
    title: 'Web Development Workshop',
    date: '2023-06-15',
    time: '10:00 AM - 12:00 PM',
    location: 'Computer Lab 3',
    description: 'Learn the fundamentals of web development with HTML, CSS, and JavaScript.',
    fee: 200,
    image: '/placeholder.svg'
  },
  {
    id: 2,
    title: 'Hackathon 2023',
    date: '2023-07-20',
    time: '9:00 AM - 9:00 PM',
    location: 'Main Auditorium',
    description: 'A 24-hour coding competition to solve real-world problems.',
    fee: 500,
    image: '/placeholder.svg'
  },
  {
    id: 3,
    title: 'Industry Guest Lecture',
    date: '2023-08-05',
    time: '2:00 PM - 4:00 PM',
    location: 'Seminar Hall',
    description: 'Guest lecture by industry expert on emerging technologies.',
    fee: 0,
    image: '/placeholder.svg'
  },
];

interface StudentDashboardProps {
  view?: 'home' | 'registrations';
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ view = 'home' }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState<Registration[]>([
    {
      id: 1,
      eventId: 1,
      eventTitle: 'Web Development Workshop',
      date: '2023-06-15',
      status: 'approved',
      paymentStatus: 'paid',
    }
  ]);
  const [showRegistrationForm, setShowRegistrationForm] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    rollNumber: user?.rollNumber || '',
    email: user?.email || '',
    year: user?.year || '',
    branch: user?.branch || '',
  });
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const registerForEvent = (eventId: number) => {
    const event = mockEvents.find(e => e.id === eventId);
    
    if (event) {
      const newRegistration: Registration = {
        id: Date.now(),
        eventId: event.id,
        eventTitle: event.title,
        date: event.date,
        status: 'pending',
        paymentStatus: event.fee > 0 ? 'unpaid' : 'paid',
      };
      
      setRegistrations([...registrations, newRegistration]);
      setShowRegistrationForm(null);
      
      toast({
        title: "Registration Successful",
        description: `You have successfully registered for ${event.title}.`,
      });
    }
  };
  
  const handlePayment = (registrationId: number) => {
    const updatedRegistrations = registrations.map(reg => {
      if (reg.id === registrationId) {
        return { ...reg, paymentStatus: 'paid' as const };
      }
      return reg;
    });
    
    setRegistrations(updatedRegistrations);
    
    toast({
      title: "Payment Successful",
      description: "Your payment has been processed successfully.",
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </span>
        );
    }
  };
  
  const getPaymentBadge = (status: 'unpaid' | 'paid', fee: number = 0) => {
    if (fee === 0) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          Free
        </span>
      );
    }
    
    switch (status) {
      case 'paid':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Paid
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            <CreditCard className="w-3 h-3 mr-1" />
            Unpaid
          </span>
        );
    }
  };
  
  if (view === 'registrations') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">My Registrations</h1>
          <p className="text-muted-foreground mt-1">Track your event registrations and payment status</p>
        </div>
        
        <div className="grid gap-6">
          {registrations.length > 0 ? (
            registrations.map(registration => (
              <Card key={registration.id}>
                <CardHeader>
                  <CardTitle>{registration.eventTitle}</CardTitle>
                  <CardDescription>{format(new Date(registration.date), 'MMMM d, yyyy')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3 mb-4">
                    {getStatusBadge(registration.status)}
                    {getPaymentBadge(registration.paymentStatus)}
                  </div>
                  
                  <div className="space-y-2">
                    {registration.status === 'approved' && (
                      <div className="text-sm">
                        <span className="font-medium">Congratulations!</span> Your registration has been approved.
                      </div>
                    )}
                    
                    {registration.status === 'pending' && (
                      <div className="text-sm">
                        Your registration is currently under review. We'll notify you once it's approved.
                      </div>
                    )}
                    
                    {registration.status === 'rejected' && (
                      <div className="text-sm">
                        Unfortunately, your registration has been rejected. Please contact CSI for more information.
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  {registration.paymentStatus === 'unpaid' && (
                    <Button onClick={() => handlePayment(registration.id)}>Pay Now</Button>
                  )}
                  {registration.status === 'approved' && registration.paymentStatus === 'paid' && (
                    <Button variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))
          ) : (
            <Card className="bg-muted/30">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CalendarDays className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">No Registrations Yet</h3>
                <p className="text-muted-foreground mb-4">You haven't registered for any events yet.</p>
                <Button onClick={() => navigate('/dashboard/events')}>
                  Browse Events
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <FadeIn>
        <div>
          <h1 className="text-2xl font-bold">Student Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, {user?.name}</p>
        </div>
      </FadeIn>
      
      <FadeIn delay="100">
        <GlassmorphicCard className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-none">
          <div className="p-6">
            <h2 className="text-xl font-medium mb-2">Welcome to CSI Connect</h2>
            <p className="text-white/80 mb-6">Explore upcoming events and track your participation in CSI activities.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button 
                variant="secondary" 
                className="bg-white/10 hover:bg-white/20 border-white/10 text-white justify-start gap-2"
                onClick={() => navigate('/dashboard/events')}
              >
                <CalendarIcon className="h-4 w-4" />
                Events
              </Button>
              <Button 
                variant="secondary" 
                className="bg-white/10 hover:bg-white/20 border-white/10 text-white justify-start gap-2"
                onClick={() => navigate('/dashboard/registrations')}
              >
                <Users className="h-4 w-4" />
                Registrations
              </Button>
              <Button 
                variant="secondary" 
                className="bg-white/10 hover:bg-white/20 border-white/10 text-white justify-start gap-2"
                onClick={() => navigate('/dashboard/calendar')}
              >
                <CalendarDays className="h-4 w-4" />
                Calendar
              </Button>
              <Button 
                variant="secondary" 
                className="bg-white/10 hover:bg-white/20 border-white/10 text-white justify-start gap-2"
                onClick={() => navigate('/dashboard/profile')}
              >
                <User className="h-4 w-4" />
                Profile
              </Button>
            </div>
          </div>
        </GlassmorphicCard>
      </FadeIn>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <FadeIn delay="200">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <div>
                  <CardTitle className="text-lg font-medium">Upcoming Events</CardTitle>
                  <CardDescription>Register for these upcoming CSI events</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/events')}>
                  View All
                </Button>
              </CardHeader>
              <CardContent className="space-y-4 pt-3">
                {mockEvents.slice(0, 2).map((event) => (
                  <div key={event.id} className="border-b border-border/50 last:border-0 pb-4 last:pb-0">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div>
                        <h3 className="font-medium text-base">{event.title}</h3>
                        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground mt-1">
                          <span>{format(new Date(event.date), 'MMM d, yyyy')}</span>
                          <span>{event.time}</span>
                          <span>{event.location}</span>
                        </div>
                        <p className="mt-2 text-sm line-clamp-2">{event.description}</p>
                        <div className="mt-2">
                          {event.fee > 0 ? (
                            <span className="text-sm font-medium">Registration Fee: ₹{event.fee}</span>
                          ) : (
                            <span className="text-sm font-medium text-green-600">Free Event</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center">
                        {registrations.some(reg => reg.eventId === event.id) ? (
                          <Button variant="outline" disabled>Registered</Button>
                        ) : (
                          <Button onClick={() => setShowRegistrationForm(event.id)}>Register</Button>
                        )}
                      </div>
                    </div>
                    
                    {showRegistrationForm === event.id && (
                      <div className="mt-4 p-4 border border-border rounded-lg bg-muted/10 animate-in fade-in-0">
                        <h4 className="font-medium mb-3">Registration Form</h4>
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" name="name" value={formData.name} onChange={handleFormChange} />
                          </div>
                          <div>
                            <Label htmlFor="rollNumber">Roll Number</Label>
                            <Input id="rollNumber" name="rollNumber" value={formData.rollNumber} onChange={handleFormChange} />
                          </div>
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" value={formData.email} onChange={handleFormChange} />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label htmlFor="year">Year</Label>
                              <Input id="year" name="year" value={formData.year} onChange={handleFormChange} />
                            </div>
                            <div>
                              <Label htmlFor="branch">Branch</Label>
                              <Input id="branch" name="branch" value={formData.branch} onChange={handleFormChange} />
                            </div>
                          </div>
                          <div className="flex justify-end space-x-2 pt-2">
                            <Button variant="outline" onClick={() => setShowRegistrationForm(null)}>Cancel</Button>
                            <Button onClick={() => registerForEvent(event.id)}>Submit Registration</Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline" onClick={() => navigate('/dashboard/events')}>
                  Explore All Events
                </Button>
              </CardFooter>
            </Card>
          </FadeIn>
        </div>
        
        <FadeIn delay="300">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Your Profile</CardTitle>
                <CardDescription>Manage your account information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center mb-4">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                    <User className="h-10 w-10 text-primary/70" />
                  </div>
                  <h3 className="font-medium text-base">{user?.name}</h3>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Roll Number</span>
                    <span className="font-medium">{user?.rollNumber || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Branch</span>
                    <span className="font-medium">{user?.branch || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Year</span>
                    <span className="font-medium">{user?.year || 'Not set'}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => navigate('/dashboard/profile')}>
                  Edit Profile
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Registration Status</CardTitle>
                <CardDescription>Track your event registrations</CardDescription>
              </CardHeader>
              <CardContent>
                {registrations.length > 0 ? (
                  <div className="space-y-4">
                    {registrations.map((registration) => (
                      <div key={registration.id} className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-sm">{registration.eventTitle}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            {getStatusBadge(registration.status)}
                            {getPaymentBadge(registration.paymentStatus)}
                          </div>
                        </div>
                        
                        {registration.paymentStatus === 'unpaid' && (
                          <Button size="sm" onClick={() => handlePayment(registration.id)}>Pay</Button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground">No registrations yet</p>
                    <Button variant="link" className="mt-1 h-auto p-0" onClick={() => navigate('/dashboard/events')}>
                      Browse events
                    </Button>
                  </div>
                )}
              </CardContent>
              {registrations.length > 0 && (
                <CardFooter>
                  <Button 
                    variant="ghost" 
                    className="w-full text-xs"
                    onClick={() => navigate('/dashboard/registrations')}
                  >
                    View All Registrations
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default StudentDashboard;
