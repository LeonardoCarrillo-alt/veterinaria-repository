import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import './register.css'

interface RegisterProps {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const navigate = useNavigate();
  const [registerProps, setRegisterProps] = useState<RegisterProps>({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setRegisterProps({ ...registerProps, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    

    if (registerProps.password !== registerProps.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    if (!registerProps.name || !registerProps.username || !registerProps.email || !registerProps.password) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      const response = await fetch('http://localhost:5004/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: registerProps.name,
          username: registerProps.username,
          email: registerProps.email,
          password: registerProps.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en el registro');
      }

      const data = await response.json();
      console.log('Registro exitoso:', data);
      
      // Redirigir a la página principal después del registro
      navigate("/dashboard");
    } catch (error) {
      console.error('Error en el registro:', error);
      alert(error instanceof Error ? error.message : 'Error en el registro');
    }
  };

  return (
    <div className='register-form'>
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input 
          id="email" 
          type="email" 
          placeholder="Email" 
          value={registerProps.email} 
          onChange={handleChange} 
          required
        />
        
        <label htmlFor="name">Nombre</label>
        <input 
          id="name" 
          type="text" 
          placeholder="Nombre" 
          value={registerProps.name} 
          onChange={handleChange} 
          required
        />
        
        <label htmlFor="username">Usuario</label>
        <input 
          id="username" 
          type="text" 
          placeholder="Usuario" 
          value={registerProps.username} 
          onChange={handleChange} 
          required
        />
        
        <label htmlFor="password">Contraseña</label>
        <input 
          id="password" 
          type="password" 
          placeholder="Contraseña" 
          value={registerProps.password} 
          onChange={handleChange} 
          required
        />
        
        <label htmlFor="confirmPassword">Confirmar Contraseña</label>
        <input 
          id="confirmPassword" 
          type="password" 
          placeholder="Confirmar Contraseña" 
          value={registerProps.confirmPassword} 
          onChange={handleChange} 
          required
        />
        
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}