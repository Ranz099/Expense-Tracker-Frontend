import React, { useState } from 'react';
import { register, login } from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';

function AuthForm({ setCurrentUser }) {
    const [isLogin, setIsLogin] = useState(true);
    const [userData, setUserData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!userData.username || !userData.password) {
            setError('All fields are required');
            return;
        }

        try {
            const response = isLogin ? await login(userData) : await register(userData);
            localStorage.setItem('username', userData.username);
            setCurrentUser(userData.username);
            window.location.reload(); // Or navigate to dashboard
        } catch (error) {
            setError('Username or Password is incorrect');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="card p-4" style={{
                width: '400px',
                background: 'linear-gradient(145deg, #ffffff, #e6e6e6)',
                boxShadow: '0 8px 16px rgba(0, 123, 255, 0.65), 0 -8px 16px rgba(255, 255, 255, 0.5)',
                border: '1px solid #007bff',
                borderRadius: '15px'
            }}>
                <h1 className="text-center" style={{
                    color: '#007bff', // Matches the border color
                    marginBottom: '20px', // Adds some space before the form elements
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)' // Subtle shadow for 3D text effect
                }}>Expense Tracker</h1>
                <h2 className="card-title text-center">{isLogin ? 'Login' : 'Register'}</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" name="username" value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} placeholder="Username" required />
                    </div>
                    <div className="form-group mt-3">
                        <input type="password" className="form-control" name="password" value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} placeholder="Password" required />
                    </div>
                    <button type="submit" className="btn btn-primary mt-4 w-100">{isLogin ? 'Login' : 'Register'}</button>
                    <button type="button" className="btn btn-link mt-3 w-100" onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Need to Register?' : 'Back to Login'}</button>
                </form>
            </div>
        </div>
    );
}

export default AuthForm;
