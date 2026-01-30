/**
 * Página de Login
 * Soporta autenticación por email/password y Google OAuth
 */

import { useState } from 'react';
import { DollarSign, Mail, Lock } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { mockCompany, mockUser, mockToken, mockClients, mockLoans, mockPayments } from '../../data/mockData';

export function LoginPage() {
  const { login, setClients, setLoans, setPayments, language } = useStore();
  const [email, setEmail] = useState('admin@prestamoslucho.com');
  const [password, setPassword] = useState('admin123');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simular login (en producción, llamar al backend)
    login(mockUser, mockCompany, mockToken);
    setClients(mockClients);
    setLoans(mockLoans);
    setPayments(mockPayments);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4">
            <DollarSign className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Préstamos LUCHO</h1>
          <p className="text-blue-200">{language === 'es' ? 'Sistema de Gestión de Préstamos' : 'Loan Management System'}</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {language === 'es' ? 'Iniciar Sesión' : 'Login'}
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'es' ? 'Correo Electrónico' : 'Email'}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="admin@prestamoslucho.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'es' ? 'Contraseña' : 'Password'}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {language === 'es' ? 'Iniciar Sesión' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Demo: admin@prestamoslucho.com / admin123
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-blue-100">
          <p>© 2024 Préstamos LUCHO. {language === 'es' ? 'Todos los derechos reservados' : 'All rights reserved'}.</p>
        </div>
      </div>
    </div>
  );
}
