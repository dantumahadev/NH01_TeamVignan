/**
 * @fileoverview Shared Zod schemas for the application.
 */
import { z } from 'zod';

export const ExplainMedicalReportOutputSchema = z.object({
  patientFriendlyExplanation: z.string(),
});
