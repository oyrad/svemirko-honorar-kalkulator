import { Expense } from '@/types/types';
import { ReportFormData } from '@/app/report/create/page';

interface FormatReportFormDataParams extends ReportFormData {
  expenses: Array<Expense>;
}

export function formatReportFormData(report: FormatReportFormDataParams) {
  return {
    ...report,
    name: report.name.length === 0 ? new Date().toISOString() : report.name,
    grossRoyalties: report.grossRoyalties.length === 0 ? '0' : report.grossRoyalties,
    expenses: report.expenses.filter((expense) => parseFloat(expense.amount) > 0),
  };
}
