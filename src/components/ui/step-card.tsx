import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StepCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  isActive?: boolean;
}

const StepCard = ({ title, description, icon, children, className, isActive = false }: StepCardProps) => {
  return (
    <Card className={cn(
      "transition-all duration-300 hover:shadow-lg",
      isActive && "ring-2 ring-primary ring-offset-2 shadow-lg",
      className
    )}>
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          {icon && (
            <div className={cn(
              "p-2 rounded-lg transition-colors",
              isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            )}>
              {icon}
            </div>
          )}
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="text-sm">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default StepCard;