
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { Search, Filter, Calendar as CalendarIcon, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

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

const mockEvents: Event[] = [
  {
    id: 1,
    title: 'Web Development Workshop',
    date: '2023-06-15',
    time: '10:00 AM - 12:00 PM',
    location: 'Computer Lab 3',
    description: 'Learn the fundamentals of web development with HTML, CSS, and JavaScript. This hands-on workshop will cover the core technologies used in modern web development and provide you with the skills to create responsive websites.',
    fee: 200,
    organizer: 'Prof. Mehta',
    image: '/placeholder.svg'
  },
  {
    id: 2,
    title: 'Hackathon 2023',
    date: '2023-07-20',
    time: '9:00 AM - 9:00 PM',
    location: 'Main Auditorium',
    description: 'A 24-hour coding competition to solve real-world problems. Teams of up to 4 students will compete to develop innovative solutions to challenges across various domains including healthcare, education, environment, and more.',
    fee: 500,
    organizer: 'Prof. Sharma',
    image: '/placeholder.svg'
  },
  {
    id: 3,
    title: 'Industry Guest Lecture',
    date: '2023-08-05',
    time: '2:00 PM - 4:00 PM',
    location: 'Seminar Hall',
    description: 'Guest lecture by industry expert on emerging technologies. Learn about the latest trends in technology directly from industry professionals who are working on cutting-edge solutions.',
    fee: 0,
    organizer: 'Prof. Joshi',
    image: '/placeholder.svg'
  },
  {
    id: 4,
    title: 'AI and Machine Learning Workshop',
    date: '2023-08-15',
    time: '10:00 AM - 4:00 PM',
    location: 'Computer Lab 2',
    description: 'Introduction to artificial intelligence and machine learning concepts. This workshop will introduce participants to the fundamental concepts of AI and ML through practical examples and hands-on exercises.',
    fee: 300,
    organizer: 'Dr. Patel',
    image: '/placeholder.svg'
  },
  {
    id: 5,
    title: 'Cloud Computing Seminar',
    date: '2023-09-10',
    time: '11:00 AM - 1:00 PM',
    location: 'Conference Room',
    description: 'Learn about cloud computing platforms and their applications in modern software development. This seminar will cover major cloud providers, deployment strategies, and best practices.',
    fee: 0,
    organizer: 'Prof. Gupta',
    image: '/placeholder.svg'
  },
];

const EventsPage = () => {
  const { role } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showEventDetails, setShowEventDetails] = useState<number | null>(null);
  
  const categories = [
    { id: 'all', name: 'All Events' },
    { id: 'workshops', name: 'Workshops' },
    { id: 'competitions', name: 'Competitions' },
    { id: 'lectures', name: 'Lectures' },
    { id: 'seminars', name: 'Seminars' },
  ];
  
  const getFilteredEvents = () => {
    let filtered = mockEvents;
    
    if (searchTerm) {
      filtered = filtered.filter(
        event => 
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'workshops') {
        filtered = filtered.filter(event => event.title.toLowerCase().includes('workshop'));
      } else if (selectedCategory === 'competitions') {
        filtered = filtered.filter(event => event.title.toLowerCase().includes('hackathon') || event.title.toLowerCase().includes('competition'));
      } else if (selectedCategory === 'lectures') {
        filtered = filtered.filter(event => event.title.toLowerCase().includes('lecture'));
      } else if (selectedCategory === 'seminars') {
        filtered = filtered.filter(event => event.title.toLowerCase().includes('seminar'));
      }
    }
    
    return filtered;
  };
  
  const handleRegister = (eventId: number) => {
    toast({
      title: "Event Registration",
      description: "Registration will open in the registration page.",
    });
    setShowEventDetails(null);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Events</h1>
        <p className="text-muted-foreground mt-1">Explore upcoming CSI events and activities</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="grid gap-6">
        {getFilteredEvents().length > 0 ? (
          getFilteredEvents().map((event) => (
            <Card key={event.id} className={showEventDetails === event.id ? "ring-2 ring-primary" : ""}>
              <div className="md:flex">
                <div className="md:w-1/4 h-48 md:h-auto relative">
                  <img
                    src={event.image || '/placeholder.svg'}
                    alt={event.title}
                    className="object-cover w-full h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                  />
                </div>
                <div className="md:w-3/4 p-6">
                  <CardHeader className="p-0 pb-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      <div>
                        <CardTitle className="text-xl">{event.title}</CardTitle>
                        <CardDescription className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                          <span>{format(new Date(event.date), 'MMMM d, yyyy')}</span>
                          <span>{event.time}</span>
                          <span>{event.location}</span>
                        </CardDescription>
                      </div>
                      
                      {event.fee > 0 ? (
                        <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                          ₹{event.fee}
                        </div>
                      ) : (
                        <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          Free
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-0">
                    {showEventDetails === event.id ? (
                      <div className="space-y-4">
                        <p className="text-sm">{event.description}</p>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-1">Event Details</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Date: </span>
                              <span>{format(new Date(event.date), 'MMMM d, yyyy')}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Time: </span>
                              <span>{event.time}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Location: </span>
                              <span>{event.location}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Organizer: </span>
                              <span>{event.organizer}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end gap-3 pt-2">
                          <Button 
                            variant="outline" 
                            onClick={() => setShowEventDetails(null)}
                          >
                            Close
                          </Button>
                          {role === 'student' && (
                            <Button onClick={() => handleRegister(event.id)}>
                              Register Now
                            </Button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm line-clamp-2">{event.description}</p>
                        <div className="flex justify-end mt-4">
                          <Button 
                            variant="ghost" 
                            className="text-primary"
                            onClick={() => setShowEventDetails(event.id)}
                          >
                            View Details
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-12">
            <CalendarIcon className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Events Found</h3>
            <p className="text-muted-foreground mb-4">
              No events match your search criteria. Try adjusting your filters or search term.
            </p>
            <Button onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}>
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
