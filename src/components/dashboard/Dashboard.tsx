/**
 * Dashboard Principal
 * Métricas clave, estadísticas y resumen
 */

import { DollarSign, TrendingUp, AlertCircle, Users, CheckCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { formatCurrency } from '../../utils/loanCalculations';
import { t } from '../../i18n/translations';

export function Dashboard() {
  const { loans, payments, clients, company, language } = useStore();

  // Calcular métricas
  const totalLoans = loans.length;
  const activeLoans = loans.filter(l => l.status === 'active').length;
  const overdueLoans = loans.filter(l => l.status === 'defaulted').length;
  
  const totalDisbursed = loans.reduce((sum, loan) => sum + loan.amount, 0);
  const totalCollected = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const totalPending = loans.reduce((sum, loan) => sum + loan.remainingAmount, 0);
  
  const collectionRate = totalDisbursed > 0 ? (totalCollected / totalDisbursed) * 100 : 0;

  const stats = [
    {
      title: t('dashboard.totalLoans', language),
      value: totalLoans.toString(),
      icon: DollarSign,
      color: 'bg-blue-500',
      change: '+12%',
    },
    {
      title: t('dashboard.activeLoans', language),
      value: activeLoans.toString(),
      icon: CheckCircle,
      color: 'bg-green-500',
      change: '+8%',
    },
    {
      title: t('dashboard.overdueLoans', language),
      value: overdueLoans.toString(),
      icon: AlertCircle,
      color: 'bg-red-500',
      change: '-5%',
    },
    {
      title: t('dashboard.totalDisbursed', language),
      value: formatCurrency(totalDisbursed, company?.defaultCurrency || 'PEN'),
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: '+18%',
    },
  ];

  const recentPayments = payments.slice(-5).reverse();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {t('dashboard.title', language)}
        </h1>
        <p className="text-gray-500 mt-1">
          {language === 'es' ? 'Resumen general del sistema' : 'System overview'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Collection Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {language === 'es' ? 'Resumen de Cobros' : 'Collection Summary'}
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t('dashboard.totalDisbursed', language)}</span>
              <span className="font-semibold">{formatCurrency(totalDisbursed, company?.defaultCurrency || 'PEN')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t('dashboard.totalCollected', language)}</span>
              <span className="font-semibold text-green-600">{formatCurrency(totalCollected, company?.defaultCurrency || 'PEN')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t('dashboard.totalPending', language)}</span>
              <span className="font-semibold text-orange-600">{formatCurrency(totalPending, company?.defaultCurrency || 'PEN')}</span>
            </div>
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900">{t('dashboard.collectionRate', language)}</span>
                <span className="text-xl font-bold text-blue-600">{collectionRate.toFixed(1)}%</span>
              </div>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${collectionRate}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t('dashboard.recentPayments', language)}
          </h3>
          <div className="space-y-3">
            {recentPayments.length > 0 ? (
              recentPayments.map((payment) => {
                const client = clients.find(c => c.id === payment.clientId);
                return (
                  <div key={payment.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{client?.name || 'Cliente'}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(payment.paymentDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(payment.amount, payment.currency)}
                    </span>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-500 py-4">{t('common.noData', language)}</p>
            )}
          </div>
        </div>
      </div>

      {/* Active Clients */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {language === 'es' ? 'Clientes Activos' : 'Active Clients'}
          </h3>
          <span className="text-sm text-gray-500">
            {clients.filter(c => !c.isBlocked).length} {language === 'es' ? 'activos' : 'active'}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {clients.filter(c => !c.isBlocked).slice(0, 3).map((client) => (
            <div key={client.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{client.name}</p>
                  <p className="text-sm text-gray-500">{client.taxId}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-green-500 h-1.5 rounded-full"
                        style={{ width: `${client.creditScore}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600">{client.creditScore}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
