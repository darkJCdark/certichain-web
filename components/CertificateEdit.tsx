import { useState } from 'react';
import { ArrowLeft, Save, X, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { toast } from 'sonner@2.0.3';

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

interface Props {
  certificate: Certificate;
  onBack: () => void;
  onSave: (certificate: Certificate) => void;
}

export function CertificateEdit({ certificate, onBack, onSave }: Props) {
  const [formData, setFormData] = useState(certificate);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleInputChange = (field: keyof Certificate, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleGradeChange = (index: number, field: keyof Certificate['grades'][0], value: string | number) => {
    const newGrades = [...formData.grades];
    newGrades[index] = { ...newGrades[index], [field]: value };
    setFormData(prev => ({ ...prev, grades: newGrades }));
    setHasChanges(true);
  };

  const handleSave = () => {
    setSaving(true);
    toast.info('Guardando cambios...');
    
    // Simular guardado
    setTimeout(() => {
      onSave(formData);
      setSaving(false);
      setHasChanges(false);
      toast.success('Certificado actualizado correctamente');
    }, 1500);
  };

  const handleCancel = () => {
    if (hasChanges) {
      if (window.confirm('¿Deseas descartar los cambios realizados?')) {
        onBack();
      }
    } else {
      onBack();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-green-900 mb-1">Editar Certificado</h2>
          <p className="text-gray-600">Modifica los datos del certificado y las calificaciones</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={saving}
            className="gap-2"
          >
            <X className="w-4 h-4" />
            Cancelar
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700 text-white gap-2"
            onClick={handleSave}
            disabled={!hasChanges || saving}
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Guardar Cambios
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Alert */}
      {hasChanges && (
        <Alert className="bg-yellow-50 border-yellow-200">
          <AlertCircle className="w-5 h-5 text-yellow-600" />
          <AlertDescription className="text-yellow-900">
            Tienes cambios sin guardar. Asegúrate de guardar antes de salir.
          </AlertDescription>
        </Alert>
      )}

      {/* Student Information */}
      <Card className="p-6 bg-white">
        <h3 className="text-blue-900 mb-4 pb-2 border-b-2 border-gray-200">Datos del Estudiante</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="studentName" className="text-gray-700">Apellidos y Nombres *</Label>
            <Input
              id="studentName"
              value={formData.studentName}
              onChange={(e) => handleInputChange('studentName', e.target.value)}
              className="mt-2"
              placeholder="Nombre completo del estudiante"
            />
          </div>
          <div>
            <Label htmlFor="studentDNI" className="text-gray-700">DNI *</Label>
            <Input
              id="studentDNI"
              value={formData.studentDNI}
              onChange={(e) => handleInputChange('studentDNI', e.target.value.replace(/\D/g, '').slice(0, 8))}
              className="mt-2"
              placeholder="12345678"
              maxLength={8}
            />
          </div>
          <div>
            <Label htmlFor="grade" className="text-gray-700">Grado *</Label>
            <Input
              id="grade"
              value={formData.grade}
              onChange={(e) => handleInputChange('grade', e.target.value)}
              className="mt-2"
              placeholder="Ej: 1° Primaria"
            />
          </div>
          <div>
            <Label htmlFor="year" className="text-gray-700">Año Académico *</Label>
            <Input
              id="year"
              value={formData.year}
              onChange={(e) => handleInputChange('year', e.target.value)}
              className="mt-2"
              placeholder="2024"
            />
          </div>
        </div>
      </Card>

      {/* Institution Information */}
      <Card className="p-6 bg-white">
        <h3 className="text-blue-900 mb-4 pb-2 border-b-2 border-gray-200">Institución Educativa</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="institution" className="text-gray-700">Nombre de la Institución *</Label>
            <Input
              id="institution"
              value={formData.institution}
              onChange={(e) => handleInputChange('institution', e.target.value)}
              className="mt-2"
              placeholder="I.E. Ejemplo"
            />
          </div>
          <div>
            <Label htmlFor="institutionCode" className="text-gray-700">Código Institucional *</Label>
            <Input
              id="institutionCode"
              value={formData.institutionCode}
              onChange={(e) => handleInputChange('institutionCode', e.target.value)}
              className="mt-2"
              placeholder="IE-12345"
            />
          </div>
          <div>
            <Label htmlFor="teacher" className="text-gray-700">Docente Responsable *</Label>
            <Input
              id="teacher"
              value={formData.teacher}
              onChange={(e) => handleInputChange('teacher', e.target.value)}
              className="mt-2"
              placeholder="Nombre del docente"
            />
          </div>
          <div>
            <Label htmlFor="teacherCode" className="text-gray-700">Código del Docente *</Label>
            <Input
              id="teacherCode"
              value={formData.teacherCode}
              onChange={(e) => handleInputChange('teacherCode', e.target.value)}
              className="mt-2"
              placeholder="DOC-12345"
            />
          </div>
        </div>
      </Card>

      {/* Grades */}
      <Card className="p-6 bg-white">
        <h3 className="text-blue-900 mb-4 pb-2 border-b-2 border-gray-200">Registro de Calificaciones</h3>
        <Alert className="mb-4 bg-blue-50 border-blue-200">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <AlertDescription className="text-blue-900">
            Puedes editar las calificaciones directamente. Los cambios se reflejarán en el certificado.
          </AlertDescription>
        </Alert>
        
        <div className="space-y-4">
          {formData.grades.map((grade, index) => (
            <div key={index} className="grid md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <Label className="text-gray-700 text-sm">Área Curricular</Label>
                <Input
                  value={grade.subject}
                  onChange={(e) => handleGradeChange(index, 'subject', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-gray-700 text-sm">Período</Label>
                <Input
                  value={grade.period}
                  onChange={(e) => handleGradeChange(index, 'period', e.target.value)}
                  className="mt-1"
                  placeholder="Anual / I Bimestre"
                />
              </div>
              <div>
                <Label className="text-gray-700 text-sm">Calificación</Label>
                <Input
                  value={grade.grade}
                  onChange={(e) => handleGradeChange(index, 'grade', e.target.value)}
                  className="mt-1"
                  placeholder="A, B, C o 20-0"
                />
              </div>
              <div>
                <Label className="text-gray-700 text-sm">Créditos</Label>
                <Input
                  type="number"
                  value={grade.credits}
                  onChange={(e) => handleGradeChange(index, 'credits', parseInt(e.target.value) || 0)}
                  className="mt-1"
                  min="0"
                  max="5"
                />
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          className="mt-4 w-full"
          onClick={() => {
            const newGrade = { subject: '', grade: '', credits: 0, period: 'Anual' };
            setFormData(prev => ({ ...prev, grades: [...prev.grades, newGrade] }));
            setHasChanges(true);
          }}
        >
          + Agregar Curso
        </Button>
      </Card>

      {/* Blockchain Info (Read-only) */}
      <Card className="p-6 bg-gray-50 border-gray-300">
        <h3 className="text-gray-900 mb-4 pb-2 border-b-2 border-gray-300">Información Blockchain (No Editable)</h3>
        <Alert className="mb-4 bg-yellow-50 border-yellow-200">
          <AlertCircle className="w-5 h-5 text-yellow-600" />
          <AlertDescription className="text-yellow-900">
            Los datos de blockchain no pueden ser editados una vez registrados. Esto garantiza la inmutabilidad del certificado.
          </AlertDescription>
        </Alert>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label className="text-gray-700">Transaction Hash</Label>
            <div className="mt-2 p-3 bg-white border border-gray-300 rounded-md">
              <code className="text-sm text-gray-600 break-all">{formData.transactionHash}</code>
            </div>
          </div>
          <div>
            <Label className="text-gray-700">IPFS Hash</Label>
            <div className="mt-2 p-3 bg-white border border-gray-300 rounded-md">
              <code className="text-sm text-gray-600 break-all">{formData.ipfsHash}</code>
            </div>
          </div>
        </div>
      </Card>

      {/* Save Reminder */}
      {hasChanges && (
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-green-900">Recuerda guardar los cambios antes de salir</p>
          </div>
        </Card>
      )}
    </div>
  );
}
