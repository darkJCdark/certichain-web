import { useState } from 'react';
import { ArrowLeft, FileCheck, HelpCircle, Folder, Download, QrCode, AlertCircle, CheckCircle2, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { FolderView } from './FolderView';
import { HelpWidget } from './HelpWidget';
import { toast } from 'sonner@2.0.3';

interface GradeFolder {
  grade: string;
  level: string;
  certificateCount: number;
  year: string;
}

// Mock data para validación
const mockStudentsDatabase = [
  { 
    studentDNI: '78945612', 
    guardianDNI: '45678912', 
    studentName: 'María García López',
    folders: [
      { grade: '1° Primaria', level: 'Primaria', certificateCount: 1, year: '2018' },
      { grade: '2° Primaria', level: 'Primaria', certificateCount: 1, year: '2019' },
      { grade: '3° Primaria', level: 'Primaria', certificateCount: 1, year: '2020' },
      { grade: '4° Primaria', level: 'Primaria', certificateCount: 1, year: '2021' },
      { grade: '5° Primaria', level: 'Primaria', certificateCount: 1, year: '2022' },
      { grade: '6° Primaria', level: 'Primaria', certificateCount: 1, year: '2023' },
      { grade: '1° Secundaria', level: 'Secundaria', certificateCount: 1, year: '2024' },
    ]
  },
  { 
    studentDNI: '78945613', 
    guardianDNI: '45678913', 
    studentName: 'Juan Pérez Sánchez',
    folders: [
      { grade: '1° Primaria', level: 'Primaria', certificateCount: 1, year: '2019' },
      { grade: '2° Primaria', level: 'Primaria', certificateCount: 1, year: '2020' },
      { grade: '3° Primaria', level: 'Primaria', certificateCount: 1, year: '2021' },
      { grade: '4° Primaria', level: 'Primaria', certificateCount: 1, year: '2022' },
      { grade: '5° Primaria', level: 'Primaria', certificateCount: 1, year: '2023' },
    ]
  }
];

export function ParentPortal({ onLogout }: { onLogout: () => void }) {
  const [step, setStep] = useState<'search' | 'folders' | 'folder-detail'>('search');
  const [studentDNI, setStudentDNI] = useState('');
  const [guardianDNI, setGuardianDNI] = useState('');
  const [studentName, setStudentName] = useState('');
  const [folders, setFolders] = useState<GradeFolder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<GradeFolder | null>(null);
  const [searching, setSearching] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [error, setError] = useState('');
  const [studentDNITouched, setStudentDNITouched] = useState(false);
  const [guardianDNITouched, setGuardianDNITouched] = useState(false);

  // Validación de formato DNI
  const isValidDNIFormat = (dni: string) => {
    return dni.length === 8 && /^\d+$/.test(dni);
  };

  // Validación en tiempo real
  const validateStudentDNI = (dni: string) => {
    if (dni.length === 0) return null;
    if (!isValidDNIFormat(dni) && dni.length === 8) {
      return 'El DNI debe contener solo números';
    }
    return null;
  };

  const validateGuardianDNI = (dni: string) => {
    if (dni.length === 0) return null;
    if (!isValidDNIFormat(dni) && dni.length === 8) {
      return 'El DNI debe contener solo números';
    }
    return null;
  };

  const handleStudentDNIChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, '').slice(0, 8);
    setStudentDNI(cleaned);
    setError('');
    if (!studentDNITouched && cleaned.length > 0) {
      setStudentDNITouched(true);
    }
  };

  const handleGuardianDNIChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, '').slice(0, 8);
    setGuardianDNI(cleaned);
    setError('');
    if (!guardianDNITouched && cleaned.length > 0) {
      setGuardianDNITouched(true);
    }
  };

  const handleSearch = () => {
    setSearching(true);
    setError('');
    
    // Simular tiempo de validación en servidor
    setTimeout(() => {
      // Buscar en la base de datos mock
      const match = mockStudentsDatabase.find(
        record => record.studentDNI === studentDNI && record.guardianDNI === guardianDNI
      );

      if (match) {
        // Acceso exitoso
        setStudentName(match.studentName);
        setFolders(match.folders);
        setStep('folders');
        toast.success('Acceso autorizado correctamente');
      } else {
        // Verificar si el estudiante existe pero el apoderado no coincide
        const studentExists = mockStudentsDatabase.find(record => record.studentDNI === studentDNI);
        
        if (studentExists) {
          setError('El DNI del apoderado no está vinculado con este estudiante. Verifique los datos e intente nuevamente.');
          toast.error('DNI de apoderado no autorizado');
        } else {
          setError('Uno de los DNIs ingresados no es válido o no está registrado en el sistema. Verifique los datos e intente nuevamente.');
          toast.error('DNIs no encontrados');
        }
      }
      
      setSearching(false);
    }, 1500);
  };

  const handleOpenFolder = (folder: GradeFolder) => {
    setSelectedFolder(folder);
    setStep('folder-detail');
  };

  const handleBack = () => {
    if (step === 'folder-detail') {
      setStep('folders');
      setSelectedFolder(null);
    } else {
      setStep('search');
      setFolders([]);
      setStudentDNI('');
      setGuardianDNI('');
      setStudentName('');
      setError('');
      setStudentDNITouched(false);
      setGuardianDNITouched(false);
    }
  };

  const studentDNIError = studentDNITouched ? validateStudentDNI(studentDNI) : null;
  const guardianDNIError = guardianDNITouched ? validateGuardianDNI(guardianDNI) : null;
  const isFormValid = isValidDNIFormat(studentDNI) && isValidDNIFormat(guardianDNI) && !error;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <FileCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-blue-900">Portal de Padres</h1>
                <p className="text-sm text-gray-600">Certificados Escolares</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={() => setShowHelp(true)}
                className="gap-2"
              >
                <HelpCircle className="w-5 h-5" />
                <span className="hidden sm:inline">Ayuda</span>
              </Button>
              <Button
                variant="outline"
                onClick={onLogout}
              >
                Salir
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Search Form */}
        {step === 'search' && (
          <div>
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileCheck className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-blue-900 mb-3">Ver Certificados</h2>
              <p className="text-gray-700">
                Ingresa los datos para ver todos los certificados del estudiante
              </p>
            </div>

            <Card className="p-8 bg-white shadow-lg">
              <div className="space-y-6">
                <div>
                  <label className="block mb-3 text-blue-900">
                    DNI del Estudiante *
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Ingresa 8 dígitos"
                      value={studentDNI}
                      onChange={handleStudentDNIChange}
                      className="h-14 text-lg pl-12"
                      maxLength={8}
                    />
                    <svg className="w-6 h-6 text-gray-400 absolute left-3 top-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Ejemplo: 78945612</p>
                  {studentDNIError && <p className="text-sm text-red-500 mt-2">{studentDNIError}</p>}
                </div>

                <div>
                  <label className="block mb-3 text-blue-900">
                    DNI del Padre/Apoderado *
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Ingresa 8 dígitos"
                      value={guardianDNI}
                      onChange={handleGuardianDNIChange}
                      className="h-14 text-lg pl-12"
                      maxLength={8}
                    />
                    <svg className="w-6 h-6 text-gray-400 absolute left-3 top-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Ejemplo: 45678912</p>
                  {guardianDNIError && <p className="text-sm text-red-500 mt-2">{guardianDNIError}</p>}
                </div>

                {/* Error Message */}
                {error && (
                  <Alert className="bg-red-50 border-red-300">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <AlertDescription className="text-red-900">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <Alert className="bg-blue-50 border-blue-200">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <AlertDescription className="text-blue-900">
                    Los datos ingresados son validados de forma segura. Solo los apoderados registrados pueden ver los certificados.
                  </AlertDescription>
                </Alert>

                <Button
                  className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white text-lg gap-3"
                  onClick={handleSearch}
                  disabled={!isFormValid || searching}
                >
                  {searching ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Buscando...
                    </>
                  ) : (
                    <>
                      <FileCheck className="w-6 h-6" />
                      Ver Certificados
                    </>
                  )}
                </Button>
              </div>
            </Card>

            <div className="mt-6 bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-blue-900 mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                ¿Necesitas ayuda?
              </h3>
              <p className="text-gray-700 mb-4">
                Si tienes problemas para ver tus certificados o necesitas asistencia:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <Button variant="outline" className="h-12 gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Mesa de Ayuda
                </Button>
                <Button variant="outline" className="h-12 gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Chat en Vivo
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Folders View */}
        {step === 'folders' && (
          <div>
            <Button
              variant="ghost"
              onClick={handleBack}
              className="mb-6 gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Volver
            </Button>

            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Folder className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-blue-900 mb-2">Certificados de {studentName}</h2>
              <p className="text-gray-600">DNI: {studentDNI}</p>
              <p className="text-gray-700 mt-2">Selecciona un grado para ver los certificados</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {folders.map((folder, index) => (
                <Card
                  key={index}
                  className="p-6 bg-white shadow-md hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-blue-300"
                  onClick={() => handleOpenFolder(folder)}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Folder className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-blue-900 mb-1">{folder.grade}</h3>
                      <p className="text-sm text-gray-600 mb-2">Año {folder.year}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <FileCheck className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">
                          {folder.certificateCount} certificado{folder.certificateCount > 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                    <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Card>
              ))}
            </div>

            <Alert className="mt-6 bg-green-50 border-green-200">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <AlertDescription className="text-green-900">
                Todos los certificados están verificados con blockchain. Haz clic en cualquier carpeta para ver y descargar los certificados.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Folder Detail View */}
        {step === 'folder-detail' && selectedFolder && (
          <div>
            <Button
              variant="ghost"
              onClick={handleBack}
              className="mb-6 gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Volver a carpetas
            </Button>

            <FolderView 
              folder={selectedFolder}
              studentName={studentName}
              studentDNI={studentDNI}
            />
          </div>
        )}
      </main>

      {/* Help Widget */}
      {showHelp && <HelpWidget onClose={() => setShowHelp(false)} />}

      {/* Floating Help Button */}
      <button
        onClick={() => setShowHelp(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110"
      >
        <HelpCircle className="w-6 h-6" />
      </button>
    </div>
  );
}