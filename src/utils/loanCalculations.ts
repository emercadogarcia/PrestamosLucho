/**
 * Motor de Cálculo de Préstamos
 * Soporta interés simple y compuesto
 * Cálculo de cuotas y calendarios de pago
 */

import type { LoanCalculation, InstallmentSchedule, InterestType, PaymentSchedule } from '../types';

/**
 * Calcula los detalles completos de un préstamo
 */
export function calculateLoan(
  amount: number,
  termDays: number,
  interestRate: number,
  interestType: InterestType = 'simple',
  paymentSchedule: PaymentSchedule = 'installments',
  numberOfInstallments: number = 1
): LoanCalculation {
  const interestAmount = interestType === 'simple' 
    ? calculateSimpleInterest(amount, interestRate, termDays)
    : calculateCompoundInterest(amount, interestRate, termDays);
  
  const totalAmount = amount + interestAmount;
  const installmentAmount = paymentSchedule === 'installments' 
    ? totalAmount / numberOfInstallments 
    : totalAmount;
  
  const schedule = generatePaymentSchedule(
    amount,
    totalAmount,
    interestAmount,
    numberOfInstallments,
    paymentSchedule,
    termDays
  );
  
  return {
    amount,
    termDays,
    interestRate,
    interestType,
    paymentSchedule,
    numberOfInstallments: paymentSchedule === 'installments' ? numberOfInstallments : 1,
    totalInterest: interestAmount,
    totalAmount,
    installmentAmount,
    schedule,
  };
}

/**
 * Calcula interés simple: I = P * r * t
 */
export function calculateSimpleInterest(
  principal: number,
  annualRate: number,
  days: number
): number {
  return (principal * annualRate * days) / (365 * 100);
}

/**
 * Calcula interés compuesto: A = P(1 + r)^t
 */
export function calculateCompoundInterest(
  principal: number,
  annualRate: number,
  days: number
): number {
  const rate = annualRate / 100;
  const periods = days / 365;
  const amount = principal * Math.pow(1 + rate, periods);
  return amount - principal;
}

/**
 * Genera el calendario de pagos
 */
export function generatePaymentSchedule(
  principal: number,
  totalAmount: number,
  totalInterest: number,
  numberOfInstallments: number,
  paymentSchedule: PaymentSchedule,
  termDays: number
): InstallmentSchedule[] {
  const schedule: InstallmentSchedule[] = [];
  
  if (paymentSchedule === 'end') {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + termDays);
    
    schedule.push({
      installmentNumber: 1,
      dueDate,
      principalAmount: principal,
      interestAmount: totalInterest,
      totalAmount,
      remainingBalance: 0,
    });
  } else {
    const installmentAmount = totalAmount / numberOfInstallments;
    const principalPerInstallment = principal / numberOfInstallments;
    const interestPerInstallment = totalInterest / numberOfInstallments;
    const daysPerInstallment = Math.floor(termDays / numberOfInstallments);
    
    let remainingBalance = totalAmount;
    
    for (let i = 1; i <= numberOfInstallments; i++) {
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + (daysPerInstallment * i));
      
      remainingBalance -= installmentAmount;
      
      schedule.push({
        installmentNumber: i,
        dueDate,
        principalAmount: principalPerInstallment,
        interestAmount: interestPerInstallment,
        totalAmount: installmentAmount,
        remainingBalance: Math.max(0, remainingBalance),
      });
    }
  }
  
  return schedule;
}

/**
 * Calcula el cargo por mora
 */
export function calculateLateFee(
  remainingAmount: number,
  lateFeeRate: number,
  daysOverdue: number
): number {
  return (remainingAmount * lateFeeRate * daysOverdue) / (365 * 100);
}

/**
 * Verifica si un préstamo está en mora
 */
export function isLoanOverdue(dueDate: Date, gracePeriodDays: number = 0): boolean {
  const today = new Date();
  const graceDate = new Date(dueDate);
  graceDate.setDate(graceDate.getDate() + gracePeriodDays);
  
  return today > graceDate;
}

/**
 * Calcula días de atraso
 */
export function calculateOverdueDays(dueDate: Date, gracePeriodDays: number = 0): number {
  const today = new Date();
  const graceDate = new Date(dueDate);
  graceDate.setDate(graceDate.getDate() + gracePeriodDays);
  
  if (today <= graceDate) return 0;
  
  const diffTime = today.getTime() - graceDate.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Formatea moneda según el código de moneda
 */
export function formatCurrency(amount: number, currency: string): string {
  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    PEN: 'S/',
    COP: '$',
    MXN: '$',
    ARS: '$',
  };
  
  const symbol = symbols[currency] || currency;
  return `${symbol} ${amount.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
