
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils";
import GlassmorphicCard from './GlassmorphicCard';

interface RoleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  role: 'student' | 'teacher' | 'committee';
  className?: string;
}

const RoleCard: React.FC<RoleCardProps> = ({
  title,
  description,
  icon,
  role,
  className = '',
}) => {
  const navigate = useNavigate();

  const handleRoleSelect = () => {
    navigate(`/auth/signin?role=${role}`);
  };

  return (
    <GlassmorphicCard 
      className={cn(
        'cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
        className
      )}
      hoverable
    >
      <div 
        className="flex flex-col items-center p-4 text-center"
        onClick={handleRoleSelect}
      >
        <div className="mb-4 bg-primary/10 p-4 rounded-full text-primary">
          {icon}
        </div>
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </GlassmorphicCard>
  );
};

export default RoleCard;
