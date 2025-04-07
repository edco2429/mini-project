
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/animations/FadeIn';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';
import { Calendar, Users, Award, FileText } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-10 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-50 to-transparent"></div>
        <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-blue-100 rounded-bl-[100px] opacity-50 z-0"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6 max-w-xl">
              <FadeIn>
                <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium">
                  Computer Society of India
                </div>
              </FadeIn>
              
              <FadeIn>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                  Empowering Students Through Technology
                </h1>
              </FadeIn>
              
              <FadeIn>
                <p className="text-lg text-muted-foreground">
                  Join CSI to enhance your skills, participate in events, and connect with like-minded peers in the tech community.
                </p>
              </FadeIn>
              
              <FadeIn>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="rounded-full">
                    <Link to="/role-selection">Get Started</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-full">
                    <Link to="/about">Learn More</Link>
                  </Button>
                </div>
              </FadeIn>
            </div>
            
            <FadeIn direction="right" className="hidden lg:block">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-20 h-20 bg-primary/10 rounded-full animate-float"></div>
                <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-primary/20 rounded-full animate-float animation-delay-500"></div>
                <GlassmorphicCard className="p-10 h-full">
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Join CSI Today</h2>
                    <p className="text-muted-foreground">
                      The Computer Society of India (CSI) is a professional organization dedicated to the advancement of computing and information technology.
                    </p>
                    <p className="text-muted-foreground">
                      Our mission is to facilitate research, knowledge sharing, and career growth among students and professionals in the computing field.
                    </p>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/about">About Our Chapter</Link>
                    </Button>
                  </div>
                </GlassmorphicCard>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4 md:px-10">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Join CSI?</h2>
            </FadeIn>
            <FadeIn>
              <p className="text-muted-foreground">
                CSI offers a range of opportunities to enhance your academic and professional journey.
              </p>
            </FadeIn>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FadeIn>
              <GlassmorphicCard hoverable className="h-full">
                <div className="flex flex-col items-center text-center p-6">
                  <div className="bg-primary/10 p-4 rounded-full mb-6 text-primary">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-medium mb-3">Events & Workshops</h3>
                  <p className="text-muted-foreground text-sm">
                    Participate in technical workshops, hackathons, and industry-led sessions.
                  </p>
                </div>
              </GlassmorphicCard>
            </FadeIn>
            
            <FadeIn>
              <GlassmorphicCard hoverable className="h-full">
                <div className="flex flex-col items-center text-center p-6">
                  <div className="bg-primary/10 p-4 rounded-full mb-6 text-primary">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-medium mb-3">Networking</h3>
                  <p className="text-muted-foreground text-sm">
                    Connect with peers, faculty, and industry professionals in the tech community.
                  </p>
                </div>
              </GlassmorphicCard>
            </FadeIn>
            
            <FadeIn>
              <GlassmorphicCard hoverable className="h-full">
                <div className="flex flex-col items-center text-center p-6">
                  <div className="bg-primary/10 p-4 rounded-full mb-6 text-primary">
                    <Award className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-medium mb-3">Recognition</h3>
                  <p className="text-muted-foreground text-sm">
                    Gain certificates and recognition for participation and achievements.
                  </p>
                </div>
              </GlassmorphicCard>
            </FadeIn>
            
            <FadeIn>
              <GlassmorphicCard hoverable className="h-full">
                <div className="flex flex-col items-center text-center p-6">
                  <div className="bg-primary/10 p-4 rounded-full mb-6 text-primary">
                    <FileText className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-medium mb-3">Resources</h3>
                  <p className="text-muted-foreground text-sm">
                    Access study materials, technical resources, and industry insights.
                  </p>
                </div>
              </GlassmorphicCard>
            </FadeIn>
          </div>
        </div>
      </section>
      
      {/* About College Section */}
      <section className="py-20 px-4 md:px-10 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <GlassmorphicCard className="p-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Our College</h3>
                  <p className="text-muted-foreground">
                    Our college is dedicated to providing a comprehensive educational experience that prepares students for the challenges of the technology industry.
                  </p>
                  <p className="text-muted-foreground">
                    With state-of-the-art facilities and experienced faculty, we create an environment that fosters innovation, critical thinking, and practical application of knowledge.
                  </p>
                  <Button asChild variant="outline">
                    <Link to="/about#college">Explore Our Facilities</Link>
                  </Button>
                </div>
              </GlassmorphicCard>
            </FadeIn>
            
            <div className="space-y-6">
              <FadeIn>
                <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium">
                  About Our College
                </div>
              </FadeIn>
              
              <FadeIn>
                <h2 className="text-3xl md:text-4xl font-bold">Excellence in Education & Innovation</h2>
              </FadeIn>
              
              <FadeIn>
                <p className="text-muted-foreground">
                  Our college is committed to providing quality education and fostering a culture of innovation 
                  and research. With state-of-the-art facilities and experienced faculty, we prepare students 
                  for successful careers in technology and engineering.
                </p>
              </FadeIn>
              
              <FadeIn>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="bg-primary/10 p-1 rounded-full text-primary mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    <span>Modern infrastructure with cutting-edge technology labs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/10 p-1 rounded-full text-primary mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    <span>Industry partnerships for internships and placements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/10 p-1 rounded-full text-primary mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    <span>Research-focused curriculum with practical applications</span>
                  </li>
                </ul>
              </FadeIn>
              
              <FadeIn>
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/about">Learn More About Our College</Link>
                </Button>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 md:px-10">
        <div className="container mx-auto">
          <FadeIn>
            <GlassmorphicCard className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-none overflow-hidden">
              <div className="relative py-14 px-8 text-center">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
                
                <div className="relative z-10 max-w-3xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join CSI?</h2>
                  <p className="text-white/80 text-lg mb-8">
                    Take the first step towards enhancing your technical journey by joining the CSI community.
                  </p>
                  <Button asChild size="lg" variant="secondary" className="rounded-full">
                    <Link to="/role-selection">Get Started Now</Link>
                  </Button>
                </div>
              </div>
            </GlassmorphicCard>
          </FadeIn>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
