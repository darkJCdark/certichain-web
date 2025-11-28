import { useState } from 'react';
import { Search, Eye, Folder, FileCheck, Edit, CheckCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { AdminFolderView } from './AdminFolderView';

interface Student {
  id: string;
  name: string;
  dni: string;
  currentGrade: string;
  totalCertificates: number;
  lastUpdate: string;
}

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'María García López',
    dni: '78945612',
    currentGrade: '1° Secundaria',
    totalCertificates: 7,
    lastUpdate: '2024-11-15'
  },
  {
    id: '2',
    name: 'Juan Pérez Sánchez',
    dni: '78945613',
    currentGrade: '5° Primaria',
    totalCertificates: 5,
    lastUpdate: '2024-11-20'
  },
  {
    id: '3',
    name: 'Ana Rodríguez Torres',
    dni: '78945614',
    currentGrade: '3° Secundaria',
    totalCertificates: 9,
    lastUpdate: '2024-11-18'
  },
  {
    id: '4',
    name: 'Carlos Méndez Silva',
    dni: '78945615',
    currentGrade: '2° Primaria',
    totalCertificates: 2,
    lastUpdate: '2024-11-22'
  },
];

export function StudentManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showFolders, setShowFolders] = useState(false);

  const filteredStudents = mockStudents.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.dni.includes(searchTerm)
  );

  const handleViewCertificates = (student: Student) => {
    setSelectedStudent(student);
    setShowFolders(true);
  };

  const handleBack = () => {
    setShowFolders(false);
    setSelectedStudent(null);
  };

  if (showFolders && selectedStudent) {
    return <AdminFolderView student={selectedStudent} onBack={handleBack} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-green-900 mb-2">Gestión de Estudiantes</h2>
        <p className="text-gray-600">Busca estudiantes y administra sus certificados</p>
      </div>

      {/* Search */}
      <Card className="p-6 bg-white">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
            <Input
              type="text"
              placeholder="Buscar por nombre o DNI del estudiante..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-11 pl-10"
            />
          </div>
          <Button className="bg-green-600 hover:bg-green-700 text-white h-11 px-6">
            Buscar
          </Button>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6 bg-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Estudiantes</p>
              <p className="text-green-900">{mockStudents.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Certificados Emitidos</p>
              <p className="text-green-900">23</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileCheck className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Actualizados Hoy</p>
              <p className="text-green-900">2</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Por Digitalizar</p>
              <p className="text-green-900">12</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </Card>
      </div>

      {/* Students List */}
      <Card className="p-6 bg-white">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-green-900">Lista de Estudiantes</h3>
          <span className="text-sm text-gray-600">
            {filteredStudents.length} estudiante{filteredStudents.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 text-gray-700">Estudiante</th>
                <th className="text-left py-3 px-4 text-gray-700">DNI</th>
                <th className="text-left py-3 px-4 text-gray-700">Grado Actual</th>
                <th className="text-center py-3 px-4 text-gray-700">Certificados</th>
                <th className="text-left py-3 px-4 text-gray-700">Última Actualización</th>
                <th className="text-right py-3 px-4 text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-700">{student.name.charAt(0)}</span>
                      </div>
                      <span className="text-gray-900">{student.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700 font-mono text-sm">{student.dni}</td>
                  <td className="py-4 px-4 text-gray-700">{student.currentGrade}</td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      <FileCheck className="w-4 h-4" />
                      {student.totalCertificates}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{student.lastUpdate}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-1"
                        onClick={() => handleViewCertificates(student)}
                      >
                        <Folder className="w-4 h-4" />
                        Ver Certificados
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Edit className="w-4 h-4" />
                        Editar
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <h3 className="text-green-900 mb-4">Acciones Rápidas</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <button className="p-4 bg-white rounded-lg hover:shadow-md transition-shadow text-left">
            <svg className="w-8 h-8 text-green-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            <p className="text-gray-900">Registrar Estudiante</p>
            <p className="text-xs text-gray-600 mt-1">Nuevo alumno</p>
          </button>
          <button className="p-4 bg-white rounded-lg hover:shadow-md transition-shadow text-left">
            <svg className="w-8 h-8 text-blue-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-gray-900">Subir Certificados</p>
            <p className="text-xs text-gray-600 mt-1">Carga masiva</p>
          </button>
          <button className="p-4 bg-white rounded-lg hover:shadow-md transition-shadow text-left">
            <svg className="w-8 h-8 text-purple-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-900">Generar Reporte</p>
            <p className="text-xs text-gray-600 mt-1">Estadísticas</p>
          </button>
        </div>
      </Card>
    </div>
  );
}
