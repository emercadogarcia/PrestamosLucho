/**
 * Configuración del Sistema
 */

import { Settings, Building2, DollarSign, Users, Shield } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { t } from '../../i18n/translations';

export function SettingsPage() {
  const { company, user, language } = useStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t('nav.settings', language)}</h1>
        <p className="text-gray-500 mt-1">
          {language === 'es' ? 'Configuración de la empresa y sistema' : 'Company and system configuration'}
        </p>
      </div>

      {/* Company Info */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            {language === 'es' ? 'Información de la Empresa' : 'Company Information'}
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'es' ? 'Nombre' : 'Name'}
            </label>
            <input
              type="text"
              defaultValue={company?.name}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'es' ? 'NIF/RUC' : 'Tax ID'}
            </label>
            <input
              type="text"
              defaultValue={company?.taxId}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'es' ? 'Teléfono' : 'Phone'}
            </label>
            <input
              type="text"
              defaultValue={company?.phone}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'es' ? 'Correo' : 'Email'}
            </label>
            <input
              type="email"
              defaultValue={company?.email}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'es' ? 'Dirección' : 'Address'}
            </label>
            <input
              type="text"
              defaultValue={company?.address}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Financial Configuration */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            {language === 'es' ? 'Configuración Financiera' : 'Financial Configuration'}
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'es' ? 'Tasa de Interés por Defecto (%)' : 'Default Interest Rate (%)'}
            </label>
            <input
              type="number"
              step="0.1"
              defaultValue={company?.config.defaultInterestRate}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'es' ? 'Tasa de Mora (%)' : 'Late Fee Rate (%)'}
            </label>
            <input
              type="number"
              step="0.1"
              defaultValue={company?.config.defaultLateFeeRate}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'es' ? 'Período de Gracia (días)' : 'Grace Period (days)'}
            </label>
            <input
              type="number"
              defaultValue={company?.config.gracePeriodDays}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'es' ? 'Moneda por Defecto' : 'Default Currency'}
            </label>
            <select
              defaultValue={company?.defaultCurrency}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="PEN">PEN - Sol Peruano</option>
              <option value="USD">USD - Dólar Americano</option>
              <option value="EUR">EUR - Euro</option>
              <option value="COP">COP - Peso Colombiano</option>
              <option value="MXN">MXN - Peso Mexicano</option>
            </select>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            {language === 'es' ? 'Seguridad' : 'Security'}
          </h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">
                {language === 'es' ? 'Habilitar 2FA' : 'Enable 2FA'}
              </p>
              <p className="text-sm text-gray-500">
                {language === 'es' ? 'Autenticación de dos factores para todos los usuarios' : 'Two-factor authentication for all users'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked={company?.config.enable2FA} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">
                {language === 'es' ? 'Interés Compuesto' : 'Compound Interest'}
              </p>
              <p className="text-sm text-gray-500">
                {language === 'es' ? 'Habilitar cálculo de interés compuesto' : 'Enable compound interest calculation'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked={company?.config.enableCompoundInterest} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-orange-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            {language === 'es' ? 'Mi Perfil' : 'My Profile'}
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'es' ? 'Nombre' : 'Name'}
            </label>
            <input
              type="text"
              defaultValue={user?.name}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'es' ? 'Correo' : 'Email'}
            </label>
            <input
              type="email"
              defaultValue={user?.email}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-4">
        <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          {t('common.cancel', language)}
        </button>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          {t('common.save', language)}
        </button>
      </div>
    </div>
  );
}
