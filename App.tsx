import { useState } from 'react';
import { Home, School, FileCheck } from 'lucide-react';
import { Button } from './components/ui/button';
import { ParentPortal } from './components/ParentPortal';
import { AdminLogin } from './components/AdminLogin';
import { AdminPortal } from './components/AdminPortal';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [view, setView] = useState<'landing' | 'parent' | 'admin-login' | 'admin'>('landing');

  const handleLogout = () => {
    setView('landing');
  };

  const handleAdminLogin = () => {
    setView('admin');
  };

  if (view === 'parent') {
    return (
      <>
        <ParentPortal onLogout={handleLogout} />
        <Toaster position="top-right" />
      </>
    );
  }

  if (view === 'admin-login') {
    return (
      <>
        <AdminLogin onLogin={handleAdminLogin} onBack={handleLogout} />
        <Toaster position="top-right" />
      </>
    );
  }

  if (view === 'admin') {
    return (
      <>
        <AdminPortal onLogout={handleLogout} />
        <Toaster position="top-right" />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <FileCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-blue-900">CertiChain</h1>
              <p className="text-sm text-gray-600">Certificados Escolares Digitales</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-6">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
            <span className="text-sm">Tecnología Blockchain segura y transparente</span>
          </div>
          
          <h2 className="text-blue-900 mb-4">
            Sistema Digital de Certificados Escolares
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-8">
            Solicita, gestiona y verifica certificados escolares de forma rápida y segura. 
            Respaldados por tecnología blockchain para garantizar autenticidad permanente.
          </p>
        </div>

        {/* User Type Selection */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Parents/Guardians Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 text-white">
              <Home className="w-12 h-12 mb-4" />
              <h3 className="mb-2">Padres y Apoderados</h3>
              <p className="text-blue-100">
                Ver y descargar certificados de estudio
              </p>
            </div>
            <div className="p-8">
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Ingresa DNI y ve todos los certificados</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Organizados por grado escolar</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Descarga inmediata en PDF</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Verificación con código QR</span>
                </li>
              </ul>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14"
                onClick={() => setView('parent')}
              >
                Ver Certificados
              </Button>
            </div>
          </div>

          {/* Educational Entities Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-8 text-white">
              <School className="w-12 h-12 mb-4" />
              <h3 className="mb-2">Entidades Educativas</h3>
              <p className="text-green-100">
                Panel administrativo para gestión
              </p>
            </div>
            <div className="p-8">
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Gestión de estudiantes y certificados</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Digitalización de archivos históricos</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Búsqueda avanzada de estudiantes</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Validación con SUNEDU</span>
                </li>
              </ul>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white h-14"
                onClick={() => setView('admin-login')}
              >
                Iniciar Sesión
              </Button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 text-center">
          <h3 className="text-blue-900 mb-12">¿Por qué usar CertiChain?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileCheck className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-blue-900 mb-2">Seguridad Blockchain</h4>
              <p className="text-gray-600">
                Certificados inmutables y verificables respaldados por tecnología blockchain
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="text-blue-900 mb-2">Organizado por Grado</h4>
              <p className="text-gray-600">
                Carpetas claras por cada grado cursado, fácil de navegar y encontrar
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-blue-900 mb-2">100% Confiable</h4>
              <p className="text-gray-600">
                Acceso permanente a tu historial académico desde cualquier lugar
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <p>© 2025 CertiChain - Sistema Nacional de Certificados Escolares Digitales</p>
            <p className="text-sm mt-2">Desarrollado con tecnología blockchain para garantizar la seguridad y transparencia</p>
          </div>
        </div>
      </footer>
    </div>
  );
}