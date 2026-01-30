/**
 * Gestión de Préstamos
 */

import { useState } from 'react';
import { Search, Plus, Eye, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { formatCurrency } from '../../utils/loanCalculations';
import { t } from '../../i18n/translations';

export function LoansPage() {
  const { loans, clients, language, company } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredLoans = loans.filter(loan => {
    const client = clients.find(c => c.id === loan.clientId);
    const matchesSearch = client?.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          loan.id.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || loan.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const badges = {
      active: { color: 'bg-green-100 text-green-700', icon: CheckCircle, label: t('loans.active', language) },
      completed: { color: 'bg-blue-100 text-blue-700', icon: CheckCircle, label: t('loans.completed', language) },
      overdue: { color: 'bg-yellow-100 text-yellow-700', icon: Clock, label: t('loans.overdue', language) },
      defaulted: { color: 'bg-red-100 text-red-700', icon: AlertCircle, label: t('loans.defaulted', language) },
    };
    const badge = badges[status as keyof typeof badges] || badges.active;
    const Icon = badge.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 ${badge.color} rounded-full text-xs font-medium`}>
        <Icon className="w-3 h-3" />
        {badge.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('loans.title', language)}</h1>
          <p className="text-gray-500 mt-1">
            {language === 'es' ? 'Gestión de préstamos activos' : 'Active loans management'}
          </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          {t('loans.new', language)}
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">{language === 'es' ? 'Todos los estados' : 'All statuses'}</option>
            <option value="active">{t('loans.active', language)}</option>
            <option value="completed">{t('loans.completed', language)}</option>
            <option value="overdue">{t('loans.overdue', language)}</option>
            <option value="defaulted">{t('loans.defaulted', language)}</option>
          </select>
        </div>
      </div>

      {/* Loans Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'es' ? 'Cliente' : 'Client'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('loans.amount', language)}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('loans.totalAmount', language)}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('loans.paidAmount', language)}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('loans.remainingAmount', language)}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('loans.status', language)}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('common.actions', language)}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLoans.map((loan) => {
                const client = clients.find(c => c.id === loan.clientId);
                const progress = (loan.paidAmount / loan.totalAmount) * 100;
                
                return (
                  <tr key={loan.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{client?.name || 'N/A'}</div>
                      <div className="text-sm text-gray-500">{client?.taxId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(loan.amount, loan.currency)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {loan.termDays} {language === 'es' ? 'días' : 'days'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(loan.totalAmount, loan.currency)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-green-600">
                        {formatCurrency(loan.paidAmount, loan.currency)}
                      </div>
                      <div className="w-20 bg-gray-200 rounded-full h-1.5 mt-1">
                        <div
                          className="bg-green-500 h-1.5 rounded-full"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-orange-600">
                      {formatCurrency(loan.remainingAmount, loan.currency)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(loan.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
