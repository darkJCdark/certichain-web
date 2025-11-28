import { useState } from 'react';
import { Upload, FileCheck, CheckCircle, AlertCircle, X } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Alert, AlertDescription } from './ui/alert';

interface UploadedFile {
  id: string;
  fileName: string;
  studentName: string;
  studentDNI: string;
  grade: string;
  year: string;
  status: 'processing' | 'success' | 'error';
}

export function DocumentUpload() {
  const [dragActive, setDragActive] = useState(false);
  const [studentDNI, setStudentDNI] = useState('');
  const [grade, setGrade] = useState('');
  const [year, setYear] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files: FileList) => {
    // Simulate file upload
    const newFile: UploadedFile = {
      id: Date.now().toString(),
      fileName: files[0].name,
      studentName: 'María García López',
      studentDNI: studentDNI,
      grade: grade,
      year: year,
      status: 'processing'
    };
    
    setUploadedFiles(prev => [newFile, ...prev]);

    // Simulate processing
    setTimeout(() => {
      setUploadedFiles(prev => 
        prev.map(f => f.id === newFile.id ? { ...f, status: 'success' } : f)
      );
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-green-900 mb-2">Subir Certificados</h2>
        <p className="text-gray-600">Digitaliza y organiza certificados automáticamente por grado</p>
      </div>

      {/* Upload Form */}
      <Card className="p-8 bg-white">
        <h3 className="text-green-900 mb-6">Información del Certificado</h3>
        
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block mb-2 text-gray-700">DNI del Estudiante *</label>
            <Input
              type="text"
              placeholder="8 dígitos"
              value={studentDNI}
              onChange={(e) => setStudentDNI(e.target.value.replace(/\D/g, '').slice(0, 8))}
              maxLength={8}
              className="h-11"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700">Grado *</label>
            <select 
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full h-11 px-3 rounded-md border border-gray-300 bg-white"
            >
              <option value="">Seleccionar...</option>
              <option value="1ro-primaria">1° Primaria</option>
              <option value="2do-primaria">2° Primaria</option>
              <option value="3ro-primaria">3° Primaria</option>
              <option value="4to-primaria">4° Primaria</option>
              <option value="5to-primaria">5° Primaria</option>
              <option value="6to-primaria">6° Primaria</option>
              <option value="1ro-secundaria">1° Secundaria</option>
              <option value="2do-secundaria">2° Secundaria</option>
              <option value="3ro-secundaria">3° Secundaria</option>
              <option value="4to-secundaria">4° Secundaria</option>
              <option value="5to-secundaria">5° Secundaria</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-gray-700">Año *</label>
            <Input
              type="text"
              placeholder="Ej: 2024"
              value={year}
              onChange={(e) => setYear(e.target.value.replace(/\D/g, '').slice(0, 4))}
              maxLength={4}
              className="h-11"
            />
          </div>
        </div>

        {/* Drag and Drop Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
            dragActive 
              ? 'border-green-500 bg-green-50' 
              : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-green-600" />
          </div>
          <h4 className="text-gray-900 mb-2">Arrastra el certificado aquí</h4>
          <p className="text-gray-600 mb-4">o haz clic para seleccionar</p>
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white"
            disabled={!studentDNI || !grade || !year}
          >
            Seleccionar Archivo
          </Button>
          <p className="text-xs text-gray-500 mt-4">
            Formatos: PDF, JPG, PNG | Máximo: 25 MB
          </p>
        </div>

        <Alert className="mt-6 bg-blue-50 border-blue-200">
          <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <AlertDescription className="text-blue-900">
            <strong>Organización automática:</strong> El certificado se guardará automáticamente en la carpeta del grado correspondiente del estudiante.
          </AlertDescription>
        </Alert>
      </Card>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <Card className="p-6 bg-white">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-green-900">Archivos Subidos</h3>
            <span className="text-sm text-gray-600">{uploadedFiles.length} archivo(s)</span>
          </div>

          <div className="space-y-4">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      file.status === 'success' ? 'bg-green-100' :
                      file.status === 'processing' ? 'bg-blue-100' : 'bg-red-100'
                    }`}>
                      {file.status === 'success' ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : file.status === 'processing' ? (
                        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <AlertCircle className="w-6 h-6 text-red-600" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <FileCheck className="w-5 h-5 text-gray-400" />
                        <h4 className="text-gray-900">{file.fileName}</h4>
                      </div>
                      
                      <div className="grid sm:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Estudiante</p>
                          <p className="text-gray-900">{file.studentName}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Grado</p>
                          <p className="text-gray-900">{file.grade}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Año</p>
                          <p className="text-gray-900">{file.year}</p>
                        </div>
                      </div>

                      <div className="mt-3">
                        {file.status === 'success' && (
                          <div className="flex items-center gap-2 text-sm text-green-700">
                            <CheckCircle className="w-4 h-4" />
                            <span>Certificado guardado en carpeta "{file.grade}" - Blockchain verificado</span>
                          </div>
                        )}
                        {file.status === 'processing' && (
                          <div className="flex items-center gap-2 text-sm text-blue-700">
                            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            <span>Procesando y organizando en carpeta...</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Bulk Upload Info */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <h3 className="text-green-900 mb-4">Carga Masiva de Certificados</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-gray-900 mb-3">Proceso Automatizado</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2"></div>
                <span>El sistema detecta automáticamente el estudiante por DNI</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2"></div>
                <span>Los certificados se organizan automáticamente por grado</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2"></div>
                <span>Registro inmediato en blockchain para autenticidad</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-gray-900 mb-3">Validación SUNEDU</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2"></div>
                <span>Validación automática con base de datos SUNEDU</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2"></div>
                <span>Verificación de planes de estudio vigentes</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2"></div>
                <span>Certificación oficial del Ministerio de Educación</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
