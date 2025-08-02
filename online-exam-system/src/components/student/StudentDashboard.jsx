import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import UpcomingExams from './UpcomingExams';
import ExamResults from './ExamResults';
import ExamInterface from './ExamInterface';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (!user || user.role !== 'student') {
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
          <h2>Student Dashboard</h2>
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
            📝 Upcoming Exams
          </button>
          <button
            className={`nav-tab ${activeTab === 'results' ? 'active' : ''}`}
            onClick={() => setActiveTab('results')}
          >
            📈 Results
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
                  <h3>Upcoming Exams</h3>
                  <p className="stat-number">3</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">✅</div>
                <div className="stat-info">
                  <h3>Completed</h3>
                  <p className="stat-number">12</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-info">
                  <h3>Average Score</h3>
                  <p className="stat-number">85%</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⏰</div>
                <div className="stat-info">
                  <h3>Next Exam</h3>
                  <p className="stat-number">2h 30m</p>
                </div>
              </div>
            </div>

            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="action-buttons">
                <button
                  className="btn btn-primary"
                  onClick={() => setActiveTab('exams')}
                >
                  View Upcoming Exams
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => setActiveTab('results')}
                >
                  Check Results
                </button>
              </div>
            </div>

            <div className="recent-activity">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <span className="activity-icon">✅</span>
                  <div className="activity-content">
                    <p>Completed Mathematics Exam</p>
                    <span className="activity-time">2 hours ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <span className="activity-icon">📝</span>
                  <div className="activity-content">
                    <p>Started Physics Quiz</p>
                    <span className="activity-time">1 day ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <span className="activity-icon">📊</span>
                  <div className="activity-content">
                    <p>Received Chemistry Results</p>
                    <span className="activity-time">3 days ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'exams' && <UpcomingExams />}
        {activeTab === 'results' && <ExamResults />}
      </div>
    </div>
  );
};

export default StudentDashboard;