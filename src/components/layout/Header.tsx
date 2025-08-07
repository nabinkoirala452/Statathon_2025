import { BarChart3, Database } from "lucide-react";

interface HeaderProps {
  currentStep?: number;
}

const Header = ({ currentStep }: HeaderProps) => {
  const steps = [
    { id: 1, name: "Upload", description: "Import Data" },
    { id: 2, name: "Clean", description: "Process & Validate" },
    { id: 3, name: "Analyze", description: "Apply Weights" },
    { id: 4, name: "Report", description: "Generate Results" }
  ];

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-light">
              <Database className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Survey Data Processor</h1>
              <p className="text-sm text-muted-foreground">Automated Statistical Analysis Platform</p>
            </div>
          </div>

          {/* Step Indicator */}
          {currentStep && (
            <div className="hidden md:flex items-center space-x-1">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`
                    flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200
                    ${currentStep === step.id 
                      ? 'bg-primary text-primary-foreground shadow-md' 
                      : currentStep > step.id 
                        ? 'bg-success/10 text-success-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }
                  `}>
                    <div className={`
                      w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium
                      ${currentStep === step.id 
                        ? 'bg-primary-foreground text-primary' 
                        : currentStep > step.id 
                          ? 'bg-success text-success-foreground' 
                          : 'bg-muted-foreground/20'
                      }
                    `}>
                      {step.id}
                    </div>
                    <div className="hidden lg:block">
                      <div className="text-sm font-medium">{step.name}</div>
                      <div className="text-xs opacity-75">{step.description}</div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-8 h-px bg-border mx-2" />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Stats Badge */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">Professional Analytics</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;