import { useState } from 'react';
import { Search, Calendar, Eye, Folder } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface SearchResult {
  id: string;
  studentName: string;
  studentDNI: string;
  grade: string;
  year: string;
  certificatesCount: number;
}

const mockResults: SearchResult[] = [
  {
    id: '1',
    studentName: 'María García López',
    studentDNI: '78945612',
    grade: '1° Secundaria',
    year: '2024',
    certificatesCount: 7
  },
  {
    id: '2',
    studentName: 'Juan Pérez Sánchez',
    studentDNI: '78945613',
    grade: '5° Primaria',
    year: '2024',
    certificatesCount: 5
  },
];

export function AdminSearch() {
  const [searchType, setSearchType] = useState<'dni' | 'name' | 'date'>('dni');
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);

  const handleSearch = () => {
    setSearching(true);
    setTimeout(() => {
      setResults(mockResults);
      setSearching(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-green-900 mb-2">Búsqueda Avanzada</h2>
        <p className="text-gray-600">Busca estudiantes por DNI, nombre o rango de fechas</p>
      </div>

      {/* Search Card */}
      <Card className="p-6 bg-white">
        <div className="space-y-6">
          {/* Search Type Selector */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSearchType('dni')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                searchType === 'dni'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Buscar por DNI
            </button>
            <button
              onClick={() => setSearchType('name')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                searchType === 'name'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Buscar por Nombre
            </button>
            <button
              onClick={() => setSearchType('date')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                searchType === 'date'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Buscar por Fecha
            </button>
          </div>

          {/* Search Input */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
              <Input
                type="text"
                placeholder={
                  searchType === 'dni' 
                    ? 'Ingresa el DNI del estudiante (8 dígitos)'
                    : searchType === 'name'
                    ? 'Ingresa el nombre completo o apellido'
                    : 'Selecciona rango de fechas'
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 pl-10"
              />
            </div>
            <Button
              onClick={handleSearch}
              className="bg-green-600 hover:bg-green-700 text-white h-12 px-8"
              disabled={searching}
            >
              {searching ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Buscar'
              )}
            </Button>
          </div>

          {/* Date Range (shown when date search is selected) */}
          {searchType === 'date' && (
            <div className="grid md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Fecha Inicio</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <Input type="date" className="h-10 pl-10" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Fecha Fin</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <Input type="date" className="h-10 pl-10" />
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Results */}
      {results.length > 0 && (
        <Card className="p-6 bg-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-green-900">Resultados de Búsqueda</h3>
              <p className="text-sm text-gray-600">{results.length} estudiante(s) encontrado(s)</p>
            </div>
          </div>

          <div className="space-y-4">
            {results.map((result) => (
              <div key={result.id} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-700">{result.studentName.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-gray-900 mb-1">{result.studentName}</h4>
                      <div className="grid sm:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">DNI</p>
                          <p className="text-gray-900 font-mono">{result.studentDNI}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Grado Actual</p>
                          <p className="text-gray-900">{result.grade}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Certificados</p>
                          <p className="text-gray-900">{result.certificatesCount} archivos</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Folder className="w-4 h-4" />
                      Ver Certificados
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Eye className="w-4 h-4" />
                      Detalles
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Empty State */}
      {results.length === 0 && !searching && (
        <Card className="p-12 bg-white text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-gray-900 mb-2">Inicia una búsqueda</h3>
          <p className="text-gray-600">
            Selecciona un tipo de búsqueda e ingresa los datos para encontrar estudiantes
          </p>
        </Card>
      )}

      {/* Search Tips */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <h3 className="text-green-900 mb-4">Consejos de Búsqueda</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-gray-900 mb-2">Por DNI</h4>
            <p className="text-sm text-gray-700">
              La forma más rápida y precisa. Ingresa los 8 dígitos del DNI del estudiante.
            </p>
          </div>
          <div>
            <h4 className="text-gray-900 mb-2">Por Nombre</h4>
            <p className="text-sm text-gray-700">
              Busca por nombre completo, apellido paterno o materno. No distingue mayúsculas.
            </p>
          </div>
          <div>
            <h4 className="text-gray-900 mb-2">Por Fecha</h4>
            <p className="text-sm text-gray-700">
              Filtra estudiantes por rango de fechas de emisión de certificados.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
