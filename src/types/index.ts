/**
 * Sistema de Tipos para Préstamos LUCHO
 * Arquitectura Multi-tenant, Multi-país, Multi-moneda
 */

export type UserRole = 'admin' | 'lender' | 'collector' | 'reporting';
export type LoanStatus = 'active' | 'completed' | 'overdue' | 'defaulted';
export type PaymentMethod = 'cash' | 'transfer' | 'digital';
export type Currency = 'USD' | 'EUR' | 'PEN' | 'COP' | 'MXN' | 'ARS';
export type InterestType = 'simple' | 'compound';
export type PaymentSchedule = 'installments' | 'end';
export type Language = 'es' | 'en';

export interface Company {
  id: string;
  name: string;
  taxId: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  country: string;
  currencies: Currency[];
  defaultCurrency: Currency;
  config: CompanyConfig;
  createdAt: Date;
  updatedAt: Date;
}

export interface CompanyConfig {
  defaultInterestRate: number;
  defaultLateFeeRate: number;
  defaultPenaltyRate: number;
  gracePeriodDays: number;
  enable2FA: boolean;
  enableCompoundInterest: boolean;
  minLoanAmount: number;
  maxLoanAmount: number;
  minLoanTermDays: number;
  maxLoanTermDays: number;
}

export interface User {
  id: string;
  companyId: string;
  email: string;
  name: string;
  role: UserRole;
  language: Language;
  phone?: string;
  isActive: boolean;
  require2FA: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Client {
  id: string;
  companyId: string;
  taxId: string;
  name: string;
  email?: string;
  phone1: string;
  phone2?: string;
  address: string;
  city: string;
  country: string;
  latitude?: number;
  longitude?: number;
  creditScore: number;
  assignedCollectorId?: string;
  isBlocked: boolean;
  blockReason?: string;
  references: ClientReference[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientReference {
  name: string;
  phone: string;
  relationship: string;
}

export interface Loan {
  id: string;
  companyId: string;
  clientId: string;
  amount: number;
  currency: Currency;
  termDays: number;
  interestRate: number;
  interestType: InterestType;
  paymentSchedule: PaymentSchedule;
  numberOfInstallments?: number;
  installmentAmount?: number;
  totalAmount: number;
  totalInterest: number;
  status: LoanStatus;
  disbursementDate: Date;
  dueDate: Date;
  paidAmount: number;
  remainingAmount: number;
  lateFeeRate: number;
  lateFeeAmount: number;
  gracePeriodDays: number;
  isOverdue: boolean;
  overdueSince?: Date;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: string;
  companyId: string;
  loanId: string;
  clientId: string;
  amount: number;
  currency: Currency;
  paymentMethod: PaymentMethod;
  collectorId: string;
  notes?: string;
  receiptNumber?: string;
  paymentDate: Date;
  createdAt: Date;
}

export interface AuditLog {
  id: string;
  companyId: string;
  userId: string;
  action: string;
  entity: string;
  entityId: string;
  changes: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

export interface Report {
  id: string;
  type: string;
  companyId: string;
  generatedBy: string;
  parameters: Record<string, any>;
  data: any;
  createdAt: Date;
}

export interface Dashboard {
  totalLoans: number;
  activeLoans: number;
  overdueLoans: number;
  totalDisbursed: number;
  totalCollected: number;
  totalPending: number;
  collectionRate: number;
  defaultRate: number;
  averageLoanAmount: number;
  topCollectors: CollectorPerformance[];
  recentPayments: Payment[];
  overdueClients: Client[];
}

export interface CollectorPerformance {
  collectorId: string;
  collectorName: string;
  totalCollected: number;
  numberOfPayments: number;
  activeClients: number;
}

export interface LoanCalculation {
  amount: number;
  termDays: number;
  interestRate: number;
  interestType: InterestType;
  paymentSchedule: PaymentSchedule;
  numberOfInstallments?: number;
  totalInterest: number;
  totalAmount: number;
  installmentAmount?: number;
  schedule: InstallmentSchedule[];
}

export interface InstallmentSchedule {
  installmentNumber: number;
  dueDate: Date;
  principalAmount: number;
  interestAmount: number;
  totalAmount: number;
  remainingBalance: number;
}

export interface AuthState {
  user: User | null;
  company: Company | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface Translations {
  [key: string]: {
    es: string;
    en: string;
  };
}
