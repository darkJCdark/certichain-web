import { useState } from 'react';
import { ArrowLeft, Download, Edit, Trash2, CheckCircle, Shield, QrCode, ExternalLink, Copy, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
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
  onEdit: () => void;
  onDelete: () => void;
}

export function CertificateDetail({ certificate, onBack, onEdit, onDelete }: Props) {
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(type);
    toast.success(`${type} copiado al portapapeles`);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const handleDownloadPDF = () => {
    toast.success('Generando PDF del certificado...');
    // Simular descarga
    setTimeout(() => {
      toast.success('PDF descargado correctamente');
    }, 1500);
  };

  const handleVerifyBlockchain = () => {
    toast.info('Verificando en Polygon blockchain...');
    setTimeout(() => {
      toast.success('Certificado verificado en blockchain');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <Button
          variant="ghost"
          onClick={onBack}
          className="gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver
        </Button>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={onEdit}
            className="gap-2"
          >
            <Edit className="w-4 h-4" />
            Editar Certificado
          </Button>
          <Button
            variant="outline"
            onClick={onDelete}
            className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
            Eliminar
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
            onClick={handleDownloadPDF}
          >
            <Download className="w-4 h-4" />
            Descargar PDF
          </Button>
        </div>
      </div>

      {/* Status Banner */}
      <Card className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-green-900">Certificado Verificado en Blockchain</p>
              <p className="text-sm text-green-700">Red Polygon - Verificación NFT activa</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={handleVerifyBlockchain}
            className="gap-2"
          >
            <Shield className="w-4 h-4" />
            Verificar
          </Button>
        </div>
      </Card>

      {/* Blockchain Information */}
      <Card className="p-6 bg-white">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-blue-600" />
          <h3 className="text-blue-900">Información Blockchain</h3>
          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">NFT Polygon</Badge>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-2">Transaction Hash</label>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <code className="flex-1 text-sm text-gray-900 font-mono break-all">
                {certificate.transactionHash}
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(certificate.transactionHash, 'Transaction Hash')}
                className="flex-shrink-0"
              >
                {copiedHash === 'Transaction Hash' ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex-shrink-0"
                onClick={() => window.open(`https://polygonscan.com/tx/${certificate.transactionHash}`, '_blank')}
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">IPFS Hash</label>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <code className="flex-1 text-sm text-gray-900 font-mono break-all">
                {certificate.ipfsHash}
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(certificate.ipfsHash, 'IPFS Hash')}
                className="flex-shrink-0"
              >
                {copiedHash === 'IPFS Hash' ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex-shrink-0"
                onClick={() => window.open(`https://ipfs.io/ipfs/${certificate.ipfsHash}`, '_blank')}
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Certificate Preview */}
      <Card className="p-8 md:p-12 bg-white shadow-xl">
        {/* Header */}
        <div className="border-b-4 border-blue-600 pb-6 mb-8 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-blue-900 mb-2">Certificado de Estudios</h2>
          <p className="text-gray-600">República del Perú - Ministerio de Educación</p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <QrCode className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-blue-700">Verificable con código QR</span>
          </div>
        </div>

        {/* Student Information */}
        <div className="mb-8">
          <h3 className="text-blue-900 mb-4 pb-2 border-b-2 border-gray-200">Datos del Estudiante</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Apellidos y Nombres</p>
              <p className="text-blue-900">{certificate.studentName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">DNI</p>
              <p className="text-blue-900 font-mono">{certificate.studentDNI}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Grado</p>
              <p className="text-blue-900">{certificate.grade}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Año Académico</p>
              <p className="text-blue-900">{certificate.year}</p>
            </div>
          </div>
        </div>

        {/* Institution Information */}
        <div className="mb-8">
          <h3 className="text-blue-900 mb-4 pb-2 border-b-2 border-gray-200">Institución Educativa</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Nombre de la Institución</p>
              <p className="text-blue-900">{certificate.institution}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Código Institucional</p>
              <p className="text-blue-900 font-mono">{certificate.institutionCode}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Docente Responsable</p>
              <p className="text-blue-900">{certificate.teacher}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Código del Docente</p>
              <p className="text-blue-900 font-mono">{certificate.teacherCode}</p>
            </div>
          </div>
        </div>

        {/* Grades Table */}
        <div className="mb-8">
          <h3 className="text-blue-900 mb-4 pb-2 border-b-2 border-gray-200">Registro de Calificaciones</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-50 border-b-2 border-blue-600">
                  <th className="text-left py-3 px-4 text-blue-900">Área Curricular</th>
                  <th className="text-center py-3 px-4 text-blue-900">Período</th>
                  <th className="text-center py-3 px-4 text-blue-900">Calificación</th>
                  <th className="text-center py-3 px-4 text-blue-900">Créditos</th>
                </tr>
              </thead>
              <tbody>
                {certificate.grades.map((grade, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900">{grade.subject}</td>
                    <td className="py-3 px-4 text-center text-gray-700">{grade.period}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${
                        grade.grade === 'A' || grade.grade === '20' || grade.grade === '19' || grade.grade === '18'
                          ? 'bg-green-100 text-green-800'
                          : grade.grade === 'B' || grade.grade === '17' || grade.grade === '16' || grade.grade === '15'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {grade.grade}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-gray-700">{grade.credits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Information */}
        <div className="mt-8 pt-6 border-t-2 border-gray-200">
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-gray-600 mb-1">Fecha de Emisión</p>
              <p className="text-gray-900">{certificate.issueDate}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Código de Certificado</p>
              <p className="text-gray-900 font-mono">{certificate.id}</p>
            </div>
          </div>
        </div>

        {/* Digital Seal */}
        <div className="mt-8 pt-6 border-t-2 border-blue-600 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
            <Shield className="w-6 h-6 text-blue-600" />
            <div className="text-left">
              <p className="text-sm text-gray-700">Certificado Digital Verificable</p>
              <p className="text-xs text-gray-600">Blockchain Polygon • NFT • IPFS</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
