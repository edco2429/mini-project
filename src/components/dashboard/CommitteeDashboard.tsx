
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Calendar as CalendarIcon, CheckCircle, ChevronRight, Clock, Cog, Eye, FileText, Image as ImageIcon, Link, PlusCircle, Trash2, UserPlus, Users, FileDown } from "lucide-react";

// Sample committee members data
const committeeMembers = [
  {
    id: 1,
    name: 'Alex Johnson',
    role: 'President',
    image: '/placeholder.svg'
  },
  {
    id: 2,
    name: 'Samantha Lee',
    role: 'Vice President',
    image: '/placeholder.svg'
  },
  {
    id: 3,
    name: 'Michael Brown',
    role: 'Treasurer',
    image: '/placeholder.svg'
  },
  {
    id: 4,
    name: 'Jessica Williams',
    role: 'Secretary',
    image: '/placeholder.svg'
  },
  {
    id: 5,
    name: 'David Chen',
    role: 'Event Coordinator',
    image: '/placeholder.svg'
  }
];

// Sample events data
const events = [
  {
    id: 1,
    name: 'Tech Workshop',
    date: '2023-06-15',
    description: 'A hands-on workshop on the latest technologies',
    registrations: 45,
    poster: '/placeholder.svg'
  },
  {
    id: 2,
    name: 'Coding Competition',
    date: '2023-07-10',
    description: 'Annual coding competition with exciting prizes',
    registrations: 78,
    poster: '/placeholder.svg'
  },
  {
    id: 3,
    name: 'Industry Talk',
    date: '2023-08-05',
    description: 'Industry experts share insights and experiences',
    registrations: 32,
    poster: '/placeholder.svg'
  }
];

// Sample registrations data
const registrations = [
  {
    id: 1,
    eventId: 1,
    studentName: 'John Doe',
    email: 'john.doe@example.com',
    rollNumber: 'CSI2001',
    status: 'approved',
    paymentStatus: 'paid'
  },
  {
    id: 2,
    eventId: 1,
    studentName: 'Jane Smith',
    email: 'jane.smith@example.com',
    rollNumber: 'CSI2022',
    status: 'pending',
    paymentStatus: 'unpaid'
  },
  {
    id: 3,
    eventId: 2,
    studentName: 'Emily Johnson',
    email: 'emily.j@example.com',
    rollNumber: 'CSI2015',
    status: 'approved',
    paymentStatus: 'paid'
  },
  {
    id: 4,
    eventId: 2,
    studentName: 'Michael Brown',
    email: 'michael.b@example.com',
    rollNumber: 'CSI2030',
    status: 'declined',
    paymentStatus: 'refunded'
  },
  {
    id: 5,
    eventId: 3,
    studentName: 'Alex Wilson',
    email: 'alex.w@example.com',
    rollNumber: 'CSI2045',
    status: 'pending',
    paymentStatus: 'unpaid'
  },
];

// Sample attendance data
const attendanceData = [
  {
    id: 1,
    eventId: 1,
    eventName: 'Tech Workshop',
    date: '2023-06-15',
    attendanceCount: 42,
    sheetImages: ['/placeholder.svg']
  },
  {
    id: 2,
    eventId: 2,
    eventName: 'Coding Competition',
    date: '2023-07-10',
    attendanceCount: 75,
    sheetImages: ['/placeholder.svg', '/placeholder.svg']
  }
];

const CommitteeDashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTab, setSelectedTab] = useState("events");
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newEventName, setNewEventName] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [newEventDescription, setNewEventDescription] = useState("");
  const [newEventPoster, setNewEventPoster] = useState<File | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [uploadingAttendance, setUploadingAttendance] = useState(false);
  const [selectedAttendanceEvent, setSelectedAttendanceEvent] = useState<number | null>(null);
  const [attendanceImage, setAttendanceImage] = useState<File | null>(null);
  
  const { toast } = useToast();
  
  const handleNewEvent = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Event Added",
      description: `${newEventName} has been added to the events list.`,
    });
    setIsAddingEvent(false);
    setNewEventName("");
    setNewEventDate("");
    setNewEventDescription("");
    setNewEventPoster(null);
  };
  
  const handlePosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewEventPoster(e.target.files[0]);
    }
  };
  
  const handleAttendanceImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttendanceImage(e.target.files[0]);
    }
  };
  
  const handleAttendanceUpload = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Attendance Uploaded",
      description: "Attendance sheet has been uploaded successfully.",
    });
    setUploadingAttendance(false);
    setSelectedAttendanceEvent(null);
    setAttendanceImage(null);
  };
  
  const approveRegistration = (id: number) => {
    toast({
      title: "Registration Approved",
      description: "The student registration has been approved.",
    });
  };
  
  const declineRegistration = (id: number) => {
    toast({
      title: "Registration Declined",
      description: "The student registration has been declined.",
    });
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Committee Dashboard</h1>
        <Button variant="outline" onClick={() => setSelectedTab("settings")}>
          <Cog className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 md:w-[400px]">
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="registrations">Registrations</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>
        
        {/* Events Tab */}
        <TabsContent value="events" className="space-y-4">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">Manage Events</h2>
            <Button onClick={() => setIsAddingEvent(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Event
            </Button>
          </div>
          
          {isAddingEvent ? (
            <Card>
              <CardHeader>
                <CardTitle>Add New Event</CardTitle>
                <CardDescription>Create a new event with details and poster image</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleNewEvent} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-name">Event Name</Label>
                    <Input 
                      id="event-name" 
                      placeholder="Enter event name" 
                      value={newEventName}
                      onChange={(e) => setNewEventName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="event-date">Event Date</Label>
                    <Input 
                      id="event-date" 
                      type="date" 
                      value={newEventDate}
                      onChange={(e) => setNewEventDate(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="event-description">Description</Label>
                    <Textarea 
                      id="event-description" 
                      placeholder="Enter event description" 
                      value={newEventDescription}
                      onChange={(e) => setNewEventDescription(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="event-poster">Event Poster</Label>
                    <Input 
                      id="event-poster" 
                      type="file" 
                      accept="image/*"
                      onChange={handlePosterChange}
                      required
                    />
                  </div>
                  
                  <div className="flex space-x-2 pt-4">
                    <Button type="submit">Create Event</Button>
                    <Button type="button" variant="outline" onClick={() => setIsAddingEvent(false)}>Cancel</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {events.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={event.poster}
                      alt={event.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{event.name}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{event.description}</p>
                    <Badge className="mt-2">
                      {event.registrations} Registrations
                    </Badge>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" onClick={() => setSelectedEvent(event.id)}>
                      Manage
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
          
          {selectedEvent && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {events.find(e => e.id === selectedEvent)?.name}
                </CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    {new Date(events.find(e => e.id === selectedEvent)?.date || "").toLocaleDateString()}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="font-medium mb-2">Event Registrations</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Roll Number</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {registrations
                      .filter(reg => reg.eventId === selectedEvent)
                      .map(reg => (
                        <TableRow key={reg.id}>
                          <TableCell>{reg.studentName}</TableCell>
                          <TableCell>{reg.rollNumber}</TableCell>
                          <TableCell>
                            <Badge variant={
                              reg.status === 'approved' ? 'default' : 
                              reg.status === 'pending' ? 'outline' : 'destructive'
                            }>
                              {reg.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={
                              reg.paymentStatus === 'paid' ? 'default' : 
                              reg.paymentStatus === 'unpaid' ? 'outline' : 'destructive'
                            }>
                              {reg.paymentStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => approveRegistration(reg.id)}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => declineRegistration(reg.id)}
                              >
                                <AlertCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                <div className="mt-4 flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      toast({
                        title: "Export Successful",
                        description: "Registration data exported to CSV successfully.",
                      });
                    }}
                  >
                    <FileDown className="mr-2 h-4 w-4" />
                    Export to CSV
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => setSelectedEvent(null)}
                  >
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        {/* Registrations Tab */}
        <TabsContent value="registrations" className="space-y-4">
          <h2 className="text-xl font-semibold">All Registrations</h2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Roll Number</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {registrations.map(reg => {
                    const event = events.find(e => e.id === reg.eventId);
                    return (
                      <TableRow key={reg.id}>
                        <TableCell>{event?.name}</TableCell>
                        <TableCell>{reg.studentName}</TableCell>
                        <TableCell>{reg.rollNumber}</TableCell>
                        <TableCell>
                          <Badge variant={
                            reg.status === 'approved' ? 'default' : 
                            reg.status === 'pending' ? 'outline' : 'destructive'
                          }>
                            {reg.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            reg.paymentStatus === 'paid' ? 'default' : 
                            reg.paymentStatus === 'unpaid' ? 'outline' : 'destructive'
                          }>
                            {reg.paymentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                toast({
                                  title: "Student Details",
                                  description: `Email: ${reg.email}`,
                                });
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => approveRegistration(reg.id)}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => declineRegistration(reg.id)}
                            >
                              <AlertCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    toast({
                      title: "Export Successful",
                      description: "Registration data exported to CSV successfully.",
                    });
                  }}
                >
                  <FileDown className="mr-2 h-4 w-4" />
                  Export All to CSV
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Committee Members Tab */}
        <TabsContent value="members" className="space-y-4">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">Committee Members</h2>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Member
            </Button>
          </div>
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {committeeMembers.map(member => (
                  <Card key={member.id}>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.image} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <CardDescription>{member.role}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardFooter className="flex justify-between">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-4">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">Attendance Management</h2>
            <Button onClick={() => setUploadingAttendance(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Upload Attendance
            </Button>
          </div>
          
          {uploadingAttendance ? (
            <Card>
              <CardHeader>
                <CardTitle>Upload Attendance Sheet</CardTitle>
                <CardDescription>Upload attendance sheet images for an event</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAttendanceUpload} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="attendance-event">Select Event</Label>
                    <select 
                      id="attendance-event" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={selectedAttendanceEvent || ""}
                      onChange={(e) => setSelectedAttendanceEvent(Number(e.target.value))}
                      required
                    >
                      <option value="">Select an event</option>
                      {events.map(event => (
                        <option key={event.id} value={event.id}>{event.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="attendance-image">Attendance Sheet Image</Label>
                    <Input 
                      id="attendance-image" 
                      type="file" 
                      accept="image/*"
                      onChange={handleAttendanceImageChange}
                      required
                    />
                  </div>
                  
                  <div className="flex space-x-2 pt-4">
                    <Button type="submit">Upload</Button>
                    <Button type="button" variant="outline" onClick={() => setUploadingAttendance(false)}>Cancel</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {attendanceData.map(attendance => (
                <Card key={attendance.id}>
                  <CardHeader>
                    <CardTitle>{attendance.eventName}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        {new Date(attendance.date).toLocaleDateString()}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4 items-center mb-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{attendance.attendanceCount} attendees</span>
                      </div>
                      <Button variant="outline" size="sm">
                        <ImageIcon className="mr-2 h-4 w-4" />
                        View Sheets
                      </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {attendance.sheetImages.map((img, index) => (
                        <div key={index} className="relative aspect-[3/4] overflow-hidden rounded-md border">
                          <img
                            src={img}
                            alt={`Attendance sheet ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommitteeDashboard;
