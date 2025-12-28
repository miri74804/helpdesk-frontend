import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import '../../styles/AuthForms.css';

const RegisterForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(''); // נקה שגיאות קודמות

        try {
            const response = await axios.post('http://localhost:4000/auth/register', {
                name,
                email,
                password
            });

            if (response.status === 200 || response.status === 201) {
                login(response.data);
                navigate('/login');
            }
        }
        catch (err: any) {
            setError(err.response?.data?.message || 'שגיאה ברישום. אנא נסה שוב.');
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">הרשמה</h2>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="auth-group">
                        <label htmlFor="name" className="auth-label">שם מלא</label>
                        <input
                            className="auth-input"
                            type="text"
                            id="name"
                            placeholder="השם שלך"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="auth-group">
                        <label htmlFor="email" className="auth-label">אימייל</label>
                        <input
                            className="auth-input"
                            type="email"
                            id="email"
                            placeholder="example@mail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="auth-group">
                        <label htmlFor="password" className="auth-label">סיסמה</label>
                        <input
                            className="auth-input"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="auth-error">{error}</div>}
                    <button className="auth-submit" type="submit">הרשמה</button>
                </form>
                <div className="auth-footer">
                    <p className="auth-footer-text">כבר יש לך חשבון?</p>
                    <Link to="/login" className="auth-link">התחבר כאן</Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm;