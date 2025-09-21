/**
 * @fileoverview Shared type definitions for the application.
 */

export interface ExplainMedicalReportInput {
  reportText: string;
  language: string;
}

export interface ExplainMedicalReportOutput {
  patientFriendlyExplanation: string;
}
