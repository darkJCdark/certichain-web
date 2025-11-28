import { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Alert, AlertDescription } from './ui/alert';

interface DigitizedDocument {
  id: string;
  fileName: string;
  year: string;
  grade: string;
  students: number;
  status: 'processing' | 'completed' | 'error';
  uploadDate: string;
}

const mockDocuments: DigitizedDocument[] = [
  {
    id: 'DOC-001',
    fileName: 'Acta_1985_5to_Secundaria.pdf',
    year: '1985',
    grade: '5to Secundaria',
    students: 45,
    status: 'completed',
    uploadDate: '2024-11-20'
  },
  {
    id: 'DOC-002',
    fileName: 'Registro_1990_3ro_Primaria.pdf',
    year: '1990',
    grade: '3ro Primaria',
    students: 38,
    status: 'processing',
    uploadDate: '2024-11-22'
  }
];

export function DocumentDigitization() {
  const [documents, setDocuments] = useState<DigitizedDocument[]>(mockDocuments);
  const [dragActive, setDragActive] = useState(false);
  const [year, setYear] = useState('');
  const [grade, setGrade] = useState('');

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
      // Handle file upload
      console.log('Files dropped:', e.dataTransfer.files);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-green-900 mb-2">Digitalización de Archivos Históricos</h2>
        <p className="text-gray-600">Digitaliza y registra actas y certificados desde 1960 en adelante</p>
      </div>

      {/* Upload Section */}
      <Card className="p-8 bg-white">
        <h3 className="text-green-900 mb-6">Subir Documentos</h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-2 text-gray-700">Año del Documento *</label>
            <Input
              type="text"
              placeholder="Ej: 1985"
              value={year}
              onChange={(e) => setYear(e.target.value.replace(/\D/g, '').slice(0, 4))}
              maxLength={4}
              className="h-11"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700">Grado/Nivel *</label>
            <select className="w-full h-11 px-3 rounded-md border border-gray-300 bg-white">
              <option value="">Seleccionar...</option>
              <option value="1ro-primaria">1ro Primaria</option>
              <option value="2do-primaria">2do Primaria</option>
              <option value="3ro-primaria">3ro Primaria</option>
              <option value="4to-primaria">4to Primaria</option>
              <option value="5to-primaria">5to Primaria</option>
              <option value="6to-primaria">6to Primaria</option>
              <option value="1ro-secundaria">1ro Secundaria</option>
              <option value="2do-secundaria">2do Secundaria</option>
              <option value="3ro-secundaria">3ro Secundaria</option>
              <option value="4to-secundaria">4to Secundaria</option>
              <option value="5to-secundaria">5to Secundaria</option>
            </select>
          </div>
        </div>

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
          <h4 className="text-gray-900 mb-2">Arrastra archivos aquí</h4>
          <p className="text-gray-600 mb-4">o haz clic para seleccionar</p>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            Seleccionar Archivos
          </Button>
          <p className="text-xs text-gray-500 mt-4">
            Formatos soportados: PDF, JPG, PNG | Tamaño máximo: 50 MB por archivo
          </p>
        </div>

        <Alert className="mt-6 bg-blue-50 border-blue-200">
          <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <AlertDescription className="text-blue-900">
            <strong>Recomendación:</strong> Escanea los documentos a 300 DPI en formato PDF para mejor calidad y legibilidad.
            Los archivos serán procesados automáticamente con OCR para extraer la información.
          </AlertDescription>
        </Alert>
      </Card>

      {/* Processing Status */}
      <Card className="p-6 bg-white">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-green-900">Documentos Digitalizados</h3>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Completado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-gray-600">Procesando</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-600">Error</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {documents.map((doc) => (
            <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    doc.status === 'completed' ? 'bg-green-100' :
                    doc.status === 'processing' ? 'bg-blue-100' : 'bg-red-100'
                  }`}>
                    {doc.status === 'completed' ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : doc.status === 'processing' ? (
                      <Loader className="w-6 h-6 text-blue-600 animate-spin" />
                    ) : (
                      <AlertCircle className="w-6 h-6 text-red-600" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <h4 className="text-gray-900">{doc.fileName}</h4>
                    </div>
                    
                    <div className="grid sm:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Año</p>
                        <p className="text-gray-900">{doc.year}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Grado</p>
                        <p className="text-gray-900">{doc.grade}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Estudiantes</p>
                        <p className="text-gray-900">{doc.students}</p>
                      </div>
                    </div>

                    <div className="mt-3">
                      {doc.status === 'completed' && (
                        <div className="flex items-center gap-2 text-sm text-green-700">
                          <CheckCircle className="w-4 h-4" />
                          <span>Digitalización completada el {doc.uploadDate}</span>
                        </div>
                      )}
                      {doc.status === 'processing' && (
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                          </div>
                          <span className="text-sm text-gray-600">65%</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {doc.status === 'completed' && (
                    <>
                      <Button variant="outline" size="sm">Ver Detalles</Button>
                      <Button variant="outline" size="sm">Editar</Button>
                    </>
                  )}
                  {doc.status === 'processing' && (
                    <Button variant="outline" size="sm">Cancelar</Button>
                  )}
                  {doc.status === 'error' && (
                    <Button className="bg-red-600 hover:bg-red-700 text-white" size="sm">
                      Reintentar
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Guidelines */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <h3 className="text-green-900 mb-4">Guía de Digitalización</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-gray-900 mb-3">Preparación de Documentos</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2"></div>
                <span>Asegúrate que el documento esté limpio y legible</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2"></div>
                <span>Escanea en resolución de 300 DPI o superior</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2"></div>
                <span>Usa formato PDF para múltiples páginas</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-gray-900 mb-3">Proceso Automatizado</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2"></div>
                <span>OCR automático extrae texto e información</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2"></div>
                <span>Validación cruzada con base de datos existente</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2"></div>
                <span>Registro en blockchain para autenticidad permanente</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
