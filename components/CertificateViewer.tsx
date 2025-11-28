import { Download, Share2, CheckCircle, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface Certificate {
  id: string;
  studentName: string;
  studentDNI: string;
  grade: string;
  year: string;
  institution: string;
  status: 'complete' | 'partial';
  blockchain: string;
  issueDate: string;
}

const mockGrades = [
  { subject: 'Matemática', grade: 'A', credits: 4 },
  { subject: 'Comunicación', grade: 'A', credits: 4 },
  { subject: 'Ciencia y Tecnología', grade: 'B', credits: 3 },
  { subject: 'Ciencias Sociales', grade: 'A', credits: 3 },
  { subject: 'Educación Física', grade: 'A', credits: 2 },
  { subject: 'Arte y Cultura', grade: 'B', credits: 2 },
  { subject: 'Inglés', grade: 'A', credits: 3 },
  { subject: 'Educación para el Trabajo', grade: 'A', credits: 2 },
];

export function CertificateViewer({ certificate }: { certificate: Certificate }) {
  return (
    <div className="space-y-6">
      {/* Actions Bar */}
      <Card className="p-4 bg-white shadow-md">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-700">Certificado Verificado</span>
          </div>
          <div className="flex items-center gap-3">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 h-11">
              <Download className="w-5 h-5" />
              Descargar PDF
            </Button>
            <Button variant="outline" className="gap-2 h-11">
              <Share2 className="w-5 h-5" />
              Compartir
            </Button>
          </div>
        </div>
      </Card>

      {/* Certificate Document */}
      <Card className="p-8 md:p-12 bg-white shadow-xl">
        {/* Header */}
        <div className="border-b-4 border-blue-600 pb-6 mb-6 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-blue-900 mb-2">Certificado de Estudios</h2>
          <p className="text-gray-600">República del Perú - Ministerio de Educación</p>
        </div>

        {/* Student Info */}
        <div className="mb-8">
          <h3 className="text-blue-900 mb-4">Datos del Estudiante</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Apellidos y Nombres</p>
              <p className="text-blue-900">{certificate.studentName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">DNI</p>
              <p className="text-blue-900">{certificate.studentDNI}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Grado</p>
              <p className="text-blue-900">{certificate.grade}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Año Académico</p>
              <p className="text-blue-900">{certificate.year}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-600 mb-1">Institución Educativa</p>
              <p className="text-blue-900">{certificate.institution}</p>
            </div>
          </div>
        </div>

        {/* Grades Table */}
        <div className="mb-8">
          <h3 className="text-blue-900 mb-4">Registro de Calificaciones</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-blue-600">
                  <th className="text-left py-3 px-4 text-blue-900">Área Curricular</th>
                  <th className="text-center py-3 px-4 text-blue-900">Calificación</th>
                  <th className="text-center py-3 px-4 text-blue-900">Créditos</th>
                </tr>
              </thead>
              <tbody>
                {mockGrades.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-3 px-4 text-gray-700">{item.subject}</td>
                    <td className="text-center py-3 px-4">
                      <span className={`inline-block px-3 py-1 rounded ${
                        item.grade === 'A' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {item.grade}
                      </span>
                    </td>
                    <td className="text-center py-3 px-4 text-gray-700">{item.credits}</td>
                  </tr>
                ))}
                <tr className="bg-blue-50">
                  <td className="py-3 px-4 text-blue-900">Total de Créditos</td>
                  <td className="text-center py-3 px-4"></td>
                  <td className="text-center py-3 px-4 text-blue-900">
                    {mockGrades.reduce((sum, item) => sum + item.credits, 0)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Blockchain Verification */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 border-2 border-blue-200">
          <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h3 className="text-blue-900 mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Verificación Blockchain
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                Este certificado está registrado en blockchain y puede ser verificado de forma pública
              </p>
              <div className="space-y-1 text-xs">
                <p className="text-gray-600">ID del Certificado: <span className="font-mono text-blue-900">{certificate.id}</span></p>
                <p className="text-gray-600">Hash Blockchain: <span className="font-mono text-blue-900">{certificate.blockchain}</span></p>
                <p className="text-gray-600">Fecha de Emisión: <span className="text-blue-900">{certificate.issueDate}</span></p>
              </div>
            </div>
            
            {/* QR Code */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-white rounded-lg p-2 border-2 border-blue-300 shadow-md">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Simplified QR Code representation */}
                  <rect x="0" y="0" width="100" height="100" fill="white"/>
                  <rect x="10" y="10" width="15" height="15" fill="black"/>
                  <rect x="75" y="10" width="15" height="15" fill="black"/>
                  <rect x="10" y="75" width="15" height="15" fill="black"/>
                  <rect x="30" y="30" width="5" height="5" fill="black"/>
                  <rect x="40" y="30" width="5" height="5" fill="black"/>
                  <rect x="50" y="30" width="5" height="5" fill="black"/>
                  <rect x="60" y="30" width="5" height="5" fill="black"/>
                  <rect x="30" y="40" width="5" height="5" fill="black"/>
                  <rect x="60" y="40" width="5" height="5" fill="black"/>
                  <rect x="30" y="50" width="5" height="5" fill="black"/>
                  <rect x="40" y="50" width="5" height="5" fill="black"/>
                  <rect x="50" y="50" width="5" height="5" fill="black"/>
                  <rect x="60" y="50" width="5" height="5" fill="black"/>
                  <rect x="30" y="60" width="5" height="5" fill="black"/>
                  <rect x="60" y="60" width="5" height="5" fill="black"/>
                  <rect x="75" y="75" width="15" height="15" fill="black"/>
                </svg>
              </div>
              <p className="text-xs text-gray-600 mt-2 text-center">
                Escanea para verificar
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600 mb-2">
            Este documento tiene validez oficial según Ley N° 28044 - Ley General de Educación
          </p>
          <p className="text-xs text-gray-500">
            Certificado digital emitido el {certificate.issueDate} | Sistema CertiChain
          </p>
        </div>
      </Card>

      {/* Instructions Card */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="text-blue-900 mb-3">¿Cómo usar este certificado?</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
            <span><strong>Para trámites físicos:</strong> Descarga el PDF y preséntalo impreso</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
            <span><strong>Para trámites digitales:</strong> Comparte el código QR o el archivo PDF</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
            <span><strong>Para verificación:</strong> Permite escanear el código QR con cualquier lector</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
