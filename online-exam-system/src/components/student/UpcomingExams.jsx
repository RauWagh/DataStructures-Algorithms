import React, { useState, useEffect } from 'react';
import './UpcomingExams.css';

const UpcomingExams = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

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
          status: 'upcoming',
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
          status: 'upcoming',
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
          status: 'upcoming',
          instructions: 'This quiz covers Organic Chemistry basics. No calculators needed.'
        },
        {
          id: 4,
          title: 'English Literature Test',
          subject: 'English',
          date: '2024-01-22',
          time: '11:00 AM',
          duration: 75,
          totalQuestions: 40,
          status: 'available',
          instructions: 'This test covers Shakespeare and Modern Literature. Essay questions included.'
        }
      ];
      
      setExams(mockExams);
      setLoading(false);
    };

    fetchExams();
  }, []);

  const handleStartExam = (examId) => {
    // In a real app, this would navigate to the exam interface
    alert(`Starting exam ${examId}. This would redirect to the exam interface.`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTimeUntilExam = (dateString, timeString) => {
    const examDateTime = new Date(`${dateString}T${timeString}`);
    const now = new Date();
    const diff = examDateTime - now;
    
    if (diff <= 0) return 'Available now';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} remaining`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} remaining`;
    return `${minutes} minute${minutes > 1 ? 's' : ''} remaining`;
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="upcoming-exams">
      <div className="page-header">
        <h2>Upcoming Exams</h2>
        <p>View and start your scheduled examinations</p>
      </div>

      <div className="exams-grid">
        {exams.map((exam) => (
          <div key={exam.id} className="exam-card">
            <div className="exam-header">
              <div className="exam-subject">{exam.subject}</div>
              <div className={`exam-status ${exam.status}`}>
                {exam.status === 'available' ? 'Available Now' : 'Upcoming'}
              </div>
            </div>
            
            <h3 className="exam-title">{exam.title}</h3>
            
            <div className="exam-details">
              <div className="exam-detail">
                <span className="detail-icon">📅</span>
                <span>{formatDate(exam.date)}</span>
              </div>
              <div className="exam-detail">
                <span className="detail-icon">⏰</span>
                <span>{exam.time}</span>
              </div>
              <div className="exam-detail">
                <span className="detail-icon">⏱️</span>
                <span>{exam.duration} minutes</span>
              </div>
              <div className="exam-detail">
                <span className="detail-icon">❓</span>
                <span>{exam.totalQuestions} questions</span>
              </div>
            </div>
            
            <div className="exam-time-remaining">
              {getTimeUntilExam(exam.date, exam.time)}
            </div>
            
            <div className="exam-instructions">
              <strong>Instructions:</strong> {exam.instructions}
            </div>
            
            <div className="exam-actions">
              <button
                className={`btn ${exam.status === 'available' ? 'btn-success' : 'btn-primary'}`}
                onClick={() => handleStartExam(exam.id)}
                disabled={exam.status === 'upcoming'}
              >
                {exam.status === 'available' ? 'Start Exam' : 'Not Available Yet'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {exams.length === 0 && (
        <div className="no-exams">
          <div className="no-exams-icon">📝</div>
          <h3>No Upcoming Exams</h3>
          <p>You don't have any scheduled exams at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default UpcomingExams;