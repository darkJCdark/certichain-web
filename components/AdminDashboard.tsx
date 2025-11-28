import { Users, FileCheck, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Card } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const statsData = {
  totalCertificates: 12845,
  thisMonth: 324,
  pending: 45,
  digitized: 8956
};

const monthlyData = [
  { month: 'Ene', certificates: 890 },
  { month: 'Feb', certificates: 1020 },
  { month: 'Mar', certificates: 950 },
  { month: 'Abr', certificates: 1150 },
  { month: 'May', certificates: 1080 },
  { month: 'Jun', certificates: 1250 },
];

const recentActivity = [
  { action: 'Certificado emitido', student: 'Juan Pérez', time: 'Hace 5 min', status: 'success' },
  { action: 'Archivo digitalizado', document: 'Acta 1985 - Grado 5°', time: 'Hace 15 min', status: 'success' },
  { action: 'Solicitud pendiente', student: 'María García', time: 'Hace 1 hora', status: 'warning' },
  { action: 'Validación SUNEDU', document: 'Certificado #2024-450', time: 'Hace 2 horas', status: 'success' },
];

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-green-900 mb-2">Panel Principal</h2>
        <p className="text-gray-600">Vista general del sistema de certificados</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Certificados</p>
              <p className="text-green-900">{statsData.totalCertificates.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FileCheck className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-green-600">+12% vs mes anterior</span>
          </div>
        </Card>

        <Card className="p-6 bg-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Este Mes</p>
              <p className="text-green-900">{statsData.thisMonth}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-gray-600">Últimos 30 días</span>
          </div>
        </Card>

        <Card className="p-6 bg-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pendientes</p>
              <p className="text-green-900">{statsData.pending}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-yellow-600">Requieren atención</span>
          </div>
        </Card>

        <Card className="p-6 bg-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Digitalizados</p>
              <p className="text-green-900">{statsData.digitized.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-gray-600">Archivos históricos</span>
          </div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white">
          <h3 className="text-green-900 mb-6">Certificados por Mes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="certificates" fill="#059669" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-white">
          <h3 className="text-green-900 mb-6">Tendencia de Solicitudes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="certificates" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Activity and Alerts */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 bg-white">
          <h3 className="text-green-900 mb-4">Actividad Reciente</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  activity.status === 'success' ? 'bg-green-100' : 'bg-yellow-100'
                }`}>
                  {activity.status === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Clock className="w-5 h-5 text-yellow-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">
                    {activity.student || activity.document}
                  </p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-white">
          <h3 className="text-green-900 mb-4">Alertas del Sistema</h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-green-900">Sistema operando normalmente</p>
                  <p className="text-xs text-green-700 mt-1">Todos los servicios activos</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-yellow-900">Período de alta demanda</p>
                  <p className="text-xs text-yellow-700 mt-1">15 días para inicio de clases</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm text-blue-900">Actualización disponible</p>
                  <p className="text-xs text-blue-700 mt-1">Nueva versión del sistema</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <h3 className="text-green-900 mb-4">Acciones Rápidas</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 bg-white rounded-lg hover:shadow-md transition-shadow text-left">
            <FileCheck className="w-8 h-8 text-green-600 mb-2" />
            <p className="text-gray-900">Emitir Certificado</p>
            <p className="text-xs text-gray-600 mt-1">Nuevo certificado</p>
          </button>
          <button className="p-4 bg-white rounded-lg hover:shadow-md transition-shadow text-left">
            <Users className="w-8 h-8 text-blue-600 mb-2" />
            <p className="text-gray-900">Buscar Alumno</p>
            <p className="text-xs text-gray-600 mt-1">Por DNI o nombre</p>
          </button>
          <button className="p-4 bg-white rounded-lg hover:shadow-md transition-shadow text-left">
            <svg className="w-8 h-8 text-purple-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-900">Digitalizar</p>
            <p className="text-xs text-gray-600 mt-1">Archivo histórico</p>
          </button>
          <button className="p-4 bg-white rounded-lg hover:shadow-md transition-shadow text-left">
            <svg className="w-8 h-8 text-orange-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p className="text-gray-900">Ver Reportes</p>
            <p className="text-xs text-gray-600 mt-1">Estadísticas</p>
          </button>
        </div>
      </Card>
    </div>
  );
}
