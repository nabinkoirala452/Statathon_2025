import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Zap, Settings, FileText, BarChart3, Shield, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number | undefined>(undefined);

  const features = [
    {
      icon: <Upload className="w-5 h-5" />,
      title: "Smart Data Import",
      description: "Drag-and-drop CSV/Excel files with automatic schema detection"
    },
    {
      icon: <Settings className="w-5 h-5" />,
      title: "Advanced Cleaning",
      description: "KNN imputation, outlier detection, and validation rules"
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Weighted Estimation",
      description: "Survey weights with confidence intervals and margins of error"
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Professional Reports",
      description: "Instant HTML/PDF reports with charts and audit trails"
    }
  ];

  const stats = [
    { label: "Processing Speed", value: "99.5%", description: "Automated workflow" },
    { label: "Data Accuracy", value: "100%", description: "Validation rules" },
    { label: "Report Quality", value: "Professional", description: "Publication ready" },
    { label: "Compliance", value: "WCAG 2.1", description: "Accessibility standard" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header currentStep={currentStep} />
      
      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            <span>Government-Grade Security & Compliance</span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Automated Survey Data
            <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent block">
              Processing Platform
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Streamline your statistical workflows with our comprehensive platform designed for 
            data analysts and statisticians. Upload, clean, analyze, and generate professional 
            reports in minutes, not hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => navigate('/process')}
            >
              <Zap className="w-5 h-5 mr-2" />
              Start Processing Data
            </Button>
            
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <FileText className="w-5 h-5 mr-2" />
              View Documentation
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-foreground mb-1">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Workflow Section */}
        <Card className="mb-16">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">4-Step Automated Workflow</CardTitle>
            <CardDescription>From raw data to professional reports in minutes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Upload", description: "Import CSV/Excel files with drag-and-drop", icon: <Upload className="w-6 h-6" /> },
                { step: "02", title: "Clean", description: "Automated validation and data cleaning", icon: <Settings className="w-6 h-6" /> },
                { step: "03", title: "Analyze", description: "Apply survey weights and calculate statistics", icon: <BarChart3 className="w-6 h-6" /> },
                { step: "04", title: "Report", description: "Generate professional HTML/PDF reports", icon: <FileText className="w-6 h-6" /> }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                    {item.icon}
                  </div>
                  <div className="text-lg font-semibold text-foreground mb-2">{item.title}</div>
                  <div className="text-sm text-muted-foreground">{item.description}</div>
                  <Badge variant="outline" className="mt-2 text-xs">{item.step}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-primary/5 to-primary-light/5 border-primary/20">
          <CardContent className="text-center py-12">
            <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Transform Your Data Workflow?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of data professionals who trust our platform for their statistical analysis needs.
              Experience the power of automated survey data processing today.
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-primary-foreground shadow-lg"
              onClick={() => navigate('/process')}
            >
              <Users className="w-5 h-5 mr-2" />
              Get Started Now
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;