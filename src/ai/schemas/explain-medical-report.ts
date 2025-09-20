/**
 * @fileoverview Schemas and types for the explain-medical-report flow.
 */
import { z } from 'zod';

export const ExplainMedicalReportInputSchema = z.object({
  reportText: z.string().describe('The medical report text to be explained.'),
  language: z.string().describe('The language for the explanation (e.g., "english", "hindi", "telugu").'),
});
export type ExplainMedicalReportInput = z.infer<typeof ExplainMedicalReportInputSchema>;

export const ExplainMedicalReportOutputSchema = z.object({
  patientFriendlyExplanation: z.string().describe('The explanation of the medical report in patient-friendly terms.'),
});
export type ExplainMedicalReportOutput = z.infer<typeof ExplainMedicalReportOutputSchema>;
