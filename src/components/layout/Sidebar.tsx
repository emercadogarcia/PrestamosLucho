/**
 * Sidebar de Navegación Principal
 */

import { LayoutDashboard, Users, DollarSign, Receipt, BarChart3, Settings, LogOut } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { t } from '../../i18n/translations';
import { cn } from '../../utils/cn';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: any) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const { logout, language, company } = useStore();

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: t('nav.dashboard', language) },
    { id: 'clients', icon: Users, label: t('nav.clients', language) },
    { id: 'loans', icon: DollarSign, label: t('nav.loans', language) },
    { id: 'payments', icon: Receipt, label: t('nav.payments', language) },
    { id: 'reports', icon: BarChart3, label: t('nav.reports', language) },
    { id: 'settings', icon: Settings, label: t('nav.settings', language) },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-blue-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Préstamos LUCHO</h1>
            <p className="text-xs text-blue-300">{company?.name}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                isActive 
                  ? 'bg-blue-700 text-white' 
                  : 'text-blue-100 hover:bg-blue-700/50'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-blue-700">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-blue-700/50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">{t('nav.logout', language)}</span>
        </button>
      </div>
    </div>
  );
}
