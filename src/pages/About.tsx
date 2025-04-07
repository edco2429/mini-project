
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import FadeIn from '@/components/animations/FadeIn';

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-10">
        <FadeIn>
          <h1 className="text-4xl font-bold mb-8 text-center">About CSI-IT FCRIT</h1>
        </FadeIn>
        
        <div className="max-w-4xl mx-auto space-y-10">
          <FadeIn delay="100">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-primary">Our Mission</h2>
              <p className="text-lg text-muted-foreground">
                CSI-IT FCRIT (Computer Society of India - Information Technology, FR. C. Rodrigues Institute of Technology) 
                is dedicated to fostering a community of tech enthusiasts, developers, and innovators. 
                We aim to bridge the gap between academic learning and industry requirements by providing 
                platforms for knowledge exchange, skill development, and networking opportunities.
              </p>
            </div>
          </FadeIn>
          
          <FadeIn delay="200">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-primary">What We Do</h2>
              <div className="space-y-2">
                <p className="text-lg text-muted-foreground">
                  CSI-IT FCRIT organizes a wide range of activities to promote technical excellence and 
                  professional development among students:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Technical workshops and hands-on sessions on cutting-edge technologies</li>
                  <li>Guest lectures by industry experts and academic professionals</li>
                  <li>Coding competitions, hackathons, and technical quizzes</li>
                  <li>Industry visits and exposure to real-world tech environments</li>
                  <li>Publication of technical journals and research papers</li>
                  <li>Networking events connecting students with industry professionals</li>
                </ul>
              </div>
            </div>
          </FadeIn>
          
          <FadeIn delay="300">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-primary">Our Vision</h2>
              <p className="text-lg text-muted-foreground">
                Our vision is to create a vibrant community of technology professionals who contribute 
                to the advancement of information technology and its applications across various domains. 
                We envision a platform where students can explore, learn, innovate, and excel in their 
                technical pursuits, preparing them for successful careers in the ever-evolving tech industry.
              </p>
            </div>
          </FadeIn>
          
          <FadeIn delay="300">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-primary">Core Values</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card rounded-lg p-6 border shadow-sm">
                  <h3 className="font-medium text-xl mb-2">Innovation</h3>
                  <p className="text-muted-foreground">We encourage creative thinking and innovative approaches to problem-solving, fostering a culture of continuous improvement and exploration.</p>
                </div>
                <div className="bg-card rounded-lg p-6 border shadow-sm">
                  <h3 className="font-medium text-xl mb-2">Excellence</h3>
                  <p className="text-muted-foreground">We strive for excellence in all our endeavors, maintaining high standards in both technical content and organizational efficiency.</p>
                </div>
                <div className="bg-card rounded-lg p-6 border shadow-sm">
                  <h3 className="font-medium text-xl mb-2">Collaboration</h3>
                  <p className="text-muted-foreground">We believe in the power of teamwork and collaboration, creating environments where ideas are shared and collective wisdom is harnessed.</p>
                </div>
                <div className="bg-card rounded-lg p-6 border shadow-sm">
                  <h3 className="font-medium text-xl mb-2">Inclusivity</h3>
                  <p className="text-muted-foreground">We are committed to creating an inclusive community that welcomes diversity in thought, background, and expertise.</p>
                </div>
              </div>
            </div>
          </FadeIn>
          
          <FadeIn delay="300">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-primary">History</h2>
              <p className="text-lg text-muted-foreground">
                CSI-IT FCRIT was established with the aim of enhancing the technical knowledge and 
                skills of students in the field of information technology. Over the years, we have 
                grown into a dynamic organization with a strong presence in technical education and 
                industry connections. Our journey has been marked by successful events, growing 
                participation, and meaningful contributions to the tech community.
              </p>
            </div>
          </FadeIn>
          
          <FadeIn delay="300">
            <div className="text-center pt-8">
              <Button size="lg" onClick={() => navigate('/contact')} className="mx-2">
                Contact Us
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/events')} className="mx-2">
                Explore Events
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
