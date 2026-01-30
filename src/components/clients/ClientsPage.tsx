/**
 * Gestión de Clientes
 */

import { useState } from 'react';
import { Search, Plus, Edit, Trash2, MapPin, Phone, Mail, AlertCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { t } from '../../i18n/translations';

export function ClientsPage() {
  const { clients, language } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.taxId.includes(searchTerm) ||
    client.phone1.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('clients.title', language)}</h1>
          <p className="text-gray-500 mt-1">
            {language === 'es' ? 'Gestión de clientes del sistema' : 'System clients management'}
          </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          {t('clients.new', language)}
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

      {/* Clients Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('clients.name', language)}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('clients.taxId', language)}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('clients.phone', language)}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('clients.city', language)}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('clients.creditScore', language)}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('common.actions', language)}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">
                          {client.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{client.name}</div>
                        {client.email && (
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {client.email}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {client.taxId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {client.phone1}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {client.city}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 w-20">
                        <div
                          className={`h-2 rounded-full ${
                            client.creditScore >= 80 ? 'bg-green-500' :
                            client.creditScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${client.creditScore}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{client.creditScore}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {client.isBlocked ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                        <AlertCircle className="w-3 h-3" />
                        {t('clients.blocked', language)}
                      </span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
