
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, Settings } from 'lucide-react';
import FadeIn from '../animations/FadeIn';
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <FadeIn direction="left">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-primary font-display font-bold text-2xl">CSI</span>
            <span className="font-display font-medium tracking-tight">Computer Society of India</span>
          </Link>
        </FadeIn>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <FadeIn>
            <Link 
              to="/" 
              className={`font-medium transition-all duration-300 hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-foreground/80'
              }`}
            >
              Home
            </Link>
          </FadeIn>
          <FadeIn>
            <Link 
              to="/about" 
              className={`font-medium transition-all duration-300 hover:text-primary ${
                isActive('/about') ? 'text-primary' : 'text-foreground/80'
              }`}
            >
              About
            </Link>
          </FadeIn>
          <FadeIn>
            <Link 
              to="/events" 
              className={`font-medium transition-all duration-300 hover:text-primary ${
                isActive('/events') ? 'text-primary' : 'text-foreground/80'
              }`}
            >
              Events
            </Link>
          </FadeIn>
          <FadeIn>
            <Link 
              to="/contact" 
              className={`font-medium transition-all duration-300 hover:text-primary ${
                isActive('/contact') ? 'text-primary' : 'text-foreground/80'
              }`}
            >
              Contact
            </Link>
          </FadeIn>
          <FadeIn>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <Settings className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-4 animate-fade-in">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm">Settings</h4>
                  <div className="space-y-2">
                    <Link to="/settings/profile" className="block py-1.5 text-sm hover:text-primary transition-colors">
                      Profile Settings
                    </Link>
                    <Link to="/settings/appearance" className="block py-1.5 text-sm hover:text-primary transition-colors">
                      Appearance
                    </Link>
                    <Link to="/settings/notifications" className="block py-1.5 text-sm hover:text-primary transition-colors">
                      Notifications
                    </Link>
                    <Link to="/settings/account" className="block py-1.5 text-sm hover:text-primary transition-colors">
                      Account Settings
                    </Link>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </FadeIn>
          <FadeIn>
            <Button asChild size="sm" className="rounded-full">
              <Link to="/role-selection">Get Started</Link>
            </Button>
          </FadeIn>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <Settings className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-4 animate-fade-in">
              <div className="space-y-4">
                <h4 className="font-medium text-sm">Settings</h4>
                <div className="space-y-2">
                  <Link to="/settings/profile" className="block py-1.5 text-sm hover:text-primary transition-colors">
                    Profile Settings
                  </Link>
                  <Link to="/settings/appearance" className="block py-1.5 text-sm hover:text-primary transition-colors">
                    Appearance
                  </Link>
                  <Link to="/settings/notifications" className="block py-1.5 text-sm hover:text-primary transition-colors">
                    Notifications
                  </Link>
                  <Link to="/settings/account" className="block py-1.5 text-sm hover:text-primary transition-colors">
                    Account Settings
                  </Link>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass absolute top-full left-0 right-0 px-4 py-5 flex flex-col space-y-4 border-t border-border/50 animate-fade-in">
          <Link 
            to="/" 
            className={`font-medium px-4 py-2 rounded-md hover:bg-primary/10 transition-colors ${
              isActive('/') ? 'text-primary bg-primary/5' : 'text-foreground/80'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={`font-medium px-4 py-2 rounded-md hover:bg-primary/10 transition-colors ${
              isActive('/about') ? 'text-primary bg-primary/5' : 'text-foreground/80'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            to="/events" 
            className={`font-medium px-4 py-2 rounded-md hover:bg-primary/10 transition-colors ${
              isActive('/events') ? 'text-primary bg-primary/5' : 'text-foreground/80'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Events
          </Link>
          <Link 
            to="/contact" 
            className={`font-medium px-4 py-2 rounded-md hover:bg-primary/10 transition-colors ${
              isActive('/contact') ? 'text-primary bg-primary/5' : 'text-foreground/80'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
          <Button asChild className="w-full rounded-full">
            <Link to="/role-selection" onClick={() => setIsMobileMenuOpen(false)}>
              Get Started
            </Link>
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
