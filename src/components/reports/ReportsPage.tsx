/**
 * Reportes y Análisis
 */

import { FileText, Download, Calendar } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { formatCurrency } from '../../utils/loanCalculations';
import { t } from '../../i18n/translations';

export function ReportsPage() {
  const { loans, payments, clients, language } = useStore();

  const reportTypes = [
    {
      id: 'collection',
      title: t('reports.collectionReport', language),
      description: language === 'es' ? 'Reporte detallado de cobros realizados' : 'Detailed collection report',
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      id: 'loans',
      title: t('reports.loanReport', language),
      description: language === 'es' ? 'Estado actual de todos los préstamos' : 'Current status of all loans',
      icon: FileText,
      color: 'bg-green-500',
    },
    {
      id: 'collectors',
      title: t('reports.collectorPerformance', language),
      description: language === 'es' ? 'Rendimiento de cobradores' : 'Collector performance metrics',
      icon: FileText,
      color: 'bg-purple-500',
    },
    {
      id: 'overdue',
      title: t('reports.overdueReport', language),
      description: language === 'es' ? 'Préstamos vencidos y en mora' : 'Overdue and defaulted loans',
      icon: FileText,
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t('reports.title', language)}</h1>
        <p className="text-gray-500 mt-1">
          {language === 'es' ? 'Genera y exporta reportes del sistema' : 'Generate and export system reports'}
        </p>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportTypes.map((report) => {
          const Icon = report.icon;
          return (
            <div key={report.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-start gap-4">
                <div className={`${report.color} w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{report.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{report.description}</p>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      <Download className="w-4 h-4" />
                      {t('reports.exportPDF', language)}
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                      <Download className="w-4 h-4" />
                      {t('reports.exportExcel', language)}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {language === 'es' ? 'Resumen Ejecutivo' : 'Executive Summary'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">{language === 'es' ? 'Total Préstamos' : 'Total Loans'}</p>
            <p className="text-2xl font-bold text-blue-600">{loans.length}</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">{language === 'es' ? 'Total Clientes' : 'Total Clients'}</p>
            <p className="text-2xl font-bold text-green-600">{clients.length}</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">{language === 'es' ? 'Total Cobros' : 'Total Payments'}</p>
            <p className="text-2xl font-bold text-purple-600">{payments.length}</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">{language === 'es' ? 'Tasa Cobro' : 'Collection Rate'}</p>
            <p className="text-2xl font-bold text-orange-600">
              {((payments.reduce((s, p) => s + p.amount, 0) / loans.reduce((s, l) => s + l.totalAmount, 0)) * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* Date Range Selector */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {language === 'es' ? 'Filtros de Fecha' : 'Date Filters'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'es' ? 'Fecha Inicio' : 'Start Date'}
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'es' ? 'Fecha Fin' : 'End Date'}
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              {t('reports.generate', language)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
