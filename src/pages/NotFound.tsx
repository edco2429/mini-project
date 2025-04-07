
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/animations/FadeIn';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="container max-w-md mx-auto text-center">
          <FadeIn>
            <GlassmorphicCard>
              <div className="p-8">
                <div className="bg-primary/10 text-primary w-20 h-20 rounded-full flex items-center justify-center text-4xl font-bold mx-auto mb-6">
                  404
                </div>
                <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
                <p className="text-muted-foreground mb-6">
                  The page you're looking for doesn't exist or has been moved.
                </p>
                <Button asChild className="rounded-full">
                  <Link to="/">Return to Home</Link>
                </Button>
              </div>
            </GlassmorphicCard>
          </FadeIn>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
