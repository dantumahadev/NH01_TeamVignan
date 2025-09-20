/**
 * @fileoverview A flow that explains a medical report in patient-friendly terms.
 */
'use server';

import { ai } from '@/ai/genkit';
import {
  ExplainMedicalReportInput,
  ExplainMedicalReportInputSchema,
  ExplainMedicalReportOutput,
  ExplainMedicalReportOutputSchema,
} from '@/ai/schemas/explain-medical-report';

export async function explainMedicalReport(input: ExplainMedicalReportInput): Promise<ExplainMedicalReportOutput> {
  return explainMedicalReportFlow(input);
}

const explainMedicalReportPrompt = ai.definePrompt({
  name: 'explainMedicalReportPrompt',
  input: { schema: ExplainMedicalReportInputSchema },
  output: { schema: ExplainMedicalReportOutputSchema },
  prompt: `You are an expert medical professional who is skilled at explaining complex medical reports to patients who have no medical knowledge.

  Explain the following medical report to a patient in simple, easy-to-understand terms. The explanation should be in {{language}}.

  Medical Report:
  {{reportText}}
  `,
});

const explainMedicalReportFlow = ai.defineFlow(
  {
    name: 'explainMedicalReportFlow',
    inputSchema: ExplainMedicalReportInputSchema,
    outputSchema: ExplainMedicalReportOutputSchema,
  },
  async (input) => {
    const { output } = await explainMedicalReportPrompt(input);
    return output!;
  }
);
