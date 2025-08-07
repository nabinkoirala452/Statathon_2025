import { useState } from "react";
import { FileText, Download, Eye, CheckCircle2, BarChart3, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ReportStepProps {
  data?: any;
  onComplete: (data: any) => void;
  onBack: () => void;
  canGoBack: boolean;
}

const ReportStep = ({ data, onComplete, onBack, canGoBack }: ReportStepProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setReportGenerated(true);
    setIsGenerating(false);
  };

  const handleDownloadPDF = () => {
    // Simulate PDF download
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'survey-analysis-report.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadHTML = () => {
    // Simulate HTML download
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'survey-analysis-report.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleComplete = () => {
    onComplete({
      ...data,
      reportGenerated: true,
      reportTimestamp: new Date().toISOString()
    });
  };

  const analysisResults = data?.analysisResults;
  const cleaningResults = data?.cleaningResults;
  const filePreview = data?.filePreview;

  return (
    <div className="space-y-6">
      {/* Report Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Professional Report Generation</span>
          </CardTitle>
          <CardDescription>
            Generate comprehensive reports with charts, statistics, and audit trails
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <BarChart3 className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-lg font-bold text-primary">{filePreview?.rows?.toLocaleString() || 'N/A'}</div>
              <div className="text-sm text-muted-foreground">Records Processed</div>
            </div>
            <div className="text-center p-4 bg-success/10 rounded-lg">
              <CheckCircle2 className="w-8 h-8 text-success mx-auto mb-2" />
              <div className="text-lg font-bold text-success">{cleaningResults?.qualityScore || 'N/A'}%</div>
              <div className="text-sm text-muted-foreground">Data Quality</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-lg font-bold text-primary">{analysisResults?.effectiveSampleSize?.toLocaleString() || 'N/A'}</div>
              <div className="text-sm text-muted-foreground">Effective Sample</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Contents Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Report Contents</CardTitle>
          <CardDescription>Preview of what will be included in your professional report</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold">Statistical Analysis</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>Weighted population estimates</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>Confidence intervals & margins of error</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>Categorical proportion breakdowns</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>Design effect calculations</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold">Data Quality & Methodology</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>Complete processing audit trail</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>Data cleaning methodology</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>Missing value imputation details</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>Outlier detection results</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Visualizations & Charts</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <Badge variant="outline">Distribution Histograms</Badge>
              <Badge variant="outline">Category Bar Charts</Badge>
              <Badge variant="outline">Confidence Intervals</Badge>
              <Badge variant="outline">Quality Metrics</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Generation */}
      {!reportGenerated ? (
        <Card>
          <CardHeader>
            <CardTitle>Generate Professional Report</CardTitle>
            <CardDescription>
              Create publication-ready reports in HTML and PDF formats
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            {isGenerating ? (
              <div className="space-y-4">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                <div>
                  <h3 className="text-lg font-semibold">Generating Report...</h3>
                  <p className="text-muted-foreground">Creating charts, formatting tables, and compiling results</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <FileText className="w-16 h-16 text-primary mx-auto" />
                <div>
                  <h3 className="text-lg font-semibold">Ready to Generate</h3>
                  <p className="text-muted-foreground">Click below to create your professional analysis report</p>
                </div>
                <Button 
                  size="lg"
                  onClick={handleGenerateReport}
                  className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Generate Report
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-success" />
              <span>Report Generated Successfully</span>
            </CardTitle>
            <CardDescription>Your professional analysis report is ready for download</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                <strong>Report generation complete!</strong> Your comprehensive survey analysis report includes all statistical estimates, 
                data quality metrics, and a complete audit trail of processing steps.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-dashed">
                <CardContent className="text-center pt-6">
                  <FileText className="w-12 h-12 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">PDF Report</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Publication-ready document with professional formatting
                  </p>
                  <Button onClick={handleDownloadPDF} className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-dashed">
                <CardContent className="text-center pt-6">
                  <Eye className="w-12 h-12 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">HTML Report</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Interactive web version with responsive design
                  </p>
                  <Button onClick={handleDownloadHTML} variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download HTML
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button 
                size="lg" 
                onClick={handleComplete}
                className="bg-gradient-to-r from-success to-success/80 hover:from-success/90 hover:to-success text-success-foreground"
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Complete Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} disabled={!canGoBack || isGenerating}>
          Back
        </Button>
        
        {reportGenerated && (
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            Start New Analysis
          </Button>
        )}
      </div>
    </div>
  );
};

export default ReportStep;