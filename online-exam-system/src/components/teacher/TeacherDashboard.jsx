import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExamManagement from './ExamManagement';
import StudentSubmissions from './StudentSubmissions';
import './TeacherDashboard.css';

const TeacherDashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (!user || user.role !== 'teacher') {
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
          <h2>Teacher Dashboard</h2>
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
            className={`nav-tab ${activeTab === 'exams' ? 'active' : ''}`}
            onClick={() => setActiveTab('exams')}
          >
            📝 Manage Exams
          </button>
          <button
            className={`nav-tab ${activeTab === 'submissions' ? 'active' : ''}`}
            onClick={() => setActiveTab('submissions')}
          >
            📈 View Submissions
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
                <div className="stat-icon">📝</div>
                <div className="stat-info">
                  <h3>Active Exams</h3>
                  <p className="stat-number">8</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-info">
                  <h3>Total Students</h3>
                  <p className="stat-number">156</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-info">
                  <h3>Avg. Performance</h3>
                  <p className="stat-number">78%</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⏰</div>
                <div className="stat-info">
                  <h3>Pending Reviews</h3>
                  <p className="stat-number">12</p>
                </div>
              </div>
            </div>

            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="action-buttons">
                <button
                  className="btn btn-success"
                  onClick={() => setActiveTab('exams')}
                >
                  Create New Exam
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => setActiveTab('submissions')}
                >
                  Review Submissions
                </button>
              </div>
            </div>

            <div className="recent-activity">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <span className="activity-icon">✅</span>
                  <div className="activity-content">
                    <p>Mathematics Final Exam completed by 45 students</p>
                    <span className="activity-time">2 hours ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <span className="activity-icon">📝</span>
                  <div className="activity-content">
                    <p>Created new Physics Quiz</p>
                    <span className="activity-time">1 day ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <span className="activity-icon">📊</span>
                  <div className="activity-content">
                    <p>Chemistry Midterm results published</p>
                    <span className="activity-time">3 days ago</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="performance-chart">
              <h3>Class Performance Overview</h3>
              <div className="chart-container">
                <div className="chart-placeholder">
                  <div className="chart-icon">📊</div>
                  <p>Performance charts would be displayed here</p>
                  <p>Using Chart.js for data visualization</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'exams' && <ExamManagement />}
        {activeTab === 'submissions' && <StudentSubmissions />}
      </div>
    </div>
  );
};

export default TeacherDashboard;