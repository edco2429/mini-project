
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/animations/FadeIn';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';
import { useAuth } from '@/context/AuthContext';
import { User, Lock, Mail, UserCircle, KeyRound } from 'lucide-react';

// Form schemas
const signInSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

const signUpSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignInFormValues = z.infer<typeof signInSchema>;
type SignUpFormValues = z.infer<typeof signUpSchema>;

const Auth = () => {
  const { authType } = useParams<{ authType: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const roleParam = searchParams.get('role') as 'student' | 'teacher' | 'committee' | null;
  
  const [role, setRole] = useState<'student' | 'teacher' | 'committee' | null>(roleParam);
  const { login, signup, error, clearError, loading } = useAuth();
  
  const isSignIn = authType === 'signin';
  
  const roleLabels = {
    student: 'Student',
    teacher: 'Teacher',
    committee: 'Committee Member',
  };
  
  useEffect(() => {
    if (!role) {
      navigate('/role-selection');
    }
  }, [role, navigate]);
  
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);
  
  useEffect(() => {
    if (error) {
      toast({
        title: "Authentication Error",
        description: error,
        variant: "destructive"
      });
    }
  }, [error]);
  
  const signInForm = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  
  const signUpForm = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  
  const onSignInSubmit = async (values: SignInFormValues) => {
    if (role) {
      await login(values.email, values.password, role);
      if (!error) {
        toast({
          title: "Success",
          description: "Signed in successfully",
        });
        navigate('/dashboard');
      }
    }
  };
  
  const onSignUpSubmit = async (values: SignUpFormValues) => {
    if (role) {
      await signup(values.name, values.email, values.password, role);
      if (!error) {
        toast({
          title: "Success",
          description: "Account created successfully",
        });
        navigate('/dashboard');
      }
    }
  };
  
  const toggleAuthMode = () => {
    navigate(`/auth/${isSignIn ? 'signup' : 'signin'}?role=${role}`);
  };
  
  if (!role) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-blue-50">
      <Header />
      
      <main className="flex-grow pt-28 pb-20 px-4">
        <div className="container mx-auto max-w-md">
          <FadeIn>
            <div className="text-center mb-8">
              <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
                {roleLabels[role]} Access
              </div>
              <h1 className="text-3xl font-bold mb-2">
                {isSignIn ? 'Welcome Back' : 'Create Your Account'}
              </h1>
              <p className="text-muted-foreground">
                {isSignIn 
                  ? 'Sign in to access your CSI Registration dashboard' 
                  : 'Join the CSI Registration platform today'}
              </p>
            </div>
          </FadeIn>
          
          <FadeIn delay="100">
            <GlassmorphicCard className="shadow-xl">
              {isSignIn ? (
                <Form {...signInForm}>
                  <form onSubmit={signInForm.handleSubmit(onSignInSubmit)} className="space-y-6">
                    <FormField
                      control={signInForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="your.email@example.com" 
                              autoComplete="email"
                              type="email"
                              {...field} 
                              className="bg-background border-input" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={signInForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <KeyRound className="h-4 w-4" />
                            Password
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              autoComplete="current-password"
                              placeholder="••••••••" 
                              {...field} 
                              className="bg-background border-input"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={signInForm.formState.isSubmitting || loading}
                    >
                      {signInForm.formState.isSubmitting || loading ? 'Signing in...' : 'Sign In'}
                    </Button>
                  </form>
                </Form>
              ) : (
                <Form {...signUpForm}>
                  <form onSubmit={signUpForm.handleSubmit(onSignUpSubmit)} className="space-y-6">
                    <FormField
                      control={signUpForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <UserCircle className="h-4 w-4" />
                            Full Name
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="John Doe" 
                              autoComplete="name"
                              type="text"
                              {...field} 
                              className="bg-background border-input"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={signUpForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="your.email@example.com" 
                              autoComplete="email"
                              type="email"
                              {...field} 
                              className="bg-background border-input"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={signUpForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Lock className="h-4 w-4" />
                            Password
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              autoComplete="new-password"
                              placeholder="••••••••" 
                              {...field} 
                              className="bg-background border-input"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={signUpForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <KeyRound className="h-4 w-4" />
                            Confirm Password
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              autoComplete="new-password"
                              placeholder="••••••••" 
                              {...field} 
                              className="bg-background border-input"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={signUpForm.formState.isSubmitting || loading}
                    >
                      {signUpForm.formState.isSubmitting || loading ? 'Creating account...' : 'Create Account'}
                    </Button>
                  </form>
                </Form>
              )}
              
              <div className="mt-6 text-center text-sm">
                <p className="text-muted-foreground">
                  {isSignIn ? "Don't have an account?" : "Already have an account?"}
                  <Button variant="link" onClick={toggleAuthMode} className="p-0 h-auto font-medium">
                    {isSignIn ? " Sign up" : " Sign in"}
                  </Button>
                </p>
              </div>
            </GlassmorphicCard>
          </FadeIn>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
