
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Tag,
  Plus,
  Edit,
  Trash,
  ChevronLeft,
  ChevronRight,
  User
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

interface CalendarEvent {
  id: number;
  title: string;
  date: Date;
  isEvent?: boolean;
  description?: string;
  location?: string;
  organizer?: string;
  time?: string;
}

const CalendarPage = () => {
  const { role, user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: 1,
      title: 'Web Development Workshop',
      date: new Date('2023-06-15'),
      isEvent: true,
      description: 'Learn the fundamentals of web development with HTML, CSS, and JavaScript.',
      location: 'Computer Lab 3',
      time: '10:00 AM - 12:00 PM',
      organizer: 'Prof. Mehta'
    },
    {
      id: 2,
      title: 'Study Group Meeting',
      date: new Date('2023-06-10'),
      description: 'Review for exams',
      location: 'Library',
      time: '2:00 PM - 4:00 PM'
    },
    {
      id: 3,
      title: 'Hackathon 2023',
      date: new Date('2023-07-20'),
      isEvent: true,
      description: 'A 24-hour coding competition to solve real-world problems.',
      location: 'Main Auditorium',
      time: '9:00 AM - 9:00 PM',
      organizer: 'Prof. Sharma'
    },
    {
      id: 4,
      title: 'Project Deadline',
      date: new Date('2023-06-25'),
      description: 'Final project submission deadline',
      time: '11:59 PM'
    }
  ]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    title: '',
    date: new Date(),
    description: '',
    location: '',
    time: '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editingEvent) {
      setEditingEvent({
        ...editingEvent,
        [name]: value,
      } as CalendarEvent);
    } else {
      setNewEvent({
        ...newEvent,
        [name]: value,
      });
    }
  };
  
  const handleAddEvent = () => {
    if (!newEvent.title) {
      toast({
        title: "Missing Title",
        description: "Please enter a title for your event.",
        variant: "destructive"
      });
      return;
    }
    
    const eventData: CalendarEvent = {
      id: Date.now(),
      title: newEvent.title || '',
      date: newEvent.date || new Date(),
      description: newEvent.description,
      location: newEvent.location,
      time: newEvent.time,
      isEvent: false,
    };
    
    setEvents([...events, eventData]);
    
    toast({
      title: "Event Added",
      description: `"${eventData.title}" has been added to your calendar.`,
    });
    
    // Reset form
    setNewEvent({
      title: '',
      date: new Date(),
      description: '',
      location: '',
      time: '',
    });
    
    setShowAddForm(false);
  };
  
  const handleUpdateEvent = () => {
    if (!editingEvent) return;
    
    if (!editingEvent.title) {
      toast({
        title: "Missing Title",
        description: "Please enter a title for your event.",
        variant: "destructive"
      });
      return;
    }
    
    setEvents(events.map(event => 
      event.id === editingEvent.id ? editingEvent : event
    ));
    
    toast({
      title: "Event Updated",
      description: `"${editingEvent.title}" has been updated.`,
    });
    
    setEditingEvent(null);
  };
  
  const handleDeleteEvent = (id: number) => {
    const eventToDelete = events.find(event => event.id === id);
    
    if (eventToDelete?.isEvent && role !== 'committee') {
      toast({
        title: "Permission Denied",
        description: "You cannot delete official CSI events.",
        variant: "destructive"
      });
      return;
    }
    
    setEvents(events.filter(event => event.id !== id));
    
    toast({
      title: "Event Deleted",
      description: "The event has been removed from your calendar.",
    });
    
    setEditingEvent(null);
  };
  
  const getEventsForSelectedDate = () => {
    if (!selectedDate) return [];
    
    return events.filter(event => 
      event.date.getDate() === selectedDate.getDate() &&
      event.date.getMonth() === selectedDate.getMonth() &&
      event.date.getFullYear() === selectedDate.getFullYear()
    );
  };
  
  const getDaysWithEvents = events.map(event => event.date);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Calendar</h1>
          <p className="text-muted-foreground mt-1">Manage your schedule and event timelines</p>
        </div>
        
        <Button onClick={() => {
          setShowAddForm(true);
          setEditingEvent(null);
          setNewEvent({
            ...newEvent,
            date: selectedDate,
          });
        }} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Event
        </Button>
      </div>
      
      <div className="grid md:grid-cols-12 gap-6">
        <Card className="md:col-span-7">
          <CardHeader>
            <CardTitle>Monthly View</CardTitle>
            <CardDescription>View and manage your events</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border mx-auto"
              disabled={{ before: new Date(new Date().setDate(new Date().getDate() - 1)) }}
              modifiers={{
                booked: getDaysWithEvents,
              }}
              modifiersStyles={{
                booked: {
                  fontWeight: 'bold',
                  backgroundColor: 'rgba(0, 122, 255, 0.1)',
                },
              }}
            />
          </CardContent>
        </Card>
        
        <Card className="md:col-span-5">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>
                  {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Selected Date'}
                </CardTitle>
                <CardDescription>Events for this day</CardDescription>
              </div>
              
              <div className="flex gap-1">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => {
                    if (selectedDate) {
                      const newDate = new Date(selectedDate);
                      newDate.setDate(newDate.getDate() - 1);
                      setSelectedDate(newDate);
                    }
                  }}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => {
                    if (selectedDate) {
                      const newDate = new Date(selectedDate);
                      newDate.setDate(newDate.getDate() + 1);
                      setSelectedDate(newDate);
                    }
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {getEventsForSelectedDate().length > 0 ? (
              <div className="space-y-4">
                {getEventsForSelectedDate().map((event) => (
                  <div key={event.id} className="border rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{event.title}</h3>
                        {event.isEvent && (
                          <div className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary mt-1">
                            CSI Event
                          </div>
                        )}
                      </div>
                      
                      {(!event.isEvent || role === 'committee') && (
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => setEditingEvent(event)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-red-500 hover:text-red-600"
                            onClick={() => handleDeleteEvent(event.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2 mt-3">
                      {event.time && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{event.time}</span>
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      )}
                      {event.organizer && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="h-4 w-4" />
                          <span>{event.organizer}</span>
                        </div>
                      )}
                      {event.description && (
                        <div className="mt-2 text-sm">
                          {event.description}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CalendarIcon className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Events</h3>
                <p className="text-muted-foreground mb-4">
                  No events scheduled for this date.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowAddForm(true);
                    setEditingEvent(null);
                    setNewEvent({
                      ...newEvent,
                      date: selectedDate,
                    });
                  }}
                >
                  Add Event
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {(showAddForm || editingEvent) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingEvent ? 'Edit Event' : 'Add Event'}</CardTitle>
            <CardDescription>
              {editingEvent
                ? 'Update the details of your event'
                : 'Fill in the details to add a new event to your calendar'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Event Title</Label>
                <Input 
                  id="title" 
                  name="title" 
                  value={editingEvent ? editingEvent.title : newEvent.title} 
                  onChange={handleInputChange}
                  placeholder="Enter event title"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left"
                      >
                        {(editingEvent?.date || newEvent.date) ? (
                          format(editingEvent?.date || newEvent.date as Date, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={editingEvent?.date || newEvent.date as Date}
                        onSelect={(date) => {
                          if (editingEvent) {
                            setEditingEvent({
                              ...editingEvent,
                              date: date || new Date(),
                            });
                          } else {
                            setNewEvent({
                              ...newEvent,
                              date,
                            });
                          }
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <Label htmlFor="time">Time (Optional)</Label>
                  <Input 
                    id="time" 
                    name="time" 
                    value={editingEvent ? editingEvent.time : newEvent.time} 
                    onChange={handleInputChange}
                    placeholder="e.g. 10:00 AM - 12:00 PM"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="location">Location (Optional)</Label>
                <Input 
                  id="location" 
                  name="location" 
                  value={editingEvent ? editingEvent.location : newEvent.location} 
                  onChange={handleInputChange}
                  placeholder="Enter location"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={editingEvent ? editingEvent.description : newEvent.description} 
                  onChange={handleInputChange}
                  placeholder="Add details about the event"
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => {
                setShowAddForm(false);
                setEditingEvent(null);
              }}
            >
              Cancel
            </Button>
            <Button onClick={editingEvent ? handleUpdateEvent : handleAddEvent}>
              {editingEvent ? 'Update Event' : 'Add Event'}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default CalendarPage;
