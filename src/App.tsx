/**
 * PRÉSTAMOS LUCHO - Sistema de Gestión de Préstamos
 * Arquitectura Multi-tenant, Multi-país, Multi-moneda
 * 
 * @version 1.0.0
 * @author Sistema Préstamos LUCHO
 */

import { useState, useEffect } from 'react';
import { useStore } from './store/useStore';
import { LoginPage } from './components/auth/LoginPage';
import { Dashboard } from './components/dashboard/Dashboard';
import { ClientsPage } from './components/clients/ClientsPage';
import { LoansPage } from './components/loans/LoansPage';
import { PaymentsPage } from './components/payments/PaymentsPage';
import { ReportsPage } from './components/reports/ReportsPage';
import { SettingsPage } from './components/settings/SettingsPage';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { mockCompany, mockUser, mockToken, mockClients, mockLoans, mockPayments } from './data/mockData';

type Page = 'dashboard' | 'clients' | 'loans' | 'payments' | 'reports' | 'settings';

export function App() {
  const { isAuthenticated, login, setClients, setLoans, setPayments } = useStore();
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  // Auto-login para demo (en producción esto no existiría)
  useEffect(() => {
    if (!isAuthenticated) {
      // Simular login automático para demo
      login(mockUser, mockCompany, mockToken);
      setClients(mockClients);
      setLoans(mockLoans);
      setPayments(mockPayments);
    }
  }, [isAuthenticated, login, setClients, setLoans, setPayments]);

  // Mostrar página de login si no está autenticado
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Renderizar la página actual
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'clients':
        return <ClientsPage />;
      case 'loans':
        return <LoansPage />;
      case 'payments':
        return <PaymentsPage />;
      case 'reports':
        return <ReportsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
