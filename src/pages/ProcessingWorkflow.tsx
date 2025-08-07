import { useState } from "react";
import { Upload, Wrench, BarChart3, FileText, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/layout/Header";
import StepCard from "@/components/ui/step-card";
import UploadStep from "@/components/steps/UploadStep";
import CleaningStep from "@/components/steps/CleaningStep";
import AnalysisStep from "@/components/steps/AnalysisStep";
import ReportStep from "@/components/steps/ReportStep";

const ProcessingWorkflow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [data, setData] = useState<any>(null);

  const steps = [
    {
      id: 1,
      title: "Upload Data",
      description: "Import your survey data files",
      icon: <Upload className="w-5 h-5" />,
      component: UploadStep
    },
    {
      id: 2,
      title: "Clean & Validate",
      description: "Process and validate your data",
      icon: <Wrench className="w-5 h-5" />,
      component: CleaningStep
    },
    {
      id: 3,
      title: "Statistical Analysis",
      description: "Apply weights and calculate statistics",
      icon: <BarChart3 className="w-5 h-5" />,
      component: AnalysisStep
    },
    {
      id: 4,
      title: "Generate Report",
      description: "Create professional reports",
      icon: <FileText className="w-5 h-5" />,
      component: ReportStep
    }
  ];

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  const handleStepComplete = (stepId: number, stepData?: any) => {
    if (stepData) {
      setData(prev => ({ ...prev, ...stepData }));
    }
    setCompletedSteps(prev => [...prev, stepId]);
    if (stepId < steps.length) {
      setCurrentStep(stepId + 1);
    }
  };

  const handleStepBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps.find(step => step.id === currentStep);
  const CurrentStepComponent = currentStepData?.component;

  return (
    <div className="min-h-screen bg-background">
      <Header currentStep={currentStep} />
      
      <main className="container mx-auto px-6 py-8">
        {/* Progress Bar */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Data Processing Workflow</CardTitle>
                <CardDescription>Step {currentStep} of {steps.length}</CardDescription>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{Math.round(progress)}%</div>
                <div className="text-sm text-muted-foreground">Complete</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="mb-4" />
            <div className="flex justify-between text-sm">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`flex items-center space-x-2 ${
                    completedSteps.includes(step.id)
                      ? 'text-success'
                      : currentStep === step.id
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  {completedSteps.includes(step.id) ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    step.icon
                  )}
                  <span className="hidden sm:inline">{step.title}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Step */}
        {currentStepData && (
          <StepCard
            title={currentStepData.title}
            description={currentStepData.description}
            icon={currentStepData.icon}
            isActive={true}
            className="mb-8"
          >
            {CurrentStepComponent && (
              <CurrentStepComponent
                data={data}
                onComplete={(stepData) => handleStepComplete(currentStep, stepData)}
                onBack={handleStepBack}
                canGoBack={currentStep > 1}
              />
            )}
          </StepCard>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handleStepBack}
            disabled={currentStep === 1}
          >
            Previous Step
          </Button>
          
          <div className="text-sm text-muted-foreground">
            {completedSteps.length} of {steps.length} steps completed
          </div>
          
          {currentStep < steps.length && (
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!completedSteps.includes(currentStep)}
            >
              Next Step
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProcessingWorkflow;