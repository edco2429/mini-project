
import React, { ReactNode } from 'react';
import { cn } from "@/lib/utils";

interface GlassmorphicCardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  darkMode?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({
  children,
  className = '',
  hoverable = false,
  darkMode = false,
  padding = 'md',
  borderRadius = 'lg',
}) => {
  const getPaddingClass = () => {
    if (padding === 'none') return 'p-0';
    if (padding === 'sm') return 'p-3';
    if (padding === 'lg') return 'p-8';
    return 'p-5';
  };

  const getBorderRadiusClass = () => {
    if (borderRadius === 'none') return 'rounded-none';
    if (borderRadius === 'sm') return 'rounded-sm';
    if (borderRadius === 'md') return 'rounded-md';
    if (borderRadius === 'full') return 'rounded-full';
    return 'rounded-xl';
  };

  return (
    <div
      className={cn(
        darkMode ? 'glass-dark' : 'glass',
        getPaddingClass(),
        getBorderRadiusClass(),
        hoverable ? 'transition-all duration-300 hover:shadow-subtle-lg hover:-translate-y-1' : '',
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassmorphicCard;
