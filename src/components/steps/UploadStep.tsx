import { useState, useCallback } from "react";
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

interface UploadStepProps {
  data?: any;
  onComplete: (data: any) => void;
  onBack: () => void;
  canGoBack: boolean;
}

const UploadStep = ({ data, onComplete, onBack, canGoBack }: UploadStepProps) => {
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = async (file: File) => {
    // Validate file type
    const validTypes = ['.csv', '.xlsx', '.xls'];
    const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
    
    if (!validTypes.includes(fileExtension)) {
      alert('Please upload a CSV or Excel file (.csv, .xlsx, .xls)');
      return;
    }

    setUploadedFile(file);
    setIsProcessing(true);

    // Simulate file processing
    setTimeout(() => {
      const mockPreview = {
        fileName: file.name,
        fileSize: file.size,
        rows: 1247,
        columns: 15,
        headers: ['ID', 'Age', 'Gender', 'Income', 'Education', 'Region', 'Weight', 'Q1_Satisfaction', 'Q2_Likelihood', 'Q3_Frequency', 'Employment', 'Household_Size', 'Urban_Rural', 'Date_Collected', 'Interviewer_ID'],
        preview: [
          { ID: '001', Age: '34', Gender: 'F', Income: '45000', Education: 'Bachelor', Region: 'North', Weight: '1.2' },
          { ID: '002', Age: '28', Gender: 'M', Income: '52000', Education: 'Master', Region: 'South', Weight: '0.9' },
          { ID: '003', Age: '45', Gender: 'F', Income: '38000', Education: 'High School', Region: 'East', Weight: '1.1' },
          { ID: '004', Age: '31', Gender: 'M', Income: '67000', Education: 'Bachelor', Region: 'West', Weight: '1.0' },
          { ID: '005', Age: '29', Gender: 'F', Income: '41000', Education: 'Bachelor', Region: 'North', Weight: '1.3' }
        ]
      };
      setFilePreview(mockPreview);
      setIsProcessing(false);
    }, 2000);
  };

  const handleContinue = () => {
    if (filePreview) {
      onComplete({
        uploadedFile,
        filePreview,
        uploadTimestamp: new Date().toISOString()
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>Upload Survey Data</span>
          </CardTitle>
          <CardDescription>
            Import your survey data in CSV or Excel format. Drag and drop files or click to browse.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`
              border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
              ${dragOver 
                ? 'border-primary bg-primary/5' 
                : uploadedFile 
                  ? 'border-success bg-success/5' 
                  : 'border-muted-foreground/25 hover:border-primary hover:bg-primary/5'
              }
              ${isProcessing ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !isProcessing && document.getElementById('file-input')?.click()}
          >
            <input
              id="file-input"
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileSelect}
              className="hidden"
              disabled={isProcessing}
            />
            
            {isProcessing ? (
              <div className="space-y-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Processing File...</h3>
                  <p className="text-muted-foreground">Analyzing data structure and validating format</p>
                </div>
              </div>
            ) : uploadedFile ? (
              <div className="space-y-4">
                <CheckCircle2 className="w-12 h-12 text-success mx-auto" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">File Uploaded Successfully</h3>
                  <p className="text-muted-foreground">{uploadedFile.name}</p>
                  <Badge variant="outline" className="mt-2">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </Badge>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <FileSpreadsheet className="w-12 h-12 text-muted-foreground mx-auto" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Drop your files here</h3>
                  <p className="text-muted-foreground">or click to browse</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Supports: CSV, Excel (.xlsx, .xls) • Max size: 50MB
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* File Preview */}
      {filePreview && (
        <Card>
          <CardHeader>
            <CardTitle>Data Preview</CardTitle>
            <CardDescription>
              Review your uploaded data structure and sample records
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* File Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">{filePreview.rows.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Records</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">{filePreview.columns}</div>
                <div className="text-sm text-muted-foreground">Columns</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">{(filePreview.fileSize / 1024 / 1024).toFixed(1)}</div>
                <div className="text-sm text-muted-foreground">MB</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-success">✓</div>
                <div className="text-sm text-muted-foreground">Valid Format</div>
              </div>
            </div>

            {/* Column Headers */}
            <div>
              <h4 className="font-semibold mb-2">Detected Columns ({filePreview.headers.length})</h4>
              <div className="flex flex-wrap gap-2">
                {filePreview.headers.map((header: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {header}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Sample Data */}
            <div>
              <h4 className="font-semibold mb-2">Sample Records (5 of {filePreview.rows.toLocaleString()})</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse border border-border">
                  <thead>
                    <tr className="bg-muted">
                      {Object.keys(filePreview.preview[0]).map((header) => (
                        <th key={header} className="border border-border p-2 text-left font-medium">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filePreview.preview.map((row: any, index: number) => (
                      <tr key={index} className="hover:bg-muted/50">
                        {Object.values(row).map((value: any, cellIndex: number) => (
                          <td key={cellIndex} className="border border-border p-2">
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Validation Messages */}
      {filePreview && (
        <Alert>
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>
            <strong>Data validation passed!</strong> Your file has been successfully processed and is ready for cleaning.
            {filePreview.headers.includes('Weight') && (
              <span className="block mt-1 text-success">
                ✓ Survey weights column detected automatically
              </span>
            )}
          </AlertDescription>
        </Alert>
      )}

      {/* Actions */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} disabled={!canGoBack}>
          Back
        </Button>
        <Button 
          onClick={handleContinue} 
          disabled={!filePreview}
          className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary"
        >
          Continue to Data Cleaning
        </Button>
      </div>
    </div>
  );
};

export default UploadStep;