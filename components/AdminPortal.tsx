import { useState } from 'react';
import { 
  Users, 
  Upload, 
  Search, 
  Settings,
  ArrowLeft,
  Menu,
  X,
  School,
  FileSpreadsheet
} from 'lucide-react';
import { Button } from './ui/button';
import { StudentManagement } from './StudentManagement';
import { DocumentUpload } from './DocumentUpload';
import { AdminSearch } from './AdminSearch';
import { ExcelUpload } from './ExcelUpload';

type View = 'students' | 'upload' | 'search' | 'excel';

export function AdminPortal({ onLogout }: { onLogout: () => void }) {
  const [currentView, setCurrentView] = useState<View>('students');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'students' as View, label: 'Gestión de Estudiantes', icon: Users },
    { id: 'upload' as View, label: 'Subir Certificados', icon: Upload },
    { id: 'excel' as View, label: 'Subir Notas (Excel)', icon: FileSpreadsheet },
    { id: 'search' as View, label: 'Búsqueda Avanzada', icon: Search },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
                <School className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-green-900">Panel Administrativo</h1>
                <p className="text-sm text-gray-600">I.E. San José</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={onLogout}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 
          transition-transform duration-300 z-30
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    currentView === item.id
                      ? 'bg-green-50 text-green-900'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
            <div className="text-xs text-gray-600">
              <p className="mb-1">Usuario: admin@sanjose.edu.pe</p>
              <p>Última sesión: Hoy, 10:30 AM</p>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {currentView === 'students' && <StudentManagement />}
          {currentView === 'upload' && <DocumentUpload />}
          {currentView === 'excel' && <ExcelUpload />}
          {currentView === 'search' && <AdminSearch />}
        </main>
      </div>
    </div>
  );
}