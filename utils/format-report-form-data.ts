import { Expense, Report } from '@/types/types';

export function formatReportFormData(report: Report) {
  return {
    ...report,
    name: report.name.length === 0 ? new Date().toISOString() : report.name,
    grossRoyalties:
      report.grossRoyalties.length === 0 ? '0' : report.grossRoyalties,
    expenses: report.expenses.filter(
      (expense: Expense) => parseFloat(expense.amount) > 0,
    ),
    gigIds: report.selectedGigs.map((gig) => gig.value),
  };
}
