
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '@/context/AuthContext';
import { 
  CalendarDays, Users, CheckCircle, Ban, Clock, Download, Upload, Search,
  FileText, DollarSign, PieChart, BarChart2, Activity, Filter, Plus, RefreshCw
} from 'lucide-react';

// Placeholder data (would normally come from an API)
const studentsData = [
  { id: 1, name: "John Doe", roll: "CSI001", event: "Tech Symposium", status: "approved", payment: "paid", attendance: "present" },
  { id: 2, name: "Jane Smith", roll: "CSI002", event: "Code Sprint", status: "pending", payment: "pending", attendance: "absent" },
  { id: 3, name: "Alex Johnson", roll: "CSI003", event: "Design Workshop", status: "declined", payment: "refunded", attendance: "absent" },
  { id: 4, name: "Maya Patel", roll: "CSI004", event: "Tech Symposium", status: "approved", payment: "paid", attendance: "present" },
  { id: 5, name: "Chris Wilson", roll: "CSI005", event: "Hackathon", status: "approved", payment: "paid", attendance: "present" },
  { id: 6, name: "Sarah Lee", roll: "CSI006", event: "AI Seminar", status: "pending", payment: "pending", attendance: "absent" },
  { id: 7, name: "David Brown", roll: "CSI007", event: "Cloud Computing", status: "approved", payment: "paid", attendance: "present" },
  { id: 8, name: "Emma Davis", roll: "CSI008", event: "Cyber Security", status: "declined", payment: "refunded", attendance: "absent" },
];

const eventsData = [
  { id: 1, name: "Tech Symposium", date: "2023-06-15", registrations: 45, payments: 38, attended: 35 },
  { id: 2, name: "Code Sprint", date: "2023-07-22", registrations: 30, payments: 25, attended: 23 },
  { id: 3, name: "Design Workshop", date: "2023-08-05", registrations: 25, payments: 20, attended: 18 },
  { id: 4, name: "Hackathon", date: "2023-09-10", registrations: 60, payments: 55, attended: 52 },
  { id: 5, name: "AI Seminar", date: "2023-10-20", registrations: 40, payments: 35, attended: 32 },
];

const analyticsData = [
  { name: 'Jan', students: 30 },
  { name: 'Feb', students: 45 },
  { name: 'Mar', students: 35 },
  { name: 'Apr', students: 50 },
  { name: 'May', students: 65 },
  { name: 'Jun', students: 75 },
  { name: 'Jul', students: 60 },
  { name: 'Aug', students: 90 },
  { name: 'Sep', students: 80 },
  { name: 'Oct', students: 95 },
  { name: 'Nov', students: 85 },
  { name: 'Dec', students: 110 },
];

interface TeacherDashboardProps {
  view?: string;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ view = "home" }) => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [activeTab, setActiveTab] = useState(view);
  
  // Filter students based on search and status
  const filteredStudents = studentsData.filter(student => 
    (student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     student.roll.toLowerCase().includes(searchTerm.toLowerCase()) ||
     student.event.toLowerCase().includes(searchTerm.toLowerCase())) && 
    (filterStatus === "all" || student.status === filterStatus)
  );
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "declined": return "bg-red-100 text-red-800";
      case "paid": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "refunded": return "bg-gray-100 text-gray-800";
      case "present": return "bg-green-100 text-green-800";
      case "absent": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header Section with Greeting and User Info */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back, {user?.name}</h1>
          <p className="text-muted-foreground">
            Here's an overview of student registrations and activities.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="outline" className="hidden sm:flex">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>
      
      {/* Dashboard Tabs */}
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
          <TabsTrigger value="home" className="flex items-center">
            <PieChart className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="manage-registrations" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Registrations</span>
          </TabsTrigger>
          <TabsTrigger value="attendance" className="flex items-center">
            <CheckCircle className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Attendance</span>
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center">
            <DollarSign className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Payments</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center">
            <BarChart2 className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Analytics</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Home Dashboard */}
        <TabsContent value="home" className="space-y-4">
          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Registrations
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">235</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Payments Completed
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹42,530</div>
                <p className="text-xs text-muted-foreground">
                  +6.2% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Event Attendance
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">182</div>
                <p className="text-xs text-muted-foreground">
                  87.4% attendance rate
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Approvals
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  Action required
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Registrations */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Registrations</CardTitle>
              <CardDescription>
                You have {filteredStudents.length} registrations in total
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search registrations..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="status-filter" className="text-sm hidden sm:block">
                      Status:
                    </Label>
                    <select
                      id="status-filter"
                      className="p-2 text-sm border rounded-md"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="all">All</option>
                      <option value="approved">Approved</option>
                      <option value="pending">Pending</option>
                      <option value="declined">Declined</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <ScrollArea className="h-[300px]">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-7 gap-4 p-4 font-medium text-sm">
                      <div className="col-span-2">Student</div>
                      <div className="col-span-1">Event</div>
                      <div className="col-span-1">Registration</div>
                      <div className="col-span-1">Payment</div>
                      <div className="col-span-1">Attendance</div>
                      <div className="col-span-1">Actions</div>
                    </div>
                    <Separator />
                    
                    {filteredStudents.map((student) => (
                      <div key={student.id}>
                        <div className="grid grid-cols-7 gap-4 p-4 items-center text-sm">
                          <div className="col-span-2">
                            <div className="font-medium">{student.name}</div>
                            <div className="text-muted-foreground">{student.roll}</div>
                          </div>
                          <div className="col-span-1 truncate">
                            {student.event}
                          </div>
                          <div className="col-span-1">
                            <Badge variant="outline" className={getStatusColor(student.status)}>
                              {student.status}
                            </Badge>
                          </div>
                          <div className="col-span-1">
                            <Badge variant="outline" className={getStatusColor(student.payment)}>
                              {student.payment}
                            </Badge>
                          </div>
                          <div className="col-span-1">
                            <Badge variant="outline" className={getStatusColor(student.attendance)}>
                              {student.attendance}
                            </Badge>
                          </div>
                          <div className="col-span-1 flex space-x-2">
                            <Button size="sm" variant="ghost">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Ban className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <Separator />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Export to CSV</Button>
              <Button>View All</Button>
            </CardFooter>
          </Card>
          
          {/* Events Calendar Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>
                You have {eventsData.length} events scheduled
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {eventsData.slice(0, 3).map((event) => (
                  <div key={event.id} className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-3 rounded-md">
                      <CalendarDays className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium leading-none">{event.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="text-sm text-primary font-medium">
                      {event.registrations} registrations
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <CalendarDays className="mr-2 h-4 w-4" />
                View Calendar
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Registrations Management */}
        <TabsContent value="manage-registrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Registration Management</CardTitle>
              <CardDescription>
                Review and manage student registrations for all events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search by name, roll number, or event..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
                
                <div className="rounded-md border">
                  <div className="grid grid-cols-6 gap-4 p-4 font-medium text-sm">
                    <div className="col-span-2">Student</div>
                    <div className="col-span-1">Event</div>
                    <div className="col-span-1">Registration Date</div>
                    <div className="col-span-1">Status</div>
                    <div className="col-span-1">Actions</div>
                  </div>
                  <Separator />
                  
                  <ScrollArea className="h-[500px]">
                    {studentsData.map((student) => (
                      <div key={student.id}>
                        <div className="grid grid-cols-6 gap-4 p-4 items-center text-sm">
                          <div className="col-span-2">
                            <div className="font-medium">{student.name}</div>
                            <div className="text-muted-foreground">{student.roll}</div>
                          </div>
                          <div className="col-span-1">
                            {student.event}
                          </div>
                          <div className="col-span-1">
                            {new Date().toLocaleDateString()}
                          </div>
                          <div className="col-span-1">
                            <Badge className={getStatusColor(student.status)}>
                              {student.status}
                            </Badge>
                          </div>
                          <div className="col-span-1 flex space-x-2">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Ban className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <FileText className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <Separator />
                      </div>
                    ))}
                  </ScrollArea>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Attendance Management */}
        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Event Attendance Management</CardTitle>
              <CardDescription>
                Track and manage student attendance for all events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <select className="p-2 text-sm border rounded-md flex-1">
                    <option value="">Select Event</option>
                    {eventsData.map(event => (
                      <option key={event.id} value={event.id}>
                        {event.name} - {new Date(event.date).toLocaleDateString()}
                      </option>
                    ))}
                  </select>
                  
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Import
                  </Button>
                  
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
                
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 gap-4 p-4 font-medium text-sm">
                    <div className="col-span-2">Student</div>
                    <div className="col-span-1">Registration ID</div>
                    <div className="col-span-1">Attendance Status</div>
                    <div className="col-span-1">Mark Attendance</div>
                  </div>
                  <Separator />
                  
                  <ScrollArea className="h-[500px]">
                    {studentsData.map((student) => (
                      <div key={student.id}>
                        <div className="grid grid-cols-5 gap-4 p-4 items-center text-sm">
                          <div className="col-span-2">
                            <div className="font-medium">{student.name}</div>
                            <div className="text-muted-foreground">{student.roll}</div>
                          </div>
                          <div className="col-span-1">
                            REG-{1000 + student.id}
                          </div>
                          <div className="col-span-1">
                            <Badge className={getStatusColor(student.attendance)}>
                              {student.attendance}
                            </Badge>
                          </div>
                          <div className="col-span-1">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="flex-1">
                                <CheckCircle className="mr-1 h-4 w-4" />
                                Present
                              </Button>
                              <Button size="sm" variant="outline" className="flex-1">
                                <Ban className="mr-1 h-4 w-4" />
                                Absent
                              </Button>
                            </div>
                          </div>
                        </div>
                        <Separator />
                      </div>
                    ))}
                  </ScrollArea>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload Attendance Sheet
              </Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Payments Management */}
        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Tracking</CardTitle>
              <CardDescription>
                Monitor payment status for all event registrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search payments..."
                      className="pl-8"
                    />
                  </div>
                  
                  <select className="p-2 text-sm border rounded-md">
                    <option value="all">All Payment Status</option>
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="refunded">Refunded</option>
                  </select>
                  
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
                
                <div className="rounded-md border">
                  <div className="grid grid-cols-6 gap-4 p-4 font-medium text-sm">
                    <div className="col-span-2">Student</div>
                    <div className="col-span-1">Event</div>
                    <div className="col-span-1">Amount</div>
                    <div className="col-span-1">Payment Status</div>
                    <div className="col-span-1">Actions</div>
                  </div>
                  <Separator />
                  
                  <ScrollArea className="h-[500px]">
                    {studentsData.map((student) => (
                      <div key={student.id}>
                        <div className="grid grid-cols-6 gap-4 p-4 items-center text-sm">
                          <div className="col-span-2">
                            <div className="font-medium">{student.name}</div>
                            <div className="text-muted-foreground">{student.roll}</div>
                          </div>
                          <div className="col-span-1">
                            {student.event}
                          </div>
                          <div className="col-span-1">
                            ₹{(Math.floor(Math.random() * 10) + 1) * 100}
                          </div>
                          <div className="col-span-1">
                            <Badge className={getStatusColor(student.payment)}>
                              {student.payment}
                            </Badge>
                          </div>
                          <div className="col-span-1 flex space-x-2">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <FileText className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <Separator />
                      </div>
                    ))}
                  </ScrollArea>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Generate Report</Button>
              <Button>Send Payment Reminders</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Analytics Dashboard */}
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Registration Analytics</CardTitle>
              <CardDescription>
                View trends and statistics for student registrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="students" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Event Participation</CardTitle>
                <CardDescription>
                  Breakdown of student participation by event
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {eventsData.map((event) => (
                    <div key={event.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{event.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {event.registrations} registrations
                        </div>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${(event.registrations / 100) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Payment Statistics</CardTitle>
                <CardDescription>
                  Overview of payment status for all events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2 text-center p-4 bg-green-50 rounded-lg">
                      <DollarSign className="h-8 w-8 mx-auto text-green-500" />
                      <div className="text-2xl font-bold">₹42,530</div>
                      <div className="text-sm text-muted-foreground">Total Revenue</div>
                    </div>
                    <div className="space-y-2 text-center p-4 bg-yellow-50 rounded-lg">
                      <Clock className="h-8 w-8 mx-auto text-yellow-500" />
                      <div className="text-2xl font-bold">24</div>
                      <div className="text-sm text-muted-foreground">Pending Payments</div>
                    </div>
                    <div className="space-y-2 text-center p-4 bg-blue-50 rounded-lg">
                      <Activity className="h-8 w-8 mx-auto text-blue-500" />
                      <div className="text-2xl font-bold">87%</div>
                      <div className="text-sm text-muted-foreground">Payment Rate</div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h4 className="text-sm font-medium mb-3">Recent Transactions</h4>
                    <div className="space-y-3">
                      {studentsData.slice(0, 3).map((student) => (
                        <div key={student.id} className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-xs text-muted-foreground">{student.event}</div>
                          </div>
                          <div className="text-sm font-medium">
                            ₹{(Math.floor(Math.random() * 10) + 1) * 100}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherDashboard;
