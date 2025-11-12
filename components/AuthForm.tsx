'use client';
import { useState, FormEvent, ChangeEvent } from 'react';
import Link from 'next/link';

interface AuthFormProps {
  type: 'login' | 'register';
}

interface FormData {
  email: string;
  password: string;
}

export default function AuthForm({ type }: AuthFormProps) {
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
    alert(`${type === 'login' ? 'Iniciando sesión' : 'Registrando usuario'}...`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="dark:bg-gray-800 shadow-xl rounded-2xl p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {type === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-500 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-500 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg py-2 transition"
          >
            {type === 'login' ? 'Entrar' : 'Registrarse'}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          {type === 'login' ? (
            <>
              ¿No tienes cuenta?{' '}
              <Link href="/register" className="text-blue-500 hover:underline">
                Regístrate
              </Link>
            </>
          ) : (
            <>
              ¿Ya tienes cuenta?{' '}
              <Link href="/login" className="text-blue-500 hover:underlinebg-primary hover:bg-primary/90">
                Inicia sesión
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
