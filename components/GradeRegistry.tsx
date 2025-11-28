import { useState } from 'react';
import { Save, Plus, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Alert, AlertDescription } from './ui/alert';

interface Student {
  id: string;
  name: string;
  dni: string;
}

interface Grade {
  subject: string;
  period1: string;
  period2: string;
  period3: string;
  period4: string;
  final: string;
}

const mockStudents: Student[] = [
  { id: '1', name: 'Juan Pérez García', dni: '78945612' },
  { id: '2', name: 'María López Sánchez', dni: '78945613' },
  { id: '3', name: 'Pedro Rodríguez Torres', dni: '78945614' },
];

const subjects = [
  'Matemática',
  'Comunicación',
  'Ciencia y Tecnología',
  'Ciencias Sociales',
  'Educación Física',
  'Arte y Cultura',
  'Inglés',
  'Educación para el Trabajo'
];

export function GradeRegistry() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [currentPeriod, setCurrentPeriod] = useState<'1' | '2' | '3' | '4'>('1');
  const [grades, setGrades] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  const handleGradeChange = (subject: string, value: string) => {
    setGrades(prev => ({
      ...prev,
      [subject]: value
    }));
    setSaved(false);
  };

  const handleSave = () => {
    // Simulate save
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleValidateSUNEDU = () => {
    // Simulate SUNEDU validation
    alert('Iniciando validación con SUNEDU...');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-green-900 mb-2">Registro de Notas</h2>
        <p className="text-gray-600">Registro progresivo de calificaciones por bimestre o trimestre</p>
      </div>

      {/* Student Selection */}
      <Card className="p-6 bg-white">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-2 text-gray-700">Año Académico</label>
            <select className="w-full h-11 px-3 rounded-md border border-gray-300 bg-white">
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-gray-700">Grado</label>
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
          <div>
            <label className="block mb-2 text-gray-700">Sección</label>
            <select className="w-full h-11 px-3 rounded-md border border-gray-300 bg-white">
              <option value="">Seleccionar...</option>
              <option value="A">Sección A</option>
              <option value="B">Sección B</option>
              <option value="C">Sección C</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Student List */}
      <Card className="p-6 bg-white">
        <h3 className="text-green-900 mb-4">Lista de Estudiantes</h3>
        <div className="space-y-2">
          {mockStudents.map((student) => (
            <button
              key={student.id}
              onClick={() => setSelectedStudent(student)}
              className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-colors ${
                selectedStudent?.id === student.id
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-green-300 bg-white'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-gray-700">{student.name.charAt(0)}</span>
                </div>
                <div className="text-left">
                  <p className="text-gray-900">{student.name}</p>
                  <p className="text-sm text-gray-600">DNI: {student.dni}</p>
                </div>
              </div>
              {selectedStudent?.id === student.id && (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
            </button>
          ))}
        </div>
      </Card>

      {/* Grade Entry */}
      {selectedStudent && (
        <>
          <Card className="p-6 bg-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-green-900">Registrar Notas: {selectedStudent.name}</h3>
                <p className="text-sm text-gray-600">DNI: {selectedStudent.dni}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPeriod('1')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPeriod === '1'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Bimestre I
                </button>
                <button
                  onClick={() => setCurrentPeriod('2')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPeriod === '2'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Bimestre II
                </button>
                <button
                  onClick={() => setCurrentPeriod('3')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPeriod === '3'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Bimestre III
                </button>
                <button
                  onClick={() => setCurrentPeriod('4')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPeriod === '4'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Bimestre IV
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-700">Área Curricular</th>
                    <th className="text-center py-3 px-4 text-gray-700">Calificación</th>
                    <th className="text-center py-3 px-4 text-gray-700">Observaciones</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((subject) => (
                    <tr key={subject} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-900">{subject}</td>
                      <td className="py-3 px-4">
                        <select
                          value={grades[subject] || ''}
                          onChange={(e) => handleGradeChange(subject, e.target.value)}
                          className="w-24 h-10 px-3 rounded-md border border-gray-300 bg-white mx-auto block"
                        >
                          <option value="">-</option>
                          <option value="AD">AD</option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                        </select>
                      </td>
                      <td className="py-3 px-4">
                        <Input
                          type="text"
                          placeholder="Opcional"
                          className="h-10"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                <p>Escala de calificación:</p>
                <p className="mt-1">
                  <span className="font-medium">AD:</span> Logro Destacado | 
                  <span className="font-medium"> A:</span> Logro Esperado | 
                  <span className="font-medium"> B:</span> En Proceso | 
                  <span className="font-medium"> C:</span> En Inicio
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="gap-2"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700 text-white gap-2"
                >
                  <Save className="w-5 h-5" />
                  Guardar Notas
                </Button>
              </div>
            </div>
          </Card>

          {saved && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <AlertDescription className="text-green-900">
                Las notas se guardaron correctamente y se registraron en blockchain
              </AlertDescription>
            </Alert>
          )}

          {/* SUNEDU Validation */}
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-blue-900 mb-2">Validación SUNEDU</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Una vez completado el registro del año académico, valida los datos con SUNEDU para 
                  garantizar el reconocimiento oficial del certificado.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                    <span>Validación automática de datos institucionales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                    <span>Verificación de planes de estudio vigentes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                    <span>Registro oficial ante el Ministerio de Educación</span>
                  </li>
                </ul>
              </div>
              <Button
                onClick={handleValidateSUNEDU}
                className="bg-blue-600 hover:bg-blue-700 text-white gap-2 whitespace-nowrap"
              >
                <CheckCircle className="w-5 h-5" />
                Validar con SUNEDU
              </Button>
            </div>
          </Card>
        </>
      )}

      {/* Empty State */}
      {!selectedStudent && (
        <Card className="p-12 bg-white text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-gray-900 mb-2">Selecciona un estudiante</h3>
          <p className="text-gray-600">
            Elige un estudiante de la lista para comenzar a registrar las notas
          </p>
        </Card>
      )}
    </div>
  );
}
