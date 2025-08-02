import React, { useState, useEffect } from 'react';
import './ExamManagement.css';

const ExamManagement = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    date: '',
    time: '',
    duration: '',
    totalQuestions: '',
    instructions: '',
    status: 'draft'
  });

  useEffect(() => {
    // Simulate API call to fetch exams
    const fetchExams = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockExams = [
        {
          id: 1,
          title: 'Mathematics Final Exam',
          subject: 'Mathematics',
          date: '2024-01-15',
          time: '10:00 AM',
          duration: 120,
          totalQuestions: 50,
          status: 'active',
          studentsEnrolled: 45,
          submissions: 42,
          instructions: 'This exam covers Algebra, Calculus, and Statistics. Calculators are allowed.'
        },
        {
          id: 2,
          title: 'Physics Midterm',
          subject: 'Physics',
          date: '2024-01-18',
          time: '02:00 PM',
          duration: 90,
          totalQuestions: 30,
          status: 'draft',
          studentsEnrolled: 38,
          submissions: 0,
          instructions: 'This exam covers Mechanics and Thermodynamics. Formula sheet provided.'
        },
        {
          id: 3,
          title: 'Chemistry Quiz',
          subject: 'Chemistry',
          date: '2024-01-20',
          time: '09:00 AM',
          duration: 60,
          totalQuestions: 25,
          status: 'scheduled',
          studentsEnrolled: 52,
          submissions: 0,
          instructions: 'This quiz covers Organic Chemistry basics. No calculators needed.'
        }
      ];
      
      setExams(mockExams);
      setLoading(false);
    };

    fetchExams();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingExam) {
      // Update existing exam
      setExams(exams.map(exam => 
        exam.id === editingExam.id 
          ? { ...exam, ...formData }
          : exam
      ));
      setEditingExam(null);
    } else {
      // Create new exam
      const newExam = {
        id: Date.now(),
        ...formData,
        studentsEnrolled: 0,
        submissions: 0
      };
      setExams([...exams, newExam]);
    }
    
    setFormData({
      title: '',
      subject: '',
      date: '',
      time: '',
      duration: '',
      totalQuestions: '',
      instructions: '',
      status: 'draft'
    });
    setShowCreateForm(false);
  };

  const handleEdit = (exam) => {
    setEditingExam(exam);
    setFormData({
      title: exam.title,
      subject: exam.subject,
      date: exam.date,
      time: exam.time,
      duration: exam.duration.toString(),
      totalQuestions: exam.totalQuestions.toString(),
      instructions: exam.instructions,
      status: exam.status
    });
    setShowCreateForm(true);
  };

  const handleDelete = (examId) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      setExams(exams.filter(exam => exam.id !== examId));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#28a745';
      case 'draft': return '#6c757d';
      case 'scheduled': return '#17a2b8';
      default: return '#6c757d';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Active';
      case 'draft': return 'Draft';
      case 'scheduled': return 'Scheduled';
      default: return status;
    }
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="exam-management">
      <div className="page-header">
        <h2>Exam Management</h2>
        <p>Create and manage your examinations</p>
        <button
          className="btn btn-success"
          onClick={() => setShowCreateForm(true)}
        >
          + Create New Exam
        </button>
      </div>

      {showCreateForm && (
        <div className="create-exam-form">
          <div className="form-header">
            <h3>{editingExam ? 'Edit Exam' : 'Create New Exam'}</h3>
            <button
              className="btn btn-danger"
              onClick={() => {
                setShowCreateForm(false);
                setEditingExam(null);
                setFormData({
                  title: '',
                  subject: '',
                  date: '',
                  time: '',
                  duration: '',
                  totalQuestions: '',
                  instructions: '',
                  status: 'draft'
                });
              }}
            >
              Cancel
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Exam Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-input"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Subject</label>
                <select
                  name="subject"
                  className="form-input"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Subject</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="English">English</option>
                  <option value="History">History</option>
                  <option value="Computer Science">Computer Science</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  name="date"
                  className="form-input"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Time</label>
                <input
                  type="time"
                  name="time"
                  className="form-input"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Duration (minutes)</label>
                <input
                  type="number"
                  name="duration"
                  className="form-input"
                  value={formData.duration}
                  onChange={handleInputChange}
                  min="15"
                  max="300"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Total Questions</label>
                <input
                  type="number"
                  name="totalQuestions"
                  className="form-input"
                  value={formData.totalQuestions}
                  onChange={handleInputChange}
                  min="1"
                  max="100"
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Instructions</label>
              <textarea
                name="instructions"
                className="form-input"
                rows="4"
                value={formData.instructions}
                onChange={handleInputChange}
                placeholder="Enter exam instructions..."
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                name="status"
                className="form-input"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
                <option value="active">Active</option>
              </select>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn btn-success">
                {editingExam ? 'Update Exam' : 'Create Exam'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="exams-list">
        <h3>Your Exams</h3>
        <div className="exams-grid">
          {exams.map((exam) => (
            <div key={exam.id} className="exam-card">
              <div className="exam-header">
                <div className="exam-subject">{exam.subject}</div>
                <div 
                  className="exam-status"
                  style={{ color: getStatusColor(exam.status) }}
                >
                  {getStatusText(exam.status)}
                </div>
              </div>
              
              <h4 className="exam-title">{exam.title}</h4>
              
              <div className="exam-details">
                <div className="exam-detail">
                  <span className="detail-icon">📅</span>
                  <span>{exam.date} at {exam.time}</span>
                </div>
                <div className="exam-detail">
                  <span className="detail-icon">⏱️</span>
                  <span>{exam.duration} minutes</span>
                </div>
                <div className="exam-detail">
                  <span className="detail-icon">❓</span>
                  <span>{exam.totalQuestions} questions</span>
                </div>
                <div className="exam-detail">
                  <span className="detail-icon">👥</span>
                  <span>{exam.studentsEnrolled} enrolled</span>
                </div>
                <div className="exam-detail">
                  <span className="detail-icon">📝</span>
                  <span>{exam.submissions} submissions</span>
                </div>
              </div>
              
              <div className="exam-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => handleEdit(exam)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() => alert(`View submissions for ${exam.title}`)}
                >
                  View Submissions
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(exam.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {exams.length === 0 && (
          <div className="no-exams">
            <div className="no-exams-icon">📝</div>
            <h3>No Exams Created</h3>
            <p>Start by creating your first exam.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamManagement;