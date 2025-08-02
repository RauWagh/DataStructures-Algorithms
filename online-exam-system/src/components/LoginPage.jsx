import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState('student');
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const roles = [
    { id: 'student', name: 'Student', color: '#667eea', icon: '👨‍🎓' },
    { id: 'teacher', name: 'Teacher', color: '#56ab2f', icon: '👨‍🏫' },
    { id: 'admin', name: 'Admin', color: '#ff416c', icon: '👨‍💼' },
    { id: 'proctor', name: 'Proctor', color: '#f093fb', icon: '👁️' }
  ];

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - in real app, this would be an API call
      if (credentials.username && credentials.password) {
        // Store user info in localStorage (in real app, you'd get this from API)
        const userInfo = {
          role: selectedRole,
          username: credentials.username,
          id: Math.random().toString(36).substr(2, 9)
        };
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        
        // Navigate to appropriate dashboard
        navigate(`/${selectedRole}`);
      } else {
        setError('Please enter valid credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Online Examination System</h1>
          <p>Please select your role and login</p>
        </div>

        <div className="role-selector">
          {roles.map((role) => (
            <button
              key={role.id}
              className={`role-btn ${selectedRole === role.id ? 'active' : ''}`}
              style={{ '--role-color': role.color }}
              onClick={() => setSelectedRole(role.id)}
            >
              <span className="role-icon">{role.icon}</span>
              <span className="role-name">{role.name}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleLogin} className="login-form">
          {error && <div className="alert alert-error">{error}</div>}
          
          <div className="form-group">
            <label className="form-label">
              {selectedRole === 'student' && 'Student ID'}
              {selectedRole === 'teacher' && 'Teacher ID'}
              {selectedRole === 'admin' && 'Admin ID'}
              {selectedRole === 'proctor' && 'Proctor ID'}
            </label>
            <input
              type="text"
              name="username"
              className="form-input"
              placeholder={`Enter your ${selectedRole} ID`}
              value={credentials.username}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary login-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-small"></span>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>Demo Credentials:</p>
          <div className="demo-credentials">
            <div>Username: demo123</div>
            <div>Password: password123</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;