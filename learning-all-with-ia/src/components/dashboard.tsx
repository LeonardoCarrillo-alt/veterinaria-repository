import './dashboard.css';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const handleInfoClick = () => {
        navigate('/info');
    };
    return(
        <div style={{backgroundColor: '#07dee9'}}>
            <div className="dashboard-page" style={{backgroundImage: 'url(assets/images.png)'}}>
                {isAuthenticated && user && (
                    <div className="user-welcome">
                        <h2>¡Bienvenido, {user.name}!</h2>
                        <p>Email: {user.email} | Usuario: {user.username}</p>
                        <button onClick={logout} className="logout-btn">
                            Cerrar Sesión
                        </button>
                    </div>
                )}
                
                <h1 className="dashboard-title">Encuentra tus productos ideales para tus mascotas</h1>

                <div className="dashboard-search">
                    <input type="text" placeholder="Buscar..." />
                </div>

                <div className="cards-grid">
                    <button className="card" onClick={handleInfoClick}>
                        <h2>inicio</h2>
                        <p>Contenido de la sección 1.</p>
                    </button>
                    <button className="card">
                        <h2>productos</h2>
                        <p>Contenido de la sección 2.</p>
                    </button>
                    <button className="card">
                        <h2>tu asistente veterinario</h2>
                        <p>chatea con tu asistente veterinario para obtener ayuda sobre tus mascotas</p>
                    </button>
                </div>
            </div>
        </div>
    );
}


