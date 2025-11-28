import { Server, Database, Wifi, Shield, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const serverLoad = [
  { time: '00:00', load: 45 },
  { time: '04:00', load: 30 },
  { time: '08:00', load: 75 },
  { time: '12:00', load: 90 },
  { time: '16:00', load: 85 },
  { time: '20:00', load: 60 },
];

const blockchainActivity = [
  { time: '00:00', transactions: 120 },
  { time: '04:00', transactions: 80 },
  { time: '08:00', transactions: 250 },
  { time: '12:00', transactions: 380 },
  { time: '16:00', transactions: 320 },
  { time: '20:00', transactions: 180 },
];

export function SystemStatus() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-green-900 mb-2">Estado del Sistema</h2>
        <p className="text-gray-600">Monitoreo en tiempo real de infraestructura híbrida (nube + servidores físicos)</p>
      </div>

      {/* System Health Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-white">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Server className="w-6 h-6 text-green-600" />
            </div>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              Operativo
            </span>
          </div>
          <h4 className="text-gray-900 mb-1">Servidores</h4>
          <p className="text-sm text-gray-600">4 de 4 activos</p>
        </Card>

        <Card className="p-6 bg-white">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              Operativo
            </span>
          </div>
          <h4 className="text-gray-900 mb-1">Base de Datos</h4>
          <p className="text-sm text-gray-600">Sincronizada</p>
        </Card>

        <Card className="p-6 bg-white">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              Operativo
            </span>
          </div>
          <h4 className="text-gray-900 mb-1">Blockchain</h4>
          <p className="text-sm text-gray-600">Red estable</p>
        </Card>

        <Card className="p-6 bg-white">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Wifi className="w-6 h-6 text-orange-600" />
            </div>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs">
              <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
              Alta Carga
            </span>
          </div>
          <h4 className="text-gray-900 mb-1">API Gateway</h4>
          <p className="text-sm text-gray-600">85% capacidad</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-green-900">Carga del Servidor</h3>
              <p className="text-sm text-gray-600">Últimas 24 horas</p>
            </div>
            <span className="text-green-700">75% promedio</span>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={serverLoad}>
              <defs>
                <linearGradient id="loadGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="load" 
                stroke="#059669" 
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#loadGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-green-900">Actividad Blockchain</h3>
              <p className="text-sm text-gray-600">Transacciones por hora</p>
            </div>
            <span className="text-blue-700">280 tx/h</span>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={blockchainActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#6b7280" />
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
                dataKey="transactions" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Infrastructure Details */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white">
          <h3 className="text-green-900 mb-4">Infraestructura en la Nube</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Server className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-900">Servidor Web Principal</p>
                  <p className="text-sm text-gray-600">AWS EC2 - us-east-1</p>
                </div>
              </div>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-gray-900">Base de Datos</p>
                  <p className="text-sm text-gray-600">PostgreSQL - RDS</p>
                </div>
              </div>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-900">Almacenamiento</p>
                  <p className="text-sm text-gray-600">S3 Bucket - 2.4 TB</p>
                </div>
              </div>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white">
          <h3 className="text-green-900 mb-4">Servidores Físicos</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Server className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-gray-900">Servidor Backup Principal</p>
                  <p className="text-sm text-gray-600">On-Premise - Lima</p>
                </div>
              </div>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Server className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-gray-900">Servidor Archivos Históricos</p>
                  <p className="text-sm text-gray-600">On-Premise - Lima</p>
                </div>
              </div>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-900">Nodo Blockchain</p>
                  <p className="text-sm text-gray-600">Dedicado - Local</p>
                </div>
              </div>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Alerts and Warnings */}
      <Card className="p-6 bg-white">
        <h3 className="text-green-900 mb-4">Alertas del Sistema</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-green-900">Sistema operando normalmente</p>
              <p className="text-sm text-green-700 mt-1">Todos los servicios están funcionando correctamente</p>
            </div>
            <span className="text-xs text-green-700">Ahora</span>
          </div>

          <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-yellow-900">Período de alta demanda detectado</p>
              <p className="text-sm text-yellow-700 mt-1">
                Incremento del 45% en solicitudes. Sistema preparado para carga adicional. Próximo período crítico: Inicio de clases (15 días)
              </p>
            </div>
            <span className="text-xs text-yellow-700">2h</span>
          </div>

          <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <p className="text-blue-900">Mantenimiento programado</p>
              <p className="text-sm text-blue-700 mt-1">
                Actualización del sistema blockchain programada para el domingo 24/11 a las 02:00 AM. Duración estimada: 30 minutos.
              </p>
            </div>
            <span className="text-xs text-blue-700">5h</span>
          </div>
        </div>
      </Card>

      {/* Performance Metrics */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <h3 className="text-green-900 mb-6">Métricas de Rendimiento (24h)</h3>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-green-900 mb-1">98.7%</div>
            <p className="text-sm text-gray-600">Uptime</p>
          </div>
          <div className="text-center">
            <div className="text-green-900 mb-1">156ms</div>
            <p className="text-sm text-gray-600">Tiempo de Respuesta</p>
          </div>
          <div className="text-center">
            <div className="text-green-900 mb-1">12,845</div>
            <p className="text-sm text-gray-600">Certificados Emitidos</p>
          </div>
          <div className="text-center">
            <div className="text-green-900 mb-1">3,240</div>
            <p className="text-sm text-gray-600">Transacciones Blockchain</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
