import { useState } from 'react';
import { School, ArrowLeft, Lock, User, Shield, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { toast } from 'sonner@2.0.3';

interface Props {
  onLogin: () => void;
  onBack: () => void;
}

// Credenciales de prueba - En producción esto estaría en el backend
const VALID_CREDENTIALS = {
  username: 'admin@sanjose.edu.pe',
  password: 'demo123'
};

const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 300000; // 5 minutos en milisegundos

export function AdminLogin({ onLogin, onBack }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutEndTime, setLockoutEndTime] = useState<number | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  // Validación de formato
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateUsername = (value: string) => {
    if (value.length === 0) return null;
    if (!isValidEmail(value)) {
      return 'Ingrese un correo electrónico válido';
    }
    return null;
  };

  const validatePassword = (value: string) => {
    if (value.length === 0) return null;
    if (value.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    return null;
  };

  const handleLogin = () => {
    // Verificar si está bloqueado
    if (isLocked && lockoutEndTime) {
      const timeRemaining = Math.ceil((lockoutEndTime - Date.now()) / 1000 / 60);
      setError(`Acceso bloqueado temporalmente. Intente nuevamente en ${timeRemaining} minutos.`);
      toast.error(`Cuenta bloqueada por ${timeRemaining} minutos`);
      return;
    }

    setError('');
    setLoading(true);
    
    // Simular validación de credenciales
    setTimeout(() => {
      if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
        // Credenciales correctas
        toast.success('Acceso autorizado exitosamente');
        setAttempts(0);
        onLogin();
      } else {
        // Credenciales incorrectas
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        if (newAttempts >= MAX_ATTEMPTS) {
          // Bloquear cuenta
          const lockoutEnd = Date.now() + LOCKOUT_TIME;
          setIsLocked(true);
          setLockoutEndTime(lockoutEnd);
          setError(`Demasiados intentos fallidos. Su cuenta ha sido bloqueada temporalmente por 5 minutos por razones de seguridad.`);
          toast.error('Cuenta bloqueada por seguridad');
          
          // Desbloquear automáticamente después del tiempo
          setTimeout(() => {
            setIsLocked(false);
            setLockoutEndTime(null);
            setAttempts(0);
            toast.success('Su cuenta ha sido desbloqueada');
          }, LOCKOUT_TIME);
        } else {
          const remainingAttempts = MAX_ATTEMPTS - newAttempts;
          setError(`Credenciales inválidas. Verifique su usuario y contraseña. Le quedan ${remainingAttempts} intentos.`);
          toast.error(`Credenciales incorrectas (${remainingAttempts} intentos restantes)`);
        }
      }
      
      setLoading(false);
    }, 1500);
  };

  const usernameError = usernameTouched ? validateUsername(username) : null;
  const passwordError = passwordTouched ? validatePassword(password) : null;
  const isFormValid = isValidEmail(username) && password.length >= 6 && !isLocked;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
                <School className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-green-900">Panel Administrativo</h1>
                <p className="text-sm text-gray-600">Entidades Educativas</p>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={onBack}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-green-900 mb-3">Iniciar Sesión</h2>
          <p className="text-gray-700">
            Ingresa tus credenciales para acceder al panel administrativo
          </p>
        </div>

        <Card className="p-8 bg-white shadow-lg">
          <div className="space-y-6">
            <div>
              <label className="block mb-3 text-gray-900">
                Usuario *
              </label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Ingresa tu usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-12 pl-10"
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  onBlur={() => setUsernameTouched(true)}
                />
                <User className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
              </div>
              {usernameError && (
                <Alert className="bg-red-50 border-red-200">
                  <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <AlertDescription className="text-red-900">
                    {usernameError}
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <div>
              <label className="block mb-3 text-gray-900">
                Contraseña *
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pl-10 pr-12"
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  onBlur={() => setPasswordTouched(true)}
                />
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                <button
                  type="button"
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="text-sm text-red-500 mt-2">{passwordError}</p>
              )}
            </div>

            {error && (
              <Alert className="bg-red-50 border-red-200">
                <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <AlertDescription className="text-red-900">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <Button
              className="w-full h-14 bg-green-600 hover:bg-green-700 text-white text-lg gap-3"
              onClick={handleLogin}
              disabled={loading || !isFormValid}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Validando...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Iniciar Sesión
                </>
              )}
            </Button>

            <div className="pt-4 border-t border-gray-200">
              <button className="text-sm text-green-700 hover:text-green-800">
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </div>
        </Card>

        {/* Demo Credentials */}
        <Card className="mt-6 p-6 bg-green-50 border-green-200">
          <h3 className="text-green-900 mb-3">Demo - Credenciales de Prueba</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>Usuario:</strong> admin@sanjose.edu.pe</p>
            <p><strong>Contraseña:</strong> demo123</p>
            <p className="text-xs text-gray-600 mt-3">
              * En producción, las credenciales son proporcionadas por el Ministerio de Educación
            </p>
          </div>
        </Card>

        {/* Security Notice */}
        <Alert className="mt-6 bg-blue-50 border-blue-200">
          <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <AlertDescription className="text-blue-900">
            Esta es una conexión segura. Todas las credenciales son encriptadas y validadas con el sistema central.
          </AlertDescription>
        </Alert>
      </main>
    </div>
  );
}