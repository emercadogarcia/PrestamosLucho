/**
 * Gestión de Cobros/Pagos
 */

import { useState } from 'react';
import { Search, Plus, DollarSign, Calendar } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { formatCurrency } from '../../utils/loanCalculations';
import { t } from '../../i18n/translations';
import { format } from 'date-fns';

export function PaymentsPage() {
  const { payments, clients, loans, language } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPayments = payments.filter(payment => {
    const client = clients.find(c => c.id === payment.clientId);
    return client?.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           payment.receiptNumber?.includes(searchTerm);
  });

  const getPaymentMethodBadge = (method: string) => {
    const badges = {
      cash: { color: 'bg-green-100 text-green-700', label: t('payments.cash', language) },
      transfer: { color: 'bg-blue-100 text-blue-700', label: t('payments.transfer', language) },
      digital: { color: 'bg-purple-100 text-purple-700', label: t('payments.digital', language) },
    };
    const badge = badges[method as keyof typeof badges] || badges.cash;
    return (
      <span className={`inline-flex px-3 py-1 ${badge.color} rounded-full text-xs font-medium`}>
        {badge.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('payments.title', language)}</h1>
          <p className="text-gray-500 mt-1">
            {language === 'es' ? 'Registro de cobros realizados' : 'Payment records'}
          </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          {t('payments.new', language)}
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('common.search', language)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'es' ? 'Cliente' : 'Client'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('payments.amount', language)}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('payments.method', language)}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('payments.date', language)}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('payments.receipt', language)}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('payments.notes', language)}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayments.map((payment) => {
                const client = clients.find(c => c.id === payment.clientId);
                const loan = loans.find(l => l.id === payment.loanId);
                
                return (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{client?.name || 'N/A'}</div>
                          <div className="text-sm text-gray-500">{client?.taxId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-green-600">
                        {formatCurrency(payment.amount, payment.currency)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getPaymentMethodBadge(payment.paymentMethod)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-900">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {format(new Date(payment.paymentDate), 'dd/MM/yyyy')}
                      </div>
                      <div className="text-xs text-gray-500">
                        {format(new Date(payment.paymentDate), 'HH:mm')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.receiptNumber || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {payment.notes || '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">
                {language === 'es' ? 'Total Cobrado Hoy' : 'Total Collected Today'}
              </p>
              <h3 className="text-2xl font-bold text-green-600">
                {formatCurrency(
                  payments
                    .filter(p => new Date(p.paymentDate).toDateString() === new Date().toDateString())
                    .reduce((sum, p) => sum + p.amount, 0),
                  'PEN'
                )}
              </h3>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">
                {language === 'es' ? 'Cobros Hoy' : 'Payments Today'}
              </p>
              <h3 className="text-2xl font-bold text-blue-600">
                {payments.filter(p => new Date(p.paymentDate).toDateString() === new Date().toDateString()).length}
              </h3>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">
                {language === 'es' ? 'Total General' : 'Total Overall'}
              </p>
              <h3 className="text-2xl font-bold text-purple-600">
                {formatCurrency(payments.reduce((sum, p) => sum + p.amount, 0), 'PEN')}
              </h3>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
