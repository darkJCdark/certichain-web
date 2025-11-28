import { useState } from 'react';
import { FileSpreadsheet, Upload, CheckCircle, AlertCircle, Download } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';

interface UploadResult {
  id: string;
  fileName: string;
  studentsProcessed: number;
  status: 'processing' | 'success' | 'error';
  errors?: string[];
}

export function ExcelUpload() {
  const [dragActive, setDragActive] = useState(false);
  const [uploads, setUploads] = useState<UploadResult[]>([]);

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
    const newUpload: UploadResult = {
      id: Date.now().toString(),
      fileName: files[0].name,
      studentsProcessed: 0,
      status: 'processing'
    };
    
    setUploads(prev => [newUpload, ...prev]);

    // Simulate processing
    setTimeout(() => {
      setUploads(prev => 
        prev.map(u => u.id === newUpload.id ? { ...u, studentsProcessed: 45, status: 'success' } : u)
      );
    }, 2000);
  };

  const downloadTemplate = () => {
    alert('Descargando plantilla de Excel...');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-green-900 mb-2">Subir Notas desde Excel</h2>
        <p className="text-gray-600">Carga masiva de calificaciones para múltiples estudiantes</p>
      </div>

      {/* Download Template */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex-1">
            <h3 className="text-green-900 mb-2">Plantilla de Excel</h3>
            <p className="text-sm text-gray-700 mb-4">
              Descarga la plantilla oficial para asegurar que tus datos se carguen correctamente. 
              La plantilla incluye las columnas requeridas y ejemplos de formato.
            </p>
            <ul className="space-y-1 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                <span>Columnas: DNI, Nombre, Grado, Año, Materias y Calificaciones</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                <span>Formato: .xlsx o .xls</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                <span>Máximo: 500 estudiantes por archivo</span>
              </li>
            </ul>
          </div>
          <Button
            onClick={downloadTemplate}
            className="bg-green-600 hover:bg-green-700 text-white gap-2 h-11"
          >
            <Download className="w-5 h-5" />
            Descargar Plantilla
          </Button>
        </div>
      </Card>

      {/* Upload Area */}
      <Card className="p-8 bg-white">
        <h3 className="text-green-900 mb-6">Cargar Archivo Excel</h3>
        
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
            <FileSpreadsheet className="w-8 h-8 text-green-600" />
          </div>
          <h4 className="text-gray-900 mb-2">Arrastra tu archivo Excel aquí</h4>
          <p className="text-gray-600 mb-4">o haz clic para seleccionar</p>
          <Button className="bg-green-600 hover:bg-green-700 text-white gap-2">
            <Upload className="w-5 h-5" />
            Seleccionar Archivo
          </Button>
          <p className="text-xs text-gray-500 mt-4">
            Formatos aceptados: .xlsx, .xls | Tamaño máximo: 10 MB
          </p>
        </div>

        <Alert className="mt-6 bg-blue-50 border-blue-200">
          <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <AlertDescription className="text-blue-900">
            <strong>Proceso automático:</strong> El sistema validará los datos, creará los certificados automáticamente y los organizará en carpetas por grado. 
            Cada certificado será registrado como NFT en blockchain.
          </AlertDescription>
        </Alert>
      </Card>

      {/* Upload History */}
      {uploads.length > 0 && (
        <Card className="p-6 bg-white">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-green-900">Archivos Procesados</h3>
            <span className="text-sm text-gray-600">{uploads.length} archivo(s)</span>
          </div>

          <div className="space-y-4">
            {uploads.map((upload) => (
              <div key={upload.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      upload.status === 'success' ? 'bg-green-100' :
                      upload.status === 'processing' ? 'bg-blue-100' : 'bg-red-100'
                    }`}>
                      {upload.status === 'success' ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : upload.status === 'processing' ? (
                        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <AlertCircle className="w-6 h-6 text-red-600" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <FileSpreadsheet className="w-5 h-5 text-gray-400" />
                        <h4 className="text-gray-900">{upload.fileName}</h4>
                      </div>
                      
                      {upload.status === 'success' && (
                        <div className="space-y-2">
                          <p className="text-sm text-green-700">
                            ✓ {upload.studentsProcessed} estudiantes procesados exitosamente
                          </p>
                          <p className="text-xs text-gray-600">
                            Certificados creados, organizados por grado y registrados en blockchain
                          </p>
                        </div>
                      )}
                      
                      {upload.status === 'processing' && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                            </div>
                            <span className="text-sm text-gray-600">60%</span>
                          </div>
                          <p className="text-xs text-gray-600">
                            Procesando notas, generando certificados y registrando en blockchain...
                          </p>
                        </div>
                      )}

                      {upload.errors && upload.errors.length > 0 && (
                        <div className="mt-2 p-3 bg-red-50 rounded border border-red-200">
                          <p className="text-sm text-red-900 mb-2">Errores encontrados:</p>
                          <ul className="text-xs text-red-700 space-y-1">
                            {upload.errors.map((error, i) => (
                              <li key={i}>• {error}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {upload.status === 'success' && (
                    <Button variant="outline" size="sm" className="gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Ver Detalles
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Instructions */}
      <Card className="p-6 bg-white">
        <h3 className="text-green-900 mb-4">Instrucciones de Uso</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-gray-900 mb-3">Preparación del Archivo</h4>
            <ol className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="flex items-center justify-center w-5 h-5 bg-green-600 text-white rounded-full flex-shrink-0 text-xs">1</span>
                <span>Descarga la plantilla oficial de Excel</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex items-center justify-center w-5 h-5 bg-green-600 text-white rounded-full flex-shrink-0 text-xs">2</span>
                <span>Completa los datos siguiendo el formato de la plantilla</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex items-center justify-center w-5 h-5 bg-green-600 text-white rounded-full flex-shrink-0 text-xs">3</span>
                <span>Verifica que todos los DNIs sean válidos (8 dígitos)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex items-center justify-center w-5 h-5 bg-green-600 text-white rounded-full flex-shrink-0 text-xs">4</span>
                <span>Guarda el archivo en formato .xlsx o .xls</span>
              </li>
            </ol>
          </div>
          <div>
            <h4 className="text-gray-900 mb-3">Proceso Automatizado</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2"></div>
                <span>Validación automática de datos y formato</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2"></div>
                <span>Generación de certificados para cada estudiante</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2"></div>
                <span>Organización automática en carpetas por grado</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2"></div>
                <span>Registro como NFT en blockchain con Transaction Hash e IPFS</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2"></div>
                <span>Validación automática con SUNEDU</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
