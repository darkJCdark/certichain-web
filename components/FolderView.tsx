import { Download, QrCode, CheckCircle, Shield } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface GradeFolder {
  grade: string;
  level: string;
  certificateCount: number;
  year: string;
}

interface Props {
  folder: GradeFolder;
  studentName: string;
  studentDNI: string;
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

const mockTeacher = {
  name: 'Prof. Carlos Mendoza García',
  code: 'DOC-2024-0456'
};

const mockInstitution = {
  name: 'I.E. San José',
  code: 'IE-150025-LIMA'
};

const mockBlockchainData = {
  transactionHash: '0x7a8f9b2e4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f',
  ipfs: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG',
  nftTokenId: 'NFT-CERT-2024-789456'
};

export function FolderView({ folder, studentName, studentDNI }: Props) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-white shadow-md">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-blue-900 mb-1">{folder.grade}</h2>
              <p className="text-gray-600">Año {folder.year}</p>
              <p className="text-sm text-gray-600 mt-1">{studentName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-700">Verificado en Blockchain</span>
          </div>
        </div>
      </Card>

      {/* Certificate Document */}
      <Card className="p-8 md:p-12 bg-white shadow-xl">
        {/* Certificate Header */}
        <div className="border-b-4 border-blue-600 pb-6 mb-6 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-blue-900 mb-2">Certificado de Estudios</h2>
          <p className="text-gray-600">República del Perú - Ministerio de Educación</p>
          <p className="text-sm text-gray-500 mt-2">I.E. San José</p>
        </div>

        {/* Student Info */}
        <div className="mb-8">
          <h3 className="text-blue-900 mb-4">Datos del Estudiante</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Apellidos y Nombres</p>
              <p className="text-blue-900">{studentName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">DNI</p>
              <p className="text-blue-900">{studentDNI}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Grado</p>
              <p className="text-blue-900">{folder.grade}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Año Académico</p>
              <p className="text-blue-900">{folder.year}</p>
            </div>
          </div>
        </div>

        {/* Teacher and Institution Info */}
        <div className="mb-8 grid md:grid-cols-2 gap-6">
          <Card className="p-4 bg-blue-50 border border-blue-200">
            <h4 className="text-blue-900 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Docente Responsable
            </h4>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-gray-600">Nombre</p>
                <p className="text-gray-900">{mockTeacher.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Código Identificador</p>
                <p className="text-blue-900 font-mono text-sm">{mockTeacher.code}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-green-50 border border-green-200">
            <h4 className="text-green-900 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Entidad Educativa
            </h4>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-gray-600">Nombre</p>
                <p className="text-gray-900">{mockInstitution.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Código Institucional</p>
                <p className="text-green-900 font-mono text-sm">{mockInstitution.code}</p>
              </div>
            </div>
          </Card>
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

        {/* QR and Blockchain Verification */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 border-2 border-blue-200">
          <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h3 className="text-blue-900 mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Verificación Blockchain
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                Este certificado es un NFT registrado en blockchain para garantizar autenticidad permanente
              </p>
              <div className="space-y-2 text-xs bg-white p-3 rounded-lg border border-blue-200">
                <div>
                  <p className="text-gray-500">NFT Token ID</p>
                  <p className="font-mono text-blue-900 break-all">{mockBlockchainData.nftTokenId}</p>
                </div>
                <div>
                  <p className="text-gray-500">Transaction Hash</p>
                  <p className="font-mono text-blue-900 break-all">{mockBlockchainData.transactionHash}</p>
                </div>
                <div>
                  <p className="text-gray-500">IPFS</p>
                  <p className="font-mono text-blue-900 break-all">{mockBlockchainData.ipfs}</p>
                </div>
                <div>
                  <p className="text-gray-500">Fecha de Emisión</p>
                  <p className="text-blue-900">{folder.year}-12-15</p>
                </div>
              </div>
            </div>
            
            {/* QR Code */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-white rounded-lg p-2 border-2 border-blue-300 shadow-md mb-2">
                <svg viewBox="0 0 100 100" className="w-full h-full">
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
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <QrCode className="w-4 h-4" />
                <span>Escanea para verificar</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600 mb-2">
            Este documento tiene validez oficial según Ley N° 28044 - Ley General de Educación
          </p>
          <p className="text-xs text-gray-500">
            Certificado digital emitido el {folder.year}-12-15 | Sistema CertiChain
          </p>
        </div>
      </Card>

      {/* Action Buttons */}
      <Card className="p-6 bg-white shadow-md">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-700">Certificado listo para descargar</span>
          </div>
          <div className="flex gap-3">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 h-12 px-6">
              <Download className="w-5 h-5" />
              Descargar PDF
            </Button>
            <Button variant="outline" className="gap-2 h-12 px-6">
              <QrCode className="w-5 h-5" />
              Ver QR Grande
            </Button>
          </div>
        </div>
      </Card>

      {/* Instructions */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="text-blue-900 mb-3">¿Cómo usar este certificado?</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
            <span><strong>Para trámites físicos:</strong> Descarga el PDF y preséntalo impreso</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
            <span><strong>Para trámites digitales:</strong> Envía el PDF por correo o WhatsApp</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
            <span><strong>Para verificación:</strong> Permite escanear el código QR con cualquier celular</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}