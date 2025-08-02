import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProctorDashboard.css';

const ProctorDashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [activeExams, setActiveExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (!user || user.role !== 'proctor') {
      navigate('/login');
      return;
    }
    setUserInfo(user);
  }, [navigate]);

  useEffect(() => {
    // Simulate API call to fetch active exams
    const fetchActiveExams = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockActiveExams = [
        {
          id: 1,
          title: 'Mathematics Final Exam',
          subject: 'Mathematics',
          startTime: '10:00 AM',
          endTime: '12:00 PM',
          totalStudents: 45,
          activeStudents: 42,
          suspiciousActivities: 2,
          students: [
            {
              id: 1,
              name: 'John Doe',
              studentId: 'STU001',
              status: 'active',
              timeRemaining: '45:30',
              suspiciousFlags: 0,
              lastActivity: '2 minutes ago'
            },
            {
              id: 2,
              name: 'Jane Smith',
              studentId: 'STU002',
              status: 'active',
              timeRemaining: '43:15',
              suspiciousFlags: 1,
              lastActivity: '1 minute ago'
            },
            {
              id: 3,
              name: 'Mike Johnson',
              studentId: 'STU003',
              status: 'active',
              timeRemaining: '41:20',
              suspiciousFlags: 0,
              lastActivity: '30 seconds ago'
            },
            {
              id: 4,
              name: 'Sarah Wilson',
              studentId: 'STU004',
              status: 'inactive',
              timeRemaining: '38:45',
              suspiciousFlags: 2,
              lastActivity: '5 minutes ago'
            }
          ]
        },
        {
          id: 2,
          title: 'Physics Midterm',
          subject: 'Physics',
          startTime: '02:00 PM',
          endTime: '03:30 PM',
          totalStudents: 38,
          activeStudents: 38,
          suspiciousActivities: 0,
          students: [
            {
              id: 5,
              name: 'David Brown',
              studentId: 'STU005',
              status: 'active',
              timeRemaining: '25:10',
              suspiciousFlags: 0,
              lastActivity: '1 minute ago'
            },
            {
              id: 6,
              name: 'Emily Davis',
              studentId: 'STU006',
              status: 'active',
              timeRemaining: '24:30',
              suspiciousFlags: 0,
              lastActivity: '45 seconds ago'
            }
          ]
        }
      ];
      
      setActiveExams(mockActiveExams);
      setLoading(false);
    };

    fetchActiveExams();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  const handleFlagSuspicious = (studentId) => {
    // In a real app, this would send an alert to the system
    alert(`Flagged suspicious activity for student ${studentId}`);
  };

  const handleEndMonitoring = (examId) => {
    if (window.confirm('Are you sure you want to end monitoring for this exam?')) {
      setActiveExams(activeExams.filter(exam => exam.id !== examId));
      if (selectedExam?.id === examId) {
        setSelectedExam(null);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#28a745';
      case 'inactive': return '#dc3545';
      default: return '#6c757d';
    }
  };

  if (!userInfo) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <h2>Proctor Dashboard</h2>
          <span className="user-info">Welcome, {userInfo.username}</span>
        </div>
        <div className="nav-stats">
          <div className="stat-item">
            <span className="stat-label">Active Exams:</span>
            <span className="stat-value">{activeExams.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Students:</span>
            <span className="stat-value">
              {activeExams.reduce((acc, exam) => acc + exam.totalStudents, 0)}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Suspicious Activities:</span>
            <span className="stat-value warning">
              {activeExams.reduce((acc, exam) => acc + exam.suspiciousActivities, 0)}
            </span>
          </div>
        </div>
        <button className="btn btn-danger logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </nav>

      <div className="dashboard-content">
        <div className="exams-overview">
          <h3>Active Exams</h3>
          <div className="exams-grid">
            {activeExams.map((exam) => (
              <div 
                key={exam.id} 
                className={`exam-card ${selectedExam?.id === exam.id ? 'selected' : ''}`}
                onClick={() => setSelectedExam(exam)}
              >
                <div className="exam-header">
                  <div className="exam-subject">{exam.subject}</div>
                  <div className="exam-status active">Active</div>
                </div>
                
                <h4 className="exam-title">{exam.title}</h4>
                
                <div className="exam-stats">
                  <div className="stat">
                    <span className="stat-icon">👥</span>
                    <span>{exam.activeStudents}/{exam.totalStudents} students</span>
                  </div>
                  <div className="stat">
                    <span className="stat-icon">⏰</span>
                    <span>{exam.startTime} - {exam.endTime}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-icon">⚠️</span>
                    <span>{exam.suspiciousActivities} flags</span>
                  </div>
                </div>
                
                <div className="exam-actions">
                  <button
                    className="btn btn-warning"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEndMonitoring(exam.id);
                    }}
                  >
                    End Monitoring
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedExam && (
          <div className="monitoring-section">
            <div className="section-header">
              <h3>Monitoring: {selectedExam.title}</h3>
              <div className="monitoring-stats">
                <span>Active: {selectedExam.activeStudents}</span>
                <span>Flags: {selectedExam.suspiciousActivities}</span>
              </div>
            </div>

            <div className="students-grid">
              {selectedExam.students.map((student) => (
                <div key={student.id} className="student-monitor-card">
                  <div className="webcam-placeholder">
                    <div className="webcam-icon">📹</div>
                    <div className="student-name">{student.name}</div>
                    <div className="student-id">{student.studentId}</div>
                  </div>
                  
                  <div className="student-info">
                    <div className="info-row">
                      <span className="info-label">Status:</span>
                      <span 
                        className="status-badge"
                        style={{ color: getStatusColor(student.status) }}
                      >
                        {student.status}
                      </span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Time Left:</span>
                      <span className="time-remaining">{student.timeRemaining}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Last Activity:</span>
                      <span className="last-activity">{student.lastActivity}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Flags:</span>
                      <span className="flags-count">{student.suspiciousFlags}</span>
                    </div>
                  </div>
                  
                  <div className="student-actions">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleFlagSuspicious(student.id)}
                    >
                      Flag Suspicious
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => alert(`View detailed monitoring for ${student.name}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeExams.length === 0 && (
          <div className="no-exams">
            <div className="no-exams-icon">👁️</div>
            <h3>No Active Exams</h3>
            <p>There are no exams currently being monitored.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProctorDashboard;