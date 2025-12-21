import Login from '../components/login';
import './login.css';

function LoginPage() {
    return (
        <div className="login-page">
            <h1 style={{display:'red'}}></h1> {/* elimina o cambia si no lo necesitas */}
            <Login />
        </div>
    );
}

export default LoginPage;
