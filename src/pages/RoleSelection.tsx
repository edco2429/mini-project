
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/animations/FadeIn';
import RoleCard from '@/components/ui/RoleCard';
import { Users, BookOpen, Award } from 'lucide-react';

const RoleSelection = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <FadeIn>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Select Your Role</h1>
            </FadeIn>
            <FadeIn delay="100">
              <p className="text-muted-foreground max-w-xl mx-auto">
                Choose your role to access the appropriate dashboard and features tailored for you.
              </p>
            </FadeIn>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay="200">
              <RoleCard
                title="Student"
                description="Register for events, track your participation, and access resources."
                icon={<Users className="h-6 w-6" />}
                role="student"
              />
            </FadeIn>
            
            <FadeIn delay="300">
              <RoleCard
                title="Teacher"
                description="Manage student registrations, events, and track attendance."
                icon={<BookOpen className="h-6 w-6" />}
                role="teacher"
              />
            </FadeIn>
            
            <FadeIn delay="300">
              <RoleCard
                title="Committee Member"
                description="Create and manage events, track participation, and handle approvals."
                icon={<Award className="h-6 w-6" />}
                role="committee"
              />
            </FadeIn>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RoleSelection;
