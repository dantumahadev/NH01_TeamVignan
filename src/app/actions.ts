/**
 * @fileoverview Server-side actions for the application.
 */
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import type {
  ExplainMedicalReportInput,
  ExplainMedicalReportOutput,
} from '@/app/lib/types';

const ExplainMedicalReportOutputSchema = z.object({
  patientFriendlyExplanation: z.string(),
});

/**
 * Explains a medical report in patient-friendly terms using a generative AI model.
 * @param input The input containing the report text and desired language.
 * @returns The patient-friendly explanation.
 */
export async function explainMedicalReport(
  input: ExplainMedicalReportInput
): Promise<ExplainMedicalReportOutput> {
  const { output } = await ai.generate({
    prompt: `You are an expert medical professional who is skilled at explaining complex medical reports to patients who have no medical knowledge.

Explain the following medical report to a patient in simple, easy-to-understand terms. The explanation should be in ${input.language}.

Medical Report:
${input.reportText}
`,
    output: {
      schema: ExplainMedicalReportOutputSchema,
    },
  });

  if (!output) {
    throw new Error('Failed to generate explanation.');
  }

  return output;
}
