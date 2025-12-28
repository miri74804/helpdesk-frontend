import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/Navbar.css";

const Navbar = () => {

    const { user, isAuthenticated, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <Link to="/dashboard" className="brand-link">
                        🎫 Helpdesk
                    </Link>
                </div>

                <div className="navbar-links">
                    <Link to="/tickets" className="nav-link">
                        📋 הטיקטים שלי
                    </Link>
                    {isAuthenticated && user?.role === 'customer' && (
                        <Link to="/tickets/new" className="nav-link">
                            ➕ פתיחת טיקט
                        </Link>
                    )}
                    <Link to="/dashboard" className="nav-link">
                        🏠 דאשבורד
                    </Link>
                </div>

                <div className="navbar-user">
                    <div className="user-info">
                        <span className="user-name">{user?.name ?? 'אורח'}</span>
                        <span className="user-role">{user?.role}</span>
                    </div>
                    {isAuthenticated ? (
                        <button onClick={logout} className="logout-btn">
                            🚪 התנתקות
                        </button>
                    ) : (
                        <Link to="/login" className="login-link">
                            🔑 התחברות
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;