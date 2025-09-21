/**
 * @fileoverview A flow that explains a medical report in patient-friendly terms.
 */
'use server';

import { ai } from '@/ai/genkit';
import type {
  ExplainMedicalReportInput,
  ExplainMedicalReportOutput,
} from '@/app/lib/types';

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
      format: 'json',
      schema: {
        patientFriendlyExplanation: 'string',
      },
    },
  });

  if (!output) {
    throw new Error('Failed to generate explanation.');
  }

  return {
    patientFriendlyExplanation: output.patientFriendlyExplanation,
  };
}
