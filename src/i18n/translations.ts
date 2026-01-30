/**
 * Sistema de Traducciones - Español e Inglés
 */

import type { Translations } from '../types';

export const translations: Translations = {
  // Navigation
  'nav.dashboard': { es: 'Panel', en: 'Dashboard' },
  'nav.clients': { es: 'Clientes', en: 'Clients' },
  'nav.loans': { es: 'Préstamos', en: 'Loans' },
  'nav.payments': { es: 'Cobros', en: 'Payments' },
  'nav.reports': { es: 'Reportes', en: 'Reports' },
  'nav.settings': { es: 'Configuración', en: 'Settings' },
  'nav.logout': { es: 'Cerrar Sesión', en: 'Logout' },
  
  // Auth
  'auth.login': { es: 'Iniciar Sesión', en: 'Login' },
  'auth.email': { es: 'Correo Electrónico', en: 'Email' },
  'auth.password': { es: 'Contraseña', en: 'Password' },
  'auth.remember': { es: 'Recordarme', en: 'Remember me' },
  'auth.forgot': { es: '¿Olvidaste tu contraseña?', en: 'Forgot password?' },
  'auth.google': { es: 'Continuar con Google', en: 'Continue with Google' },
  
  // Dashboard
  'dashboard.title': { es: 'Panel de Control', en: 'Dashboard' },
  'dashboard.totalLoans': { es: 'Préstamos Totales', en: 'Total Loans' },
  'dashboard.activeLoans': { es: 'Préstamos Activos', en: 'Active Loans' },
  'dashboard.overdueLoans': { es: 'En Mora', en: 'Overdue' },
  'dashboard.totalDisbursed': { es: 'Total Desembolsado', en: 'Total Disbursed' },
  'dashboard.totalCollected': { es: 'Total Cobrado', en: 'Total Collected' },
  'dashboard.totalPending': { es: 'Total Pendiente', en: 'Total Pending' },
  'dashboard.collectionRate': { es: 'Tasa de Cobro', en: 'Collection Rate' },
  'dashboard.recentPayments': { es: 'Cobros Recientes', en: 'Recent Payments' },
  'dashboard.topCollectors': { es: 'Mejores Cobradores', en: 'Top Collectors' },
  
  // Clients
  'clients.title': { es: 'Clientes', en: 'Clients' },
  'clients.new': { es: 'Nuevo Cliente', en: 'New Client' },
  'clients.name': { es: 'Nombre', en: 'Name' },
  'clients.taxId': { es: 'CI/NIF', en: 'Tax ID' },
  'clients.phone': { es: 'Teléfono', en: 'Phone' },
  'clients.email': { es: 'Correo', en: 'Email' },
  'clients.address': { es: 'Dirección', en: 'Address' },
  'clients.city': { es: 'Ciudad', en: 'City' },
  'clients.creditScore': { es: 'Calificación Crediticia', en: 'Credit Score' },
  'clients.collector': { es: 'Cobrador Asignado', en: 'Assigned Collector' },
  'clients.blocked': { es: 'Bloqueado', en: 'Blocked' },
  'clients.active': { es: 'Activo', en: 'Active' },
  'clients.references': { es: 'Referencias', en: 'References' },
  
  // Loans
  'loans.title': { es: 'Préstamos', en: 'Loans' },
  'loans.new': { es: 'Nuevo Préstamo', en: 'New Loan' },
  'loans.amount': { es: 'Monto', en: 'Amount' },
  'loans.currency': { es: 'Moneda', en: 'Currency' },
  'loans.term': { es: 'Plazo (días)', en: 'Term (days)' },
  'loans.interestRate': { es: 'Tasa de Interés', en: 'Interest Rate' },
  'loans.interestType': { es: 'Tipo de Interés', en: 'Interest Type' },
  'loans.simple': { es: 'Simple', en: 'Simple' },
  'loans.compound': { es: 'Compuesto', en: 'Compound' },
  'loans.paymentSchedule': { es: 'Forma de Pago', en: 'Payment Schedule' },
  'loans.installments': { es: 'Cuotas', en: 'Installments' },
  'loans.endPayment': { es: 'Pago al Final', en: 'End Payment' },
  'loans.status': { es: 'Estado', en: 'Status' },
  'loans.active': { es: 'Activo', en: 'Active' },
  'loans.completed': { es: 'Cancelado', en: 'Completed' },
  'loans.overdue': { es: 'Vencido', en: 'Overdue' },
  'loans.defaulted': { es: 'En Mora', en: 'Defaulted' },
  'loans.totalAmount': { es: 'Monto Total', en: 'Total Amount' },
  'loans.paidAmount': { es: 'Monto Pagado', en: 'Paid Amount' },
  'loans.remainingAmount': { es: 'Saldo Pendiente', en: 'Remaining Amount' },
  
  // Payments
  'payments.title': { es: 'Cobros', en: 'Payments' },
  'payments.new': { es: 'Registrar Cobro', en: 'New Payment' },
  'payments.amount': { es: 'Monto', en: 'Amount' },
  'payments.method': { es: 'Método de Pago', en: 'Payment Method' },
  'payments.cash': { es: 'Efectivo', en: 'Cash' },
  'payments.transfer': { es: 'Transferencia', en: 'Transfer' },
  'payments.digital': { es: 'Digital', en: 'Digital' },
  'payments.date': { es: 'Fecha', en: 'Date' },
  'payments.collector': { es: 'Cobrador', en: 'Collector' },
  'payments.notes': { es: 'Notas', en: 'Notes' },
  'payments.receipt': { es: 'N° Recibo', en: 'Receipt #' },
  
  // Reports
  'reports.title': { es: 'Reportes', en: 'Reports' },
  'reports.generate': { es: 'Generar Reporte', en: 'Generate Report' },
  'reports.exportPDF': { es: 'Exportar a PDF', en: 'Export to PDF' },
  'reports.exportExcel': { es: 'Exportar a Excel', en: 'Export to Excel' },
  'reports.collectionReport': { es: 'Reporte de Cobros', en: 'Collection Report' },
  'reports.loanReport': { es: 'Reporte de Préstamos', en: 'Loan Report' },
  'reports.collectorPerformance': { es: 'Rendimiento de Cobradores', en: 'Collector Performance' },
  'reports.overdueReport': { es: 'Reporte de Mora', en: 'Overdue Report' },
  
  // Common
  'common.save': { es: 'Guardar', en: 'Save' },
  'common.cancel': { es: 'Cancelar', en: 'Cancel' },
  'common.edit': { es: 'Editar', en: 'Edit' },
  'common.delete': { es: 'Eliminar', en: 'Delete' },
  'common.search': { es: 'Buscar', en: 'Search' },
  'common.filter': { es: 'Filtrar', en: 'Filter' },
  'common.actions': { es: 'Acciones', en: 'Actions' },
  'common.view': { es: 'Ver', en: 'View' },
  'common.success': { es: 'Éxito', en: 'Success' },
  'common.error': { es: 'Error', en: 'Error' },
  'common.loading': { es: 'Cargando...', en: 'Loading...' },
  'common.noData': { es: 'No hay datos', en: 'No data' },
  'common.confirm': { es: 'Confirmar', en: 'Confirm' },
  'common.yes': { es: 'Sí', en: 'Yes' },
  'common.no': { es: 'No', en: 'No' },
};

export const t = (key: string, lang: 'es' | 'en' = 'es'): string => {
  return translations[key]?.[lang] || key;
};
