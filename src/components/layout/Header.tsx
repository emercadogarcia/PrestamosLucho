/**
 * Header Principal de la Aplicación
 */

import { Bell, Globe } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function Header() {
  const { user, language, setLanguage } = useStore();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {language === 'es' ? 'Bienvenido' : 'Welcome'}, {user?.name}
          </h2>
          <p className="text-sm text-gray-500">
            {user?.role === 'admin' && (language === 'es' ? 'Administrador' : 'Administrator')}
            {user?.role === 'lender' && (language === 'es' ? 'Prestamista' : 'Lender')}
            {user?.role === 'collector' && (language === 'es' ? 'Cobrador' : 'Collector')}
            {user?.role === 'reporting' && (language === 'es' ? 'Reportes' : 'Reporting')}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <button
            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Globe className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              {language === 'es' ? 'ES' : 'EN'}
            </span>
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Avatar */}
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">
              {user?.name.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
