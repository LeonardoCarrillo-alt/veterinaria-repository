import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface LoginProps {
    email: string;
    password: string;
}

export default function Login() {
    const [loginProps, setLoginProps] = useState<LoginProps>({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5004/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email: loginProps.email,
                    password: loginProps.password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error en el login');
            }
            
            const data = await response.json();
            console.log('Login exitoso:', data);
            
            login(data.access_token, data.user);
            
            navigate("/dashboard");
        } catch (error) {
            console.error('Error en el login:', error);
            alert(error instanceof Error ? error.message : 'Error en el login');
        }
    };
    return(
        <div className="login-card">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input id="email" type="text" value={loginProps.email} onChange={(e) => setLoginProps({...loginProps, email: e.target.value})} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input id="password" type="password" value={loginProps.password} onChange={(e) => setLoginProps({...loginProps, password: e.target.value})} />
                </div>
                <button type="submit">Login</button>
                <div>
                    <a href="/register">If you don't have an account, go to Register</a>
                </div>
                
            </form>
        </div>
    );
}
