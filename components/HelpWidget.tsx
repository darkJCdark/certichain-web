import { X, Phone, MessageCircle, FileText, HelpCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

export function HelpWidget({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-blue-900">Centro de Ayuda</h3>
              <p className="text-sm text-gray-600">Estamos aquí para ayudarte</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Contact Options */}
          <div>
            <h4 className="text-gray-900 mb-4">Canales de Atención</h4>
            <div className="grid sm:grid-cols-2 gap-4">
              <button className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-left border-2 border-transparent hover:border-blue-300">
                <Phone className="w-8 h-8 text-blue-600 mb-2" />
                <p className="text-gray-900 mb-1">Mesa de Ayuda</p>
                <p className="text-sm text-gray-600">01-234-5678</p>
                <p className="text-xs text-gray-500 mt-1">Lun - Vie, 8AM - 6PM</p>
              </button>

              <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-left border-2 border-transparent hover:border-green-300">
                <MessageCircle className="w-8 h-8 text-green-600 mb-2" />
                <p className="text-gray-900 mb-1">Chat en Vivo</p>
                <p className="text-sm text-gray-600">Respuesta inmediata</p>
                <p className="text-xs text-gray-500 mt-1">Disponible ahora</p>
              </button>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h4 className="text-gray-900 mb-4">Preguntas Frecuentes</h4>
            <div className="space-y-3">
              <details className="group bg-gray-50 rounded-lg">
                <summary className="p-4 cursor-pointer hover:bg-gray-100 rounded-lg list-none flex items-center justify-between">
                  <span className="text-gray-900">¿Cómo busco el certificado de mi hijo/a?</span>
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-4 pb-4 text-sm text-gray-600">
                  Solo necesitas el DNI del estudiante y tu DNI como apoderado. Ingresa ambos números en la página principal 
                  y haz clic en "Buscar Certificados". El sistema mostrará todos los certificados disponibles.
                </div>
              </details>

              <details className="group bg-gray-50 rounded-lg">
                <summary className="p-4 cursor-pointer hover:bg-gray-100 rounded-lg list-none flex items-center justify-between">
                  <span className="text-gray-900">¿Cómo descargo el certificado?</span>
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-4 pb-4 text-sm text-gray-600">
                  Una vez que encuentres el certificado, haz clic en el botón "Descargar PDF". El archivo se descargará 
                  automáticamente a tu dispositivo. Puedes imprimirlo o compartirlo digitalmente.
                </div>
              </details>

              <details className="group bg-gray-50 rounded-lg">
                <summary className="p-4 cursor-pointer hover:bg-gray-100 rounded-lg list-none flex items-center justify-between">
                  <span className="text-gray-900">¿Qué es el código QR del certificado?</span>
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-4 pb-4 text-sm text-gray-600">
                  El código QR es una forma rápida de verificar la autenticidad del certificado. Cualquier institución puede 
                  escanearlo con su celular para confirmar que el certificado es válido y está registrado en blockchain.
                </div>
              </details>

              <details className="group bg-gray-50 rounded-lg">
                <summary className="p-4 cursor-pointer hover:bg-gray-100 rounded-lg list-none flex items-center justify-between">
                  <span className="text-gray-900">¿Puedo usar el certificado para trámites oficiales?</span>
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-4 pb-4 text-sm text-gray-600">
                  Sí, los certificados digitales tienen total validez oficial. Puedes usarlos para traslados de colegio, 
                  matrículas, postulaciones y cualquier otro trámite educativo. Solo descarga el PDF o muestra el código QR.
                </div>
              </details>

              <details className="group bg-gray-50 rounded-lg">
                <summary className="p-4 cursor-pointer hover:bg-gray-100 rounded-lg list-none flex items-center justify-between">
                  <span className="text-gray-900">No encuentro el certificado de mi hijo/a</span>
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-4 pb-4 text-sm text-gray-600">
                  Si no encuentras el certificado, puede ser que aún esté en proceso de digitalización o que los datos no 
                  coincidan. Contacta a la mesa de ayuda con el DNI del estudiante y te asistiremos inmediatamente.
                </div>
              </details>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h4 className="text-blue-900 mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Guía Rápida
            </h4>
            <ol className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full flex-shrink-0 text-xs">1</span>
                <span>Ingresa el DNI del estudiante (8 dígitos)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full flex-shrink-0 text-xs">2</span>
                <span>Ingresa tu DNI como apoderado (8 dígitos)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full flex-shrink-0 text-xs">3</span>
                <span>Haz clic en "Buscar Certificados"</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full flex-shrink-0 text-xs">4</span>
                <span>Selecciona el certificado que necesitas</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full flex-shrink-0 text-xs">5</span>
                <span>Descarga el PDF o comparte el código QR</span>
              </li>
            </ol>
          </div>

          {/* Close Button */}
          <Button
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12"
          >
            Cerrar
          </Button>
        </div>
      </Card>
    </div>
  );
}
