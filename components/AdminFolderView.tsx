import { ArrowLeft, Folder, FileCheck, Download, Upload, Edit, CheckCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { useState } from 'react';
import { CertificateDetail } from './CertificateDetail';
import { CertificateEdit } from './CertificateEdit';
import { CertificateDelete } from './CertificateDelete';

interface Student {
  id: string;
  name: string;
  dni: string;
  currentGrade: string;
  totalCertificates: number;
  lastUpdate: string;
}

interface GradeFolder {
  grade: string;
  year: string;
  status: 'complete' | 'partial' | 'missing';
  certificateCount: number;
}

interface Certificate {
  id: string;
  studentName: string;
  studentDNI: string;
  grade: string;
  year: string;
  institution: string;
  institutionCode: string;
  teacher: string;
  teacherCode: string;
  issueDate: string;
  transactionHash: string;
  ipfsHash: string;
  status: 'verified' | 'pending';
  grades: Array<{
    subject: string;
    grade: string;
    credits: number;
    period: string;
  }>;
}

const mockFolders: GradeFolder[] = [
  { grade: '1° Primaria', year: '2018', status: 'complete', certificateCount: 1 },
  { grade: '2° Primaria', year: '2019', status: 'complete', certificateCount: 1 },
  { grade: '3° Primaria', year: '2020', status: 'complete', certificateCount: 1 },
  { grade: '4° Primaria', year: '2021', status: 'complete', certificateCount: 1 },
  { grade: '5° Primaria', year: '2022', status: 'complete', certificateCount: 1 },
  { grade: '6° Primaria', year: '2023', status: 'complete', certificateCount: 1 },
  { grade: '1° Secundaria', year: '2024', status: 'partial', certificateCount: 1 },
  { grade: '2° Secundaria', year: '2025', status: 'missing', certificateCount: 0 },
];

// Mock certificate data
const mockCertificate: Certificate = {
  id: 'CERT-2024-001234',
  studentName: 'María García López',
  studentDNI: '78945612',
  grade: '1° Primaria',
  year: '2018',
  institution: 'I.E. San José',
  institutionCode: 'IE-123456',
  teacher: 'Prof. Juan Pérez Sánchez',
  teacherCode: 'DOC-78945',
  issueDate: '15 de marzo de 2024',
  transactionHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
  ipfsHash: 'QmX7Kd9p2Y3mR5nW8zB4vC6tA1hJ9sL7fG3eD2cN5bM8qP',
  status: 'verified',
  grades: [
    { subject: 'Matemática', grade: 'A', credits: 4, period: 'Anual' },
    { subject: 'Comunicación', grade: 'A', credits: 4, period: 'Anual' },
    { subject: 'Ciencia y Tecnología', grade: 'B', credits: 3, period: 'Anual' },
    { subject: 'Ciencias Sociales', grade: 'A', credits: 3, period: 'Anual' },
    { subject: 'Educación Física', grade: 'A', credits: 2, period: 'Anual' },
    { subject: 'Arte y Cultura', grade: 'B', credits: 2, period: 'Anual' },
    { subject: 'Inglés', grade: 'A', credits: 3, period: 'Anual' },
    { subject: 'Educación para el Trabajo', grade: 'A', credits: 2, period: 'Anual' },
  ]
};

interface Props {
  student: Student;
  onBack: () => void;
}

type ViewMode = 'folders' | 'detail' | 'edit' | 'delete';

export function AdminFolderView({ student, onBack }: Props) {
  const [viewMode, setViewMode] = useState<ViewMode>('folders');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  const handleViewCertificate = (folder: GradeFolder) => {
    if (folder.status !== 'missing') {
      // Create certificate with folder data
      const cert = {
        ...mockCertificate,
        grade: folder.grade,
        year: folder.year,
        studentName: student.name,
        studentDNI: student.dni
      };
      setSelectedCertificate(cert);
      setViewMode('detail');
    }
  };

  const handleEditCertificate = () => {
    setViewMode('edit');
  };

  const handleDeleteCertificate = () => {
    setViewMode('delete');
  };

  const handleSaveCertificate = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setViewMode('detail');
  };

  const handleConfirmDelete = () => {
    setViewMode('folders');
    setSelectedCertificate(null);
  };

  const handleBackToFolders = () => {
    setViewMode('folders');
    setSelectedCertificate(null);
  };

  // Certificate Detail View
  if (viewMode === 'detail' && selectedCertificate) {
    return (
      <CertificateDetail
        certificate={selectedCertificate}
        onBack={handleBackToFolders}
        onEdit={handleEditCertificate}
        onDelete={handleDeleteCertificate}
      />
    );
  }

  // Certificate Edit View
  if (viewMode === 'edit' && selectedCertificate) {
    return (
      <CertificateEdit
        certificate={selectedCertificate}
        onBack={() => setViewMode('detail')}
        onSave={handleSaveCertificate}
      />
    );
  }

  // Certificate Delete View
  if (viewMode === 'delete' && selectedCertificate) {
    return (
      <CertificateDelete
        certificate={selectedCertificate}
        onBack={() => setViewMode('detail')}
        onConfirmDelete={handleConfirmDelete}
      />
    );
  }

  // Folders View (default)
  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={onBack}
        className="gap-2"
      >
        <ArrowLeft className="w-5 h-5" />
        Volver a estudiantes
      </Button>

      {/* Student Header */}
      <Card className="p-6 bg-white">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-700 text-xl">{student.name.charAt(0)}</span>
            </div>
            <div>
              <h2 className="text-green-900 mb-1">{student.name}</h2>
              <p className="text-gray-600">DNI: {student.dni}</p>
              <p className="text-sm text-gray-600 mt-1">Grado Actual: {student.currentGrade}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Edit className="w-4 h-4" />
              Editar Datos
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white gap-2">
              <Upload className="w-4 h-4" />
              Subir Certificado
            </Button>
          </div>
        </div>
      </Card>

      {/* Folders Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-green-900">Certificados por Grado</h3>
          <span className="text-sm text-gray-600">
            {mockFolders.filter(f => f.status === 'complete').length} de {mockFolders.length} completos
          </span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockFolders.map((folder, index) => (
            <Card
              key={index}
              className={`p-6 bg-white shadow-md hover:shadow-lg transition-all cursor-pointer border-2 ${
                folder.status === 'complete' 
                  ? 'border-transparent hover:border-green-300'
                  : folder.status === 'partial'
                  ? 'border-yellow-200 hover:border-yellow-400'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  folder.status === 'complete'
                    ? 'bg-gradient-to-br from-green-100 to-blue-100'
                    : folder.status === 'partial'
                    ? 'bg-yellow-100'
                    : 'bg-gray-100'
                }`}>
                  <Folder className={`w-7 h-7 ${
                    folder.status === 'complete'
                      ? 'text-green-600'
                      : folder.status === 'partial'
                      ? 'text-yellow-600'
                      : 'text-gray-400'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-gray-900 mb-1">{folder.grade}</h4>
                  <p className="text-sm text-gray-600 mb-2">Año {folder.year}</p>
                  
                  {folder.status === 'complete' && (
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-green-700">Completo</span>
                    </div>
                  )}
                  
                  {folder.status === 'partial' && (
                    <div className="flex items-center gap-2 text-sm">
                      <svg className="w-4 h-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-yellow-700">En proceso</span>
                    </div>
                  )}
                  
                  {folder.status === 'missing' && (
                    <div className="flex items-center gap-2 text-sm">
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span className="text-gray-500">Falta cargar</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {folder.certificateCount} archivo{folder.certificateCount !== 1 ? 's' : ''}
                </span>
                {folder.status === 'complete' && (
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="gap-1 h-8 text-xs" onClick={() => handleViewCertificate(folder)}>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Ver
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1 h-8 text-xs text-blue-700" onClick={handleEditCertificate}>
                      <Edit className="w-3 h-3" />
                      Editar
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1 h-8 text-xs text-red-700" onClick={handleDeleteCertificate}>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Eliminar
                    </Button>
                  </div>
                )}
                {folder.status === 'partial' && (
                  <Button variant="ghost" size="sm" className="gap-1 h-8 text-xs text-yellow-700">
                    <Edit className="w-3 h-3" />
                    Completar
                  </Button>
                )}
                {folder.status === 'missing' && (
                  <Button variant="ghost" size="sm" className="gap-1 h-8 text-xs text-gray-600">
                    <Upload className="w-3 h-3" />
                    Subir
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Actions */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <h3 className="text-green-900 mb-4">Acciones Disponibles</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 bg-white rounded-lg hover:shadow-md transition-shadow text-left">
            <Upload className="w-7 h-7 text-green-600 mb-2" />
            <p className="text-gray-900 text-sm">Subir Certificado</p>
            <p className="text-xs text-gray-600 mt-1">Nuevo archivo</p>
          </button>
          <button className="p-4 bg-white rounded-lg hover:shadow-md transition-shadow text-left">
            <Edit className="w-7 h-7 text-blue-600 mb-2" />
            <p className="text-gray-900 text-sm">Editar Información</p>
            <p className="text-xs text-gray-600 mt-1">Datos del estudiante</p>
          </button>
          <button className="p-4 bg-white rounded-lg hover:shadow-md transition-shadow text-left">
            <CheckCircle className="w-7 h-7 text-purple-600 mb-2" />
            <p className="text-gray-900 text-sm">Validar SUNEDU</p>
            <p className="text-xs text-gray-600 mt-1">Verificación oficial</p>
          </button>
          <button className="p-4 bg-white rounded-lg hover:shadow-md transition-shadow text-left">
            <Download className="w-7 h-7 text-orange-600 mb-2" />
            <p className="text-gray-900 text-sm">Exportar Todo</p>
            <p className="text-xs text-gray-600 mt-1">Historial completo</p>
          </button>
        </div>
      </Card>

      {/* Status Summary */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 bg-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Completos</p>
              <p className="text-green-900">
                {mockFolders.filter(f => f.status === 'complete').length} grados
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">En Proceso</p>
              <p className="text-yellow-900">
                {mockFolders.filter(f => f.status === 'partial').length} grados
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Faltantes</p>
              <p className="text-gray-900">
                {mockFolders.filter(f => f.status === 'missing').length} grados
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}