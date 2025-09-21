/**
 * @fileoverview A component that allows the user to get a patient-friendly explanation of a medical report.
 */
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { explainMedicalReport } from '@/app/actions';
import type { ExplainMedicalReportOutput } from '@/app/lib/types';

const languages = [
  { value: 'english', label: 'English' },
  { value: 'hindi', label: 'Hindi' },
  { value: 'telugu', label: 'Telugu' },
];

export function ReportExplainer({ reportText }: { reportText: string }) {
  const [language, setLanguage] = useState('english');
  const [explanation, setExplanation] = useState<ExplainMedicalReportOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleExplain = async () => {
    setLoading(true);
    setError(null);
    setExplanation(null);
    try {
      const result = await explainMedicalReport({
        reportText,
        language,
      });
      setExplanation(result);
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred.');
    }
    setLoading(false);
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Need Help Understanding Your Report?</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">
          Let our AI assistant explain this report to you in simpler terms. Select a language and click explain.
        </p>
        <div className="flex gap-2">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleExplain} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Explain Report
          </Button>
        </div>

        {explanation && (
          <div className="mt-4 prose prose-sm max-w-none">
            <p>{explanation.patientFriendlyExplanation}</p>
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
