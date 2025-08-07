import { useState } from "react";
import { Settings, AlertTriangle, CheckCircle2, Zap, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CleaningStepProps {
  data?: any;
  onComplete: (data: any) => void;
  onBack: () => void;
  canGoBack: boolean;
}

const CleaningStep = ({ data, onComplete, onBack, canGoBack }: CleaningStepProps) => {
  const [cleaningConfig, setCleaningConfig] = useState({
    missingValueMethod: 'mean',
    outlierDetection: true,
    outlierMethod: 'zscore',
    validationRules: true,
    winsorization: false
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [cleaningResults, setCleaningResults] = useState<any>(null);
  const [processingProgress, setProcessingProgress] = useState(0);

  const handleStartCleaning = async () => {
    setIsProcessing(true);
    setProcessingProgress(0);

    // Simulate data cleaning process
    const stages = [
      { name: "Validating data structure", progress: 20 },
      { name: "Detecting missing values", progress: 40 },
      { name: "Applying imputation methods", progress: 60 },
      { name: "Detecting outliers", progress: 80 },
      { name: "Finalizing cleaned dataset", progress: 100 }
    ];

    for (const stage of stages) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setProcessingProgress(stage.progress);
    }

    // Mock cleaning results
    const results = {
      originalRecords: data?.filePreview?.rows || 1247,
      cleanedRecords: 1238,
      missingValuesFound: 47,
      missingValuesImputed: 47,
      outliersDetected: 12,
      outliersProcessed: 12,
      validationIssues: 3,
      validationFixed: 3,
      qualityScore: 97.8,
      log: [
        { action: "Missing value imputation", details: "Applied mean imputation to Age column (5 values)", status: "completed" },
        { action: "Missing value imputation", details: "Applied mean imputation to Income column (42 values)", status: "completed" },
        { action: "Outlier detection", details: "Detected 12 outliers using Z-score method (threshold: ±3)", status: "completed" },
        { action: "Outlier treatment", details: "Capped 12 extreme values using 95th/5th percentile bounds", status: "completed" },
        { action: "Validation check", details: "Fixed 3 age-birthyear inconsistencies", status: "completed" },
        { action: "Data integrity", details: "All skip-logic rules validated successfully", status: "completed" }
      ]
    };

    setCleaningResults(results);
    setIsProcessing(false);
  };

  const handleContinue = () => {
    onComplete({
      ...data,
      cleaningConfig,
      cleaningResults,
      cleaningTimestamp: new Date().toISOString()
    });
  };

  return (
    <div className="space-y-6">
      {/* Configuration Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Data Cleaning Configuration</span>
          </CardTitle>
          <CardDescription>
            Configure how missing values, outliers, and validation rules should be handled
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Missing Values */}
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center space-x-2">
              <span>Missing Value Imputation</span>
              <Badge variant="outline">47 missing values detected</Badge>
            </h4>
            <Select 
              value={cleaningConfig.missingValueMethod} 
              onValueChange={(value) => setCleaningConfig(prev => ({...prev, missingValueMethod: value}))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mean">Mean Imputation (Recommended)</SelectItem>
                <SelectItem value="median">Median Imputation</SelectItem>
                <SelectItem value="knn">KNN Imputation (Advanced)</SelectItem>
                <SelectItem value="none">Leave Missing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Outlier Detection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Outlier Detection & Treatment</h4>
              <Switch 
                checked={cleaningConfig.outlierDetection}
                onCheckedChange={(checked) => setCleaningConfig(prev => ({...prev, outlierDetection: checked}))}
              />
            </div>
            {cleaningConfig.outlierDetection && (
              <Select 
                value={cleaningConfig.outlierMethod} 
                onValueChange={(value) => setCleaningConfig(prev => ({...prev, outlierMethod: value}))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zscore">Z-Score Method (±3 SD)</SelectItem>
                  <SelectItem value="iqr">IQR Method (1.5×IQR)</SelectItem>
                  <SelectItem value="percentile">Percentile Bounds (5th-95th)</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Validation Rules */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">Rule-Based Validation</h4>
              <p className="text-sm text-muted-foreground">Age consistency, skip-logic enforcement</p>
            </div>
            <Switch 
              checked={cleaningConfig.validationRules}
              onCheckedChange={(checked) => setCleaningConfig(prev => ({...prev, validationRules: checked}))}
            />
          </div>

          {/* Winsorization */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">Winsorization</h4>
              <p className="text-sm text-muted-foreground">Cap extreme values instead of removal</p>
            </div>
            <Switch 
              checked={cleaningConfig.winsorization}
              onCheckedChange={(checked) => setCleaningConfig(prev => ({...prev, winsorization: checked}))}
            />
          </div>
        </CardContent>
      </Card>

      {/* Processing Status */}
      {isProcessing && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5 animate-pulse text-primary" />
              <span>Processing Data...</span>
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

      {/* Cleaning Results */}
      {cleaningResults && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span>Cleaning Results</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-success/10 rounded-lg">
                  <div className="text-2xl font-bold text-success">{cleaningResults.qualityScore}%</div>
                  <div className="text-sm text-muted-foreground">Quality Score</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">{cleaningResults.cleanedRecords.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Clean Records</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">{cleaningResults.missingValuesImputed}</div>
                  <div className="text-sm text-muted-foreground">Values Imputed</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">{cleaningResults.outliersProcessed}</div>
                  <div className="text-sm text-muted-foreground">Outliers Treated</div>
                </div>
              </div>

              <Alert>
                <BarChart className="h-4 w-4" />
                <AlertDescription>
                  <strong>Data ready for analysis!</strong> Your dataset has been successfully cleaned and validated. 
                  Quality score of {cleaningResults.qualityScore}% indicates excellent data integrity.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Processing Log */}
          <Card>
            <CardHeader>
              <CardTitle>Processing Log</CardTitle>
              <CardDescription>Detailed record of all cleaning operations performed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {cleaningResults.log.map((entry: any, index: number) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">{entry.action}</div>
                      <div className="text-sm text-muted-foreground">{entry.details}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} disabled={!canGoBack || isProcessing}>
          Back
        </Button>
        
        {!cleaningResults ? (
          <Button 
            onClick={handleStartCleaning} 
            disabled={isProcessing}
            className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary"
          >
            <Zap className="w-4 h-4 mr-2" />
            Start Data Cleaning
          </Button>
        ) : (
          <Button 
            onClick={handleContinue}
            className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary"
          >
            Continue to Analysis
          </Button>
        )}
      </div>
    </div>
  );
};

export default CleaningStep;