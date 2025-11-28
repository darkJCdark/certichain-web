import { useState } from 'react';
import { Search, Filter, Download, Eye, Calendar } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface SearchResult {
  id: string;
  studentName: string;
  studentDNI: string;
  grade: string;
  year: string;
  status: string;
  lastModified: string;
}

const mockResults: SearchResult[] = [
  {
    id: 'CERT-2024-156',
    studentName: 'Juan Carlos Pérez Sánchez',
    studentDNI: '78945612',
    grade: '5to Secundaria',
    year: '2024',
    status: 'Emitido',
    lastModified: '2024-11-15'
  },
  {
    id: 'CERT-2023-445',
    studentName: 'María Elena García López',
    studentDNI: '45678923',
    grade: '4to Secundaria',
    year: '2023',
    status: 'Emitido',
    lastModified: '2023-12-20'
  },
  {
    id: 'CERT-2024-089',
    studentName: 'Pedro Antonio Rodríguez',
    studentDNI: '56789234',
    grade: '3ro Primaria',
    year: '2024',
    status: 'Pendiente',
    lastModified: '2024-11-20'
  }
];

export function AdvancedSearch() {
  const [searchType, setSearchType] = useState<'dni' | 'name' | 'date'>('dni');
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

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
        <p className="text-gray-600">Busca certificados por DNI, nombre del alumno o rango de fechas</p>
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
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="h-12 gap-2"
            >
              <Filter className="w-5 h-5" />
              Filtros
            </Button>
            <Button
              onClick={handleSearch}
              className="bg-green-600 hover:bg-green-700 text-white h-12 px-8"
              disabled={searching}
            >
              {searching ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </>
              ) : (
                'Buscar'
              )}
            </Button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="text-gray-900 mb-4">Filtros Adicionales</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Año</label>
                  <select className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white">
                    <option value="">Todos</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="older">Anteriores</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Nivel</label>
                  <select className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white">
                    <option value="">Todos</option>
                    <option value="primaria">Primaria</option>
                    <option value="secundaria">Secundaria</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Estado</label>
                  <select className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white">
                    <option value="">Todos</option>
                    <option value="emitido">Emitido</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="revision">En Revisión</option>
                  </select>
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
              <p className="text-sm text-gray-600">{results.length} certificado(s) encontrado(s)</p>
            </div>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Exportar Resultados
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-700">ID</th>
                  <th className="text-left py-3 px-4 text-gray-700">Estudiante</th>
                  <th className="text-left py-3 px-4 text-gray-700">DNI</th>
                  <th className="text-left py-3 px-4 text-gray-700">Grado</th>
                  <th className="text-left py-3 px-4 text-gray-700">Año</th>
                  <th className="text-left py-3 px-4 text-gray-700">Estado</th>
                  <th className="text-left py-3 px-4 text-gray-700">Última Modificación</th>
                  <th className="text-right py-3 px-4 text-gray-700">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result) => (
                  <tr key={result.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <span className="font-mono text-sm text-gray-900">{result.id}</span>
                    </td>
                    <td className="py-4 px-4 text-gray-900">{result.studentName}</td>
                    <td className="py-4 px-4 text-gray-700">{result.studentDNI}</td>
                    <td className="py-4 px-4 text-gray-700">{result.grade}</td>
                    <td className="py-4 px-4 text-gray-700">{result.year}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs ${
                        result.status === 'Emitido'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {result.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {result.lastModified}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Eye className="w-4 h-4" />
                          Ver
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Download className="w-4 h-4" />
                          PDF
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Mostrando 1 a {results.length} de {results.length} resultados
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Anterior
              </Button>
              <Button variant="outline" size="sm" className="bg-green-600 text-white">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                Siguiente
              </Button>
            </div>
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
            Usa los filtros de arriba para buscar certificados en la base de datos
          </p>
        </Card>
      )}

      {/* Quick Search Tips */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <h3 className="text-green-900 mb-4">Consejos de Búsqueda</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-gray-900 mb-2">Búsqueda por DNI</h4>
            <p className="text-sm text-gray-700">
              La forma más rápida y precisa. Ingresa los 8 dígitos del DNI del estudiante.
            </p>
          </div>
          <div>
            <h4 className="text-gray-900 mb-2">Búsqueda por Nombre</h4>
            <p className="text-sm text-gray-700">
              Puedes buscar por nombre completo, apellido paterno o materno. No distingue mayúsculas.
            </p>
          </div>
          <div>
            <h4 className="text-gray-900 mb-2">Filtros Avanzados</h4>
            <p className="text-sm text-gray-700">
              Combina filtros para resultados más específicos: año, nivel educativo y estado del certificado.
            </p>
          </div>
          <div>
            <h4 className="text-gray-900 mb-2">Exportar Datos</h4>
            <p className="text-sm text-gray-700">
              Los resultados pueden exportarse en formato Excel para análisis o reportes institucionales.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
