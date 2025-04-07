
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import StudentDashboard from '@/components/dashboard/StudentDashboard';
import TeacherDashboard from '@/components/dashboard/TeacherDashboard';
import CommitteeDashboard from '@/components/dashboard/CommitteeDashboard';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import EventsPage from '@/components/dashboard/shared/EventsPage';
import ProfilePage from '@/components/dashboard/shared/ProfilePage';
import NotificationsPage from '@/components/dashboard/shared/NotificationsPage';
import CalendarPage from '@/components/dashboard/shared/CalendarPage';

const Dashboard = () => {
  const { role, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={
          role === 'student' ? <StudentDashboard /> :
          role === 'teacher' ? <TeacherDashboard /> :
          role === 'committee' ? <CommitteeDashboard /> :
          <Navigate to="/role-selection" replace />
        } />
        
        {/* Common routes for all roles */}
        <Route path="events" element={<EventsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="calendar" element={<CalendarPage />} />
        
        {/* Student specific routes */}
        <Route path="registrations" element={
          role === 'student' ? <StudentDashboard view="registrations" /> : <Navigate to="/dashboard" replace />
        } />
        
        {/* Teacher specific routes */}
        <Route path="manage-registrations" element={
          role === 'teacher' ? <TeacherDashboard view="manage-registrations" /> : <Navigate to="/dashboard" replace />
        } />
        <Route path="attendance" element={
          role === 'teacher' ? <TeacherDashboard view="attendance" /> : <Navigate to="/dashboard" replace />
        } />
        <Route path="payments" element={
          role === 'teacher' ? <TeacherDashboard view="payments" /> : <Navigate to="/dashboard" replace />
        } />
        
        {/* Committee specific routes */}
        <Route path="create-event" element={
          role === 'committee' ? <CommitteeDashboard view="create-event" /> : <Navigate to="/dashboard" replace />
        } />
        <Route path="committee-members" element={
          role === 'committee' ? <CommitteeDashboard view="committee-members" /> : <Navigate to="/dashboard" replace />
        } />
        <Route path="attendance-history" element={
          role === 'committee' ? <CommitteeDashboard view="attendance-history" /> : <Navigate to="/dashboard" replace />
        } />
        
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;
