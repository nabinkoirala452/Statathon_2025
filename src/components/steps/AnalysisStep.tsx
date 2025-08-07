import { useState } from "react";
import { BarChart3, Calculator, TrendingUp, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AnalysisStepProps {
  data?: any;
  onComplete: (data: any) => void;
  onBack: () => void;
  canGoBack: boolean;
}

const AnalysisStep = ({ data, onComplete, onBack, canGoBack }: AnalysisStepProps) => {
  const [analysisConfig, setAnalysisConfig] = useState({
    weightColumn: 'Weight',
    confidenceLevel: '95',
    estimationType: 'weighted'
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [processingProgress, setProcessingProgress] = useState(0);

  const availableColumns = data?.filePreview?.headers || [];
  const weightColumns = availableColumns.filter((col: string) => 
    col.toLowerCase().includes('weight') || col.toLowerCase().includes('wt')
  );

  const handleStartAnalysis = async () => {
    setIsProcessing(true);
    setProcessingProgress(0);

    // Simulate analysis process
    const stages = [
      { name: "Applying survey weights", progress: 25 },
      { name: "Calculating weighted statistics", progress: 50 },
      { name: "Computing confidence intervals", progress: 75 },
      { name: "Generating final estimates", progress: 100 }
    ];

    for (const stage of stages) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProcessingProgress(stage.progress);
    }

    // Mock analysis results
    const results = {
      totalWeightedSample: 1247000,
      effectiveSampleSize: 1189,
      designEffect: 1.05,
      keyEstimates: [
        {
          variable: "Age",
          weightedMean: 42.3,
          standardError: 0.87,
          confidenceInterval: [40.6, 44.0],
          unweightedMean: 41.8
        },
        {
          variable: "Income",
          weightedMean: 48750,
          standardError: 1240,
          confidenceInterval: [46320, 51180],
          unweightedMean: 47890
        },
        {
          variable: "Satisfaction (Q1)",
          weightedMean: 7.2,
          standardError: 0.12,
          confidenceInterval: [7.0, 7.4],
          unweightedMean: 7.1
        }
      ],
      categoricalEstimates: [
        {
          variable: "Education Level",
          categories: [
            { level: "High School", weightedProportion: 0.42, marginOfError: 0.031 },
            { level: "Bachelor", weightedProportion: 0.38, marginOfError: 0.029 },
            { level: "Master+", weightedProportion: 0.20, marginOfError: 0.024 }
          ]
        },
        {
          variable: "Region",
          categories: [
            { level: "North", weightedProportion: 0.28, marginOfError: 0.027 },
            { level: "South", weightedProportion: 0.25, marginOfError: 0.026 },
            { level: "East", weightedProportion: 0.24, marginOfError: 0.025 },
            { level: "West", weightedProportion: 0.23, marginOfError: 0.025 }
          ]
        }
      ],
      qualityMetrics: {
        responseRate: 0.847,
        completionRate: 0.923,
        weightEfficiency: 0.954
      }
    };

    setAnalysisResults(results);
    setIsProcessing(false);
  };

  const handleContinue = () => {
    onComplete({
      ...data,
      analysisConfig,
      analysisResults,
      analysisTimestamp: new Date().toISOString()
    });
  };

  return (
    <div className="space-y-6">
      {/* Configuration Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="w-5 h-5" />
            <span>Statistical Analysis Configuration</span>
          </CardTitle>
          <CardDescription>
            Configure survey weights and statistical parameters for accurate population estimates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Weight Column Selection */}
          <div className="space-y-3">
            <h4 className="font-semibold">Survey Weight Column</h4>
            <Select 
              value={analysisConfig.weightColumn} 
              onValueChange={(value) => setAnalysisConfig(prev => ({...prev, weightColumn: value}))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select weight column" />
              </SelectTrigger>
              <SelectContent>
                {weightColumns.map((col: string) => (
                  <SelectItem key={col} value={col}>
                    {col} {col.toLowerCase().includes('weight') && <Badge variant="secondary" className="ml-2">Detected</Badge>}
                  </SelectItem>
                ))}
                <SelectItem value="none">No weights (equal probability)</SelectItem>
              </SelectContent>
            </Select>
            {analysisConfig.weightColumn !== 'none' && (
              <p className="text-sm text-muted-foreground">
                Survey weights will be applied to all statistical calculations to ensure population representativeness.
              </p>
            )}
          </div>

          {/* Confidence Level */}
          <div className="space-y-3">
            <h4 className="font-semibold">Confidence Level</h4>
            <Select 
              value={analysisConfig.confidenceLevel} 
              onValueChange={(value) => setAnalysisConfig(prev => ({...prev, confidenceLevel: value}))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="90">90% Confidence Level</SelectItem>
                <SelectItem value="95">95% Confidence Level (Standard)</SelectItem>
                <SelectItem value="99">99% Confidence Level</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Estimation Type */}
          <div className="space-y-3">
            <h4 className="font-semibold">Estimation Method</h4>
            <Select 
              value={analysisConfig.estimationType} 
              onValueChange={(value) => setAnalysisConfig(prev => ({...prev, estimationType: value}))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weighted">Weighted Estimates (Recommended)</SelectItem>
                <SelectItem value="unweighted">Unweighted Estimates</SelectItem>
                <SelectItem value="both">Both for Comparison</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Processing Status */}
      {isProcessing && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 animate-pulse text-primary" />
              <span>Running Statistical Analysis...</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={processingProgress} className="mb-4" />
            <div className="text-center text-muted-foreground">
              {processingProgress}% Complete
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Results */}
      {analysisResults && (
        <div className="space-y-6">
          {/* Summary Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span>Analysis Results</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{analysisResults.totalWeightedSample.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Weighted Population</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">{analysisResults.effectiveSampleSize.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Effective Sample Size</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">{analysisResults.designEffect}</div>
                  <div className="text-sm text-muted-foreground">Design Effect</div>
                </div>
              </div>

              <Alert>
                <BarChart3 className="h-4 w-4" />
                <AlertDescription>
                  <strong>Statistical analysis complete!</strong> All estimates include {analysisConfig.confidenceLevel}% confidence intervals and appropriate standard errors.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Key Estimates */}
          <Card>
            <CardHeader>
              <CardTitle>Continuous Variable Estimates</CardTitle>
              <CardDescription>Weighted means with confidence intervals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Variable</th>
                      <th className="text-right p-2">Weighted Mean</th>
                      <th className="text-right p-2">Std. Error</th>
                      <th className="text-right p-2">{analysisConfig.confidenceLevel}% CI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysisResults.keyEstimates.map((estimate: any, index: number) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-2 font-medium">{estimate.variable}</td>
                        <td className="p-2 text-right">{estimate.weightedMean.toLocaleString()}</td>
                        <td className="p-2 text-right">{estimate.standardError}</td>
                        <td className="p-2 text-right">
                          [{estimate.confidenceInterval[0].toLocaleString()}, {estimate.confidenceInterval[1].toLocaleString()}]
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Categorical Estimates */}
          <Card>
            <CardHeader>
              <CardTitle>Categorical Variable Estimates</CardTitle>
              <CardDescription>Weighted proportions with margins of error</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {analysisResults.categoricalEstimates.map((category: any, index: number) => (
                <div key={index}>
                  <h4 className="font-semibold mb-3">{category.variable}</h4>
                  <div className="space-y-2">
                    {category.categories.map((item: any, itemIndex: number) => (
                      <div key={itemIndex} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="font-medium">{item.level}</span>
                        <div className="text-right">
                          <div className="text-lg font-bold">{(item.weightedProportion * 100).toFixed(1)}%</div>
                          <div className="text-xs text-muted-foreground">±{(item.marginOfError * 100).toFixed(1)}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} disabled={!canGoBack || isProcessing}>
          Back
        </Button>
        
        {!analysisResults ? (
          <Button 
            onClick={handleStartAnalysis} 
            disabled={isProcessing || !analysisConfig.weightColumn}
            className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Start Analysis
          </Button>
        ) : (
          <Button 
            onClick={handleContinue}
            className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary"
          >
            Generate Report
          </Button>
        )}
      </div>
    </div>
  );
};

export default AnalysisStep;