
import React, { ReactNode } from 'react';
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: 'none' | '100' | '200' | '300' | '500' | '700' | '1000';
  duration?: 'fast' | 'normal' | 'slow';
  fullWidth?: boolean;
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  className = '',
  direction = 'up',
  delay = 'none',
  duration = 'normal',
  fullWidth = false,
}) => {
  const getAnimationClass = () => {
    if (direction === 'up') return 'animate-fade-in';
    if (direction === 'right') return 'animate-fade-in-right';
    if (direction === 'left') return 'animate-fade-in-left';
    return 'animate-fade-in';
  };

  const getDelayClass = () => {
    if (delay === 'none') return '';
    return `animation-delay-${delay}`;
  };

  const getDurationClass = () => {
    if (duration === 'fast') return 'duration-300';
    if (duration === 'slow') return 'duration-1000';
    return 'duration-700';
  };

  return (
    <div
      className={cn(
        'opacity-0',
        getAnimationClass(),
        getDelayClass(),
        getDurationClass(),
        fullWidth ? 'w-full' : '',
        className
      )}
    >
      {children}
    </div>
  );
};

export default FadeIn;
