import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserManagement from './UserManagement';
import SystemReports from './SystemReports';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    setUserInfo(user);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  if (!userInfo) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <h2>Admin Dashboard</h2>
          <span className="user-info">Welcome, {userInfo.username}</span>
        </div>
        <div className="nav-tabs">
          <button
            className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button
            className={`nav-tab ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            👥 User Management
          </button>
          <button
            className={`nav-tab ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            📈 Reports
          </button>
        </div>
        <button className="btn btn-danger logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </nav>

      <div className="dashboard-content">
        {activeTab === 'dashboard' && (
          <div className="dashboard-overview">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-info">
                  <h3>Total Users</h3>
                  <p className="stat-number">1,247</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📝</div>
                <div className="stat-info">
                  <h3>Active Exams</h3>
                  <p className="stat-number">23</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-info">
                  <h3>System Load</h3>
                  <p className="stat-number">67%</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⚠️</div>
                <div className="stat-info">
                  <h3>Alerts</h3>
                  <p className="stat-number">3</p>
                </div>
              </div>
            </div>

            <div className="user-breakdown">
              <h3>User Distribution</h3>
              <div className="breakdown-grid">
                <div className="breakdown-item">
                  <div className="breakdown-icon">👨‍🎓</div>
                  <div className="breakdown-info">
                    <h4>Students</h4>
                    <p className="breakdown-number">1,156</p>
                    <p className="breakdown-percentage">92.7%</p>
                  </div>
                </div>
                <div className="breakdown-item">
                  <div className="breakdown-icon">👨‍🏫</div>
                  <div className="breakdown-info">
                    <h4>Teachers</h4>
                    <p className="breakdown-number">78</p>
                    <p className="breakdown-percentage">6.3%</p>
                  </div>
                </div>
                <div className="breakdown-item">
                  <div className="breakdown-icon">👁️</div>
                  <div className="breakdown-info">
                    <h4>Proctors</h4>
                    <p className="breakdown-number">12</p>
                    <p className="breakdown-percentage">1.0%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="system-alerts">
              <h3>System Alerts</h3>
              <div className="alerts-list">
                <div className="alert-item warning">
                  <span className="alert-icon">⚠️</span>
                  <div className="alert-content">
                    <p>High server load detected - 85% CPU usage</p>
                    <span className="alert-time">2 minutes ago</span>
                  </div>
                </div>
                <div className="alert-item info">
                  <span className="alert-icon">ℹ️</span>
                  <div className="alert-content">
                    <p>Database backup completed successfully</p>
                    <span className="alert-time">1 hour ago</span>
                  </div>
                </div>
                <div className="alert-item error">
                  <span className="alert-icon">❌</span>
                  <div className="alert-content">
                    <p>Failed login attempts detected from IP: 192.168.1.100</p>
                    <span className="alert-time">3 hours ago</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="recent-activity">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <span className="activity-icon">👤</span>
                  <div className="activity-content">
                    <p>New teacher account created: Dr. Sarah Johnson</p>
                    <span className="activity-time">30 minutes ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <span className="activity-icon">📝</span>
                  <div className="activity-content">
                    <p>Mathematics Final Exam activated by Prof. Smith</p>
                    <span className="activity-time">2 hours ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <span className="activity-icon">🔒</span>
                  <div className="activity-content">
                    <p>System maintenance completed</p>
                    <span className="activity-time">6 hours ago</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="system-health">
              <h3>System Health</h3>
              <div className="health-metrics">
                <div className="metric-item">
                  <div className="metric-label">CPU Usage</div>
                  <div className="metric-bar">
                    <div className="metric-fill" style={{ width: '67%' }}></div>
                  </div>
                  <div className="metric-value">67%</div>
                </div>
                <div className="metric-item">
                  <div className="metric-label">Memory Usage</div>
                  <div className="metric-bar">
                    <div className="metric-fill" style={{ width: '45%' }}></div>
                  </div>
                  <div className="metric-value">45%</div>
                </div>
                <div className="metric-item">
                  <div className="metric-label">Disk Space</div>
                  <div className="metric-bar">
                    <div className="metric-fill" style={{ width: '78%' }}></div>
                  </div>
                  <div className="metric-value">78%</div>
                </div>
                <div className="metric-item">
                  <div className="metric-label">Network</div>
                  <div className="metric-bar">
                    <div className="metric-fill" style={{ width: '23%' }}></div>
                  </div>
                  <div className="metric-value">23%</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'reports' && <SystemReports />}
      </div>
    </div>
  );
};

export default AdminDashboard;