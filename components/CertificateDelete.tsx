import { useState } from 'react';
import { AlertTriangle, Trash2, X, Shield, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner@2.0.3';

interface Certificate {
  id: string;
  studentName: string;
  studentDNI: string;
  grade: string;
  year: string;
  institution: string;
  transactionHash: string;
}

interface Props {
  certificate: Certificate;
  onBack: () => void;
  onConfirmDelete: () => void;
}

export function CertificateDelete({ certificate, onBack, onConfirmDelete }: Props) {
  const [confirmationText, setConfirmationText] = useState('');
  const [understood, setUnderstood] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = () => {
    if (!understood) {
      toast.error('Debes confirmar que entiendes las consecuencias');
      return;
    }

    if (confirmationText !== 'ELIMINAR') {
      toast.error('Debes escribir "ELIMINAR" para confirmar');
      return;
    }

    setDeleting(true);
    toast.info('Eliminando certificado...');

    // Simular eliminación
    setTimeout(() => {
      onConfirmDelete();
      setDeleting(false);
      toast.success('Certificado eliminado correctamente');
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-10 h-10 text-red-600" />
        </div>
        <h2 className="text-red-900 mb-2">Eliminar Certificado</h2>
        <p className="text-gray-600">Esta acción es permanente y no se puede deshacer</p>
      </div>

      {/* Warning Alert */}
      <Alert className="bg-red-50 border-red-300">
        <AlertTriangle className="w-5 h-5 text-red-600" />
        <AlertDescription className="text-red-900">
          <p className="mb-2">¡ATENCIÓN! Esta es una acción crítica que:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Eliminará permanentemente el certificado del sistema</li>
            <li>No podrá ser recuperado una vez eliminado</li>
            <li>El estudiante y sus apoderados no podrán acceder a este certificado</li>
            <li>Se mantendrá un registro de auditoría de la eliminación</li>
          </ul>
        </AlertDescription>
      </Alert>

      {/* Certificate Information */}
      <Card className="p-6 bg-white">
        <h3 className="text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">Información del Certificado a Eliminar</h3>
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Estudiante:</span>
            <span className="text-gray-900">{certificate.studentName}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">DNI:</span>
            <span className="text-gray-900 font-mono">{certificate.studentDNI}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Grado:</span>
            <span className="text-gray-900">{certificate.grade}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Año:</span>
            <span className="text-gray-900">{certificate.year}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Institución:</span>
            <span className="text-gray-900">{certificate.institution}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-600">ID Certificado:</span>
            <span className="text-gray-900 font-mono text-sm">{certificate.id}</span>
          </div>
        </div>
      </Card>

      {/* Blockchain Notice */}
      <Alert className="bg-blue-50 border-blue-200">
        <Shield className="w-5 h-5 text-blue-600" />
        <AlertDescription className="text-blue-900">
          <p className="mb-2">Nota sobre Blockchain:</p>
          <p className="text-sm">
            Aunque el certificado será eliminado del sistema, el registro en blockchain (Transaction Hash: {certificate.transactionHash.slice(0, 10)}...) permanecerá inmutable. 
            Sin embargo, el certificado ya no será accesible desde el sistema.
          </p>
        </AlertDescription>
      </Alert>

      {/* Confirmation */}
      <Card className="p-6 bg-white border-2 border-red-200">
        <h3 className="text-red-900 mb-4">Confirmación Requerida</h3>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Checkbox 
              id="understood" 
              checked={understood}
              onCheckedChange={(checked) => setUnderstood(checked as boolean)}
              className="mt-1"
            />
            <label htmlFor="understood" className="text-gray-700 cursor-pointer">
              Entiendo que esta acción es permanente e irreversible, y que el certificado no podrá ser recuperado después de eliminarlo.
            </label>
          </div>

          <div>
            <Label htmlFor="confirmation" className="text-gray-700 mb-2 block">
              Escribe <strong>ELIMINAR</strong> para confirmar
            </Label>
            <Input
              id="confirmation"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value.toUpperCase())}
              placeholder="Escribe ELIMINAR"
              className="border-red-300 focus:border-red-500"
              disabled={!understood}
            />
            <p className="text-sm text-gray-500 mt-2">
              Debes escribir exactamente "ELIMINAR" en mayúsculas
            </p>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={deleting}
          className="gap-2 min-w-[140px]"
        >
          <X className="w-4 h-4" />
          Cancelar
        </Button>
        <Button
          onClick={handleDelete}
          disabled={!understood || confirmationText !== 'ELIMINAR' || deleting}
          className="bg-red-600 hover:bg-red-700 text-white gap-2 min-w-[140px]"
        >
          {deleting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Eliminando...
            </>
          ) : (
            <>
              <Trash2 className="w-4 h-4" />
              Eliminar
            </>
          )}
        </Button>
      </div>

      {/* Additional Warning */}
      <Alert className="bg-yellow-50 border-yellow-200">
        <AlertCircle className="w-5 h-5 text-yellow-600" />
        <AlertDescription className="text-yellow-900 text-sm">
          Alternativa: Si el certificado contiene errores, considera <strong>editarlo</strong> en lugar de eliminarlo. 
          La edición mantiene el historial y es más segura para la auditoría.
        </AlertDescription>
      </Alert>
    </div>
  );
}
