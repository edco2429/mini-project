
import React from 'react';
import { Link } from 'react-router-dom';
import FadeIn from '../animations/FadeIn';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border/50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <FadeIn direction="up" delay="100">
            <div className="space-y-4">
              <Link to="/" className="flex items-center space-x-2">
                <span className="text-primary font-display font-bold text-2xl">CSI</span>
                <span className="font-display font-medium tracking-tight">Computer Society of India</span>
              </Link>
              <p className="text-muted-foreground text-sm max-w-xs">
                Computer Society of India - Student Branch. Connecting students through technology and innovation.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay="200">
            <div>
              <h4 className="font-display font-medium text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/events" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    Events
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay="300">
            <div>
              <h4 className="font-display font-medium text-lg mb-4">Member Access</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/role-selection" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link to="/auth/signup" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    Register
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay="300">
            <div>
              <h4 className="font-display font-medium text-lg mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>College Campus, College Road</li>
                <li>City, State - Pincode</li>
                <li>Email: contact@csiconnect.edu</li>
                <li>Phone: +91 123 456 7890</li>
              </ul>
            </div>
          </FadeIn>
        </div>

        <div className="mt-12 pt-6 border-t border-border/50 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Computer Society of India. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
