/**
 * Estado Global de la Aplicación
 * Gestión de autenticación, empresa activa, idioma y datos
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Company, Client, Loan, Payment, Language } from '../types';

interface AppState {
  // Auth
  user: User | null;
  company: Company | null;
  token: string | null;
  isAuthenticated: boolean;
  language: Language;
  
  // Data
  clients: Client[];
  loans: Loan[];
  payments: Payment[];
  
  // Actions
  login: (user: User, company: Company, token: string) => void;
  logout: () => void;
  setLanguage: (language: Language) => void;
  setClients: (clients: Client[]) => void;
  setLoans: (loans: Loan[]) => void;
  setPayments: (payments: Payment[]) => void;
  addClient: (client: Client) => void;
  updateClient: (clientId: string, client: Partial<Client>) => void;
  addLoan: (loan: Loan) => void;
  updateLoan: (loanId: string, loan: Partial<Loan>) => void;
  addPayment: (payment: Payment) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      company: null,
      token: null,
      isAuthenticated: false,
      language: 'es',
      clients: [],
      loans: [],
      payments: [],
      
      // Actions
      login: (user, company, token) => set({
        user,
        company,
        token,
        isAuthenticated: true,
      }),
      
      logout: () => set({
        user: null,
        company: null,
        token: null,
        isAuthenticated: false,
        clients: [],
        loans: [],
        payments: [],
      }),
      
      setLanguage: (language) => set({ language }),
      
      setClients: (clients) => set({ clients }),
      
      setLoans: (loans) => set({ loans }),
      
      setPayments: (payments) => set({ payments }),
      
      addClient: (client) => set((state) => ({
        clients: [...state.clients, client],
      })),
      
      updateClient: (clientId, updatedClient) => set((state) => ({
        clients: state.clients.map(c =>
          c.id === clientId ? { ...c, ...updatedClient } : c
        ),
      })),
      
      addLoan: (loan) => set((state) => ({
        loans: [...state.loans, loan],
      })),
      
      updateLoan: (loanId, updatedLoan) => set((state) => ({
        loans: state.loans.map(l =>
          l.id === loanId ? { ...l, ...updatedLoan } : l
        ),
      })),
      
      addPayment: (payment) => set((state) => ({
        payments: [...state.payments, payment],
      })),
    }),
    {
      name: 'prestamos-lucho-storage',
    }
  )
);
