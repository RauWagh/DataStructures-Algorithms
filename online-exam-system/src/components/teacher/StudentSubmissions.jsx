import React, { useState, useEffect } from 'react';
import './StudentSubmissions.css';

const StudentSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExam, setSelectedExam] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Simulate API call to fetch submissions
    const fetchSubmissions = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockSubmissions = [
        {
          id: 1,
          studentName: 'John Doe',
          studentId: 'STU001',
          examTitle: 'Mathematics Final Exam',
          subject: 'Mathematics',
          submittedAt: '2024-01-10T14:30:00',
          score: 85,
          totalQuestions: 50,
          correctAnswers: 42,
          timeTaken: 95,
          status: 'graded',
          grade: 'A',
          feedback: 'Excellent work on calculus problems. Need improvement in statistics section.'
        },
        {
          id: 2,
          studentName: 'Jane Smith',
          studentId: 'STU002',
          examTitle: 'Mathematics Final Exam',
          subject: 'Mathematics',
          submittedAt: '2024-01-10T15:45:00',
          score: 92,
          totalQuestions: 50,
          correctAnswers: 46,
          timeTaken: 88,
          status: 'graded',
          grade: 'A+',
          feedback: 'Outstanding performance across all sections!'
        },
        {
          id: 3,
          studentName: 'Mike Johnson',
          studentId: 'STU003',
          examTitle: 'Physics Midterm',
          subject: 'Physics',
          submittedAt: '2024-01-05T16:20:00',
          score: 78,
          totalQuestions: 30,
          correctAnswers: 23,
          timeTaken: 75,
          status: 'graded',
          grade: 'B+',
          feedback: 'Good understanding of mechanics. Thermodynamics needs more practice.'
        },
        {
          id: 4,
          studentName: 'Sarah Wilson',
          studentId: 'STU004',
          examTitle: 'Chemistry Quiz',
          subject: 'Chemistry',
          submittedAt: '2024-01-02T10:15:00',
          score: 88,
          totalQuestions: 25,
          correctAnswers: 22,
          timeTaken: 45,
          status: 'pending',
          grade: null,
          feedback: null
        },
        {
          id: 5,
          studentName: 'David Brown',
          studentId: 'STU005',
          examTitle: 'Chemistry Quiz',
          subject: 'Chemistry',
          submittedAt: '2024-01-02T11:30:00',
          score: 76,
          totalQuestions: 25,
          correctAnswers: 19,
          timeTaken: 52,
          status: 'pending',
          grade: null,
          feedback: null
        }
      ];
      
      setSubmissions(mockSubmissions);
      setLoading(false);
    };

    fetchSubmissions();
  }, []);

  const exams = [...new Set(submissions.map(s => s.examTitle))];

  const filteredSubmissions = submissions.filter(submission => {
    const examMatch = selectedExam === 'all' || submission.examTitle === selectedExam;
    const statusMatch = filterStatus === 'all' || submission.status === filterStatus;
    return examMatch && statusMatch;
  });

  const handleGrade = (submissionId) => {
    // In a real app, this would open a grading interface
    alert(`Grading interface would open for submission ${submissionId}`);
  };

  const handleViewDetails = (submission) => {
    // In a real app, this would show detailed submission view
    alert(`Viewing details for ${submission.studentName}'s ${submission.examTitle} submission`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'graded': return '#28a745';
      case 'pending': return '#ffc107';
      case 'submitted': return '#17a2b8';
      default: return '#6c757d';
    }
  };

  const getGradeColor = (grade) => {
    if (grade?.startsWith('A')) return '#28a745';
    if (grade?.startsWith('B')) return '#17a2b8';
    if (grade?.startsWith('C')) return '#ffc107';
    return '#dc3545';
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="student-submissions">
      <div className="page-header">
        <h2>Student Submissions</h2>
        <p>Review and grade student exam submissions</p>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label className="filter-label">Filter by Exam:</label>
          <select
            className="filter-select"
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
          >
            <option value="all">All Exams</option>
            {exams.map(exam => (
              <option key={exam} value={exam}>{exam}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label className="filter-label">Filter by Status:</label>
          <select
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending Review</option>
            <option value="graded">Graded</option>
            <option value="submitted">Submitted</option>
          </select>
        </div>
      </div>

      <div className="submissions-overview">
        <div className="overview-stats">
          <div className="stat-item">
            <div className="stat-value">{filteredSubmissions.length}</div>
            <div className="stat-label">Total Submissions</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">
              {filteredSubmissions.filter(s => s.status === 'pending').length}
            </div>
            <div className="stat-label">Pending Review</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">
              {Math.round(filteredSubmissions.filter(s => s.status === 'graded').reduce((acc, s) => acc + s.score, 0) / filteredSubmissions.filter(s => s.status === 'graded').length) || 0}%
            </div>
            <div className="stat-label">Average Score</div>
          </div>
        </div>
      </div>

      <div className="submissions-table">
        <div className="table-header">
          <div className="header-cell">Student</div>
          <div className="header-cell">Exam</div>
          <div className="header-cell">Submitted</div>
          <div className="header-cell">Score</div>
          <div className="header-cell">Status</div>
          <div className="header-cell">Actions</div>
        </div>
        
        <div className="table-body">
          {filteredSubmissions.map((submission) => (
            <div key={submission.id} className="table-row">
              <div className="table-cell student-info">
                <div className="student-name">{submission.studentName}</div>
                <div className="student-id">{submission.studentId}</div>
              </div>
              
              <div className="table-cell exam-info">
                <div className="exam-title">{submission.examTitle}</div>
                <div className="exam-subject">{submission.subject}</div>
              </div>
              
              <div className="table-cell">
                {formatDate(submission.submittedAt)}
              </div>
              
              <div className="table-cell score-info">
                {submission.status === 'graded' ? (
                  <>
                    <div className="score-value">{submission.score}%</div>
                    <div className="grade-badge" style={{ color: getGradeColor(submission.grade) }}>
                      {submission.grade}
                    </div>
                  </>
                ) : (
                  <div className="score-value">-</div>
                )}
              </div>
              
              <div className="table-cell">
                <span 
                  className="status-badge"
                  style={{ color: getStatusColor(submission.status) }}
                >
                  {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                </span>
              </div>
              
              <div className="table-cell actions">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleViewDetails(submission)}
                >
                  View
                </button>
                {submission.status === 'pending' && (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleGrade(submission.id)}
                  >
                    Grade
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredSubmissions.length === 0 && (
        <div className="no-submissions">
          <div className="no-submissions-icon">📝</div>
          <h3>No Submissions Found</h3>
          <p>No submissions match the current filters.</p>
        </div>
      )}
    </div>
  );
};

export default StudentSubmissions;