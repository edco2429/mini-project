
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, BellOff, Calendar, FileText, Users, Clock, CheckCircle, Tag, BellRing } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '@/context/AuthContext';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
  read: boolean;
  category: 'event' | 'registration' | 'announcement' | 'payment';
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    title: 'Event Registration Approved',
    message: 'Your registration for Web Development Workshop has been approved. Please check your email for more details.',
    date: '2023-05-30T09:30:00',
    read: false,
    category: 'registration'
  },
  {
    id: 2,
    title: 'New Event: Hackathon 2023',
    message: 'We\'re excited to announce our annual hackathon! Register now to secure your spot.',
    date: '2023-05-28T14:45:00',
    read: true,
    category: 'event'
  },
  {
    id: 3,
    title: 'Registration Deadline Approaching',
    message: 'The deadline for Hackathon 2023 registration is in 2 days. Don\'t miss out!',
    date: '2023-05-25T11:15:00',
    read: true,
    category: 'announcement'
  },
  {
    id: 4,
    title: 'Payment Reminder',
    message: 'This is a reminder to complete your payment for the Web Development Workshop.',
    date: '2023-05-22T16:20:00',
    read: true,
    category: 'payment'
  },
  {
    id: 5,
    title: 'Workshop Materials Available',
    message: 'The materials for the upcoming workshop are now available. You can download them from your dashboard.',
    date: '2023-05-20T08:50:00',
    read: true,
    category: 'event'
  }
];

const NotificationsPage = () => {
  const { role } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<string | null>(null);
  const [showComposeForm, setShowComposeForm] = useState(false);
  const [newMessage, setNewMessage] = useState({
    title: '',
    message: '',
    category: 'announcement',
  });
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const handleMarkAsRead = (id: number) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({ ...notification, read: true }))
    );
    
    toast({
      title: "Notifications Updated",
      description: "All notifications marked as read.",
    });
  };
  
  const handleDeleteNotification = (id: number) => {
    setNotifications(
      notifications.filter(notification => notification.id !== id)
    );
    
    toast({
      title: "Notification Deleted",
      description: "The notification has been removed.",
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewMessage({
      ...newMessage,
      [name]: value,
    });
  };
  
  const handleSendMessage = () => {
    if (!newMessage.title || !newMessage.message) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real application, this would send a notification to users
    toast({
      title: "Notification Sent",
      description: "Your notification has been sent successfully.",
    });
    
    setNewMessage({
      title: '',
      message: '',
      category: 'announcement',
    });
    
    setShowComposeForm(false);
  };
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'event':
        return <Calendar className="h-4 w-4" />;
      case 'registration':
        return <FileText className="h-4 w-4" />;
      case 'announcement':
        return <Bell className="h-4 w-4" />;
      case 'payment':
        return <Tag className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };
  
  const getFilteredNotifications = () => {
    if (!filter) return notifications;
    return notifications.filter(notification => notification.category === filter);
  };
  
  const formatNotificationDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return `Today, ${format(date, 'h:mm a')}`;
    } else if (diffInDays === 1) {
      return `Yesterday, ${format(date, 'h:mm a')}`;
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else {
      return format(date, 'MMM d, yyyy');
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-muted-foreground mt-1">Stay updated with important information</p>
        </div>
        
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={handleMarkAllAsRead} className="gap-2">
              <CheckCircle className="h-4 w-4" />
              Mark All as Read
            </Button>
          )}
          
          {(role === 'teacher' || role === 'committee') && (
            <Button size="sm" onClick={() => setShowComposeForm(true)} className="gap-2">
              <BellRing className="h-4 w-4" />
              Send Notification
            </Button>
          )}
        </div>
      </div>
      
      {showComposeForm && (role === 'teacher' || role === 'committee') && (
        <Card>
          <CardHeader>
            <CardTitle>Send Notification</CardTitle>
            <CardDescription>Create a new notification to send to users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  name="title" 
                  value={newMessage.title} 
                  onChange={handleInputChange} 
                  placeholder="Notification title"
                />
              </div>
              
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  value={newMessage.message} 
                  onChange={handleInputChange} 
                  placeholder="Enter your notification message"
                  className="min-h-[100px]"
                />
              </div>
              
              <div>
                <Label htmlFor="category">Category</Label>
                <select 
                  id="category" 
                  name="category" 
                  value={newMessage.category} 
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="announcement">Announcement</option>
                  <option value="event">Event</option>
                  <option value="registration">Registration</option>
                  <option value="payment">Payment</option>
                </select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowComposeForm(false)}>Cancel</Button>
            <Button onClick={handleSendMessage}>Send Notification</Button>
          </CardFooter>
        </Card>
      )}
      
      <div className="flex flex-col sm:flex-row gap-6">
        <Card className="sm:w-64 h-fit">
          <CardHeader>
            <CardTitle className="text-lg">Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              variant={!filter ? "default" : "outline"} 
              className="w-full justify-start" 
              onClick={() => setFilter(null)}
            >
              <Bell className="mr-2 h-4 w-4" />
              All Notifications
            </Button>
            <Button 
              variant={filter === 'event' ? "default" : "outline"} 
              className="w-full justify-start" 
              onClick={() => setFilter('event')}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Events
            </Button>
            <Button 
              variant={filter === 'registration' ? "default" : "outline"} 
              className="w-full justify-start" 
              onClick={() => setFilter('registration')}
            >
              <FileText className="mr-2 h-4 w-4" />
              Registrations
            </Button>
            <Button 
              variant={filter === 'announcement' ? "default" : "outline"} 
              className="w-full justify-start" 
              onClick={() => setFilter('announcement')}
            >
              <BellRing className="mr-2 h-4 w-4" />
              Announcements
            </Button>
            <Button 
              variant={filter === 'payment' ? "default" : "outline"} 
              className="w-full justify-start" 
              onClick={() => setFilter('payment')}
            >
              <Tag className="mr-2 h-4 w-4" />
              Payments
            </Button>
          </CardContent>
        </Card>
        
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-lg">
              Notifications
              {filter && (
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  ({filter})
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {getFilteredNotifications().length > 0 ? (
              <div className="space-y-4">
                {getFilteredNotifications().map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`border rounded-lg p-4 transition-colors ${notification.read ? 'bg-background' : 'bg-muted/30'}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <div className={`mt-0.5 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center ${!notification.read ? 'text-primary' : 'text-muted-foreground'}`}>
                          {getCategoryIcon(notification.category)}
                        </div>
                        <div>
                          <h3 className="font-medium">{notification.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <p className="text-xs text-muted-foreground">
                              {formatNotificationDate(notification.date)}
                            </p>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-muted font-medium">
                              {notification.category}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 text-muted-foreground"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            Mark as read
                          </Button>
                        )}
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 text-red-500 hover:text-red-500"
                          onClick={() => handleDeleteNotification(notification.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BellOff className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Notifications</h3>
                <p className="text-muted-foreground mb-4">
                  {filter 
                    ? `No ${filter} notifications found` 
                    : 'You don\'t have any notifications yet'}
                </p>
                {filter && (
                  <Button variant="outline" onClick={() => setFilter(null)}>
                    View All Notifications
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Notification Settings</CardTitle>
          <CardDescription>Control how and when you receive notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-muted-foreground text-sm">Receive notifications via email</p>
              </div>
              <Switch id="email-notifications" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="event-notifications">Event Updates</Label>
                <p className="text-muted-foreground text-sm">Notify about new events and event changes</p>
              </div>
              <Switch id="event-notifications" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="registration-notifications">Registration Status</Label>
                <p className="text-muted-foreground text-sm">Updates about your event registrations</p>
              </div>
              <Switch id="registration-notifications" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="payment-notifications">Payment Reminders</Label>
                <p className="text-muted-foreground text-sm">Reminders about pending payments</p>
              </div>
              <Switch id="payment-notifications" defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsPage;
