import './dashboard.css';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
    const { user, isAuthenticated, logout } = useAuth();
    return(
        <div className="dashboard-page">
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
                <button className="card">
                    <h2>Sección 1</h2>
                    <p>Contenido de la sección 1.</p>
                </button>
                <button className="card">
                    <h2>Sección 2</h2>
                    <p>Contenido de la sección 2.</p>
                </button>
                <button className="card">
                    <h2>Sección 3</h2>
                    <p>Contenido de la sección 3.</p>
                </button>
            </div>
        </div>
    );
}


