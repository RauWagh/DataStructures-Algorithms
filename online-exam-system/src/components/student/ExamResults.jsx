import React, { useState, useEffect } from 'react';
import './ExamResults.css';

const ExamResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedResult, setSelectedResult] = useState(null);

  useEffect(() => {
    // Simulate API call to fetch results
    const fetchResults = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockResults = [
        {
          id: 1,
          examTitle: 'Mathematics Final Exam',
          subject: 'Mathematics',
          date: '2024-01-10',
          score: 85,
          totalQuestions: 50,
          correctAnswers: 42,
          timeTaken: 95,
          totalTime: 120,
          grade: 'A',
          feedback: 'Excellent work on calculus problems. Need improvement in statistics section.',
          detailedResults: {
            algebra: { correct: 15, total: 18, percentage: 83 },
            calculus: { correct: 18, total: 20, percentage: 90 },
            statistics: { correct: 9, total: 12, percentage: 75 }
          }
        },
        {
          id: 2,
          examTitle: 'Physics Midterm',
          subject: 'Physics',
          date: '2024-01-05',
          score: 78,
          totalQuestions: 30,
          correctAnswers: 23,
          timeTaken: 75,
          totalTime: 90,
          grade: 'B+',
          feedback: 'Good understanding of mechanics. Thermodynamics needs more practice.',
          detailedResults: {
            mechanics: { correct: 12, total: 15, percentage: 80 },
            thermodynamics: { correct: 8, total: 12, percentage: 67 },
            waves: { correct: 3, total: 3, percentage: 100 }
          }
        },
        {
          id: 3,
          examTitle: 'Chemistry Quiz',
          subject: 'Chemistry',
          date: '2024-01-02',
          score: 92,
          totalQuestions: 25,
          correctAnswers: 23,
          timeTaken: 45,
          totalTime: 60,
          grade: 'A',
          feedback: 'Outstanding performance! Excellent grasp of organic chemistry concepts.',
          detailedResults: {
            organic: { correct: 15, total: 16, percentage: 94 },
            inorganic: { correct: 8, total: 9, percentage: 89 }
          }
        },
        {
          id: 4,
          examTitle: 'English Literature Test',
          subject: 'English',
          date: '2023-12-28',
          score: 88,
          totalQuestions: 40,
          correctAnswers: 35,
          timeTaken: 65,
          totalTime: 75,
          grade: 'A-',
          feedback: 'Strong analytical skills. Essay writing shows good depth of understanding.',
          detailedResults: {
            shakespeare: { correct: 12, total: 15, percentage: 80 },
            modern: { correct: 18, total: 20, percentage: 90 },
            essay: { correct: 5, total: 5, percentage: 100 }
          }
        }
      ];
      
      setResults(mockResults);
      setLoading(false);
    };

    fetchResults();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getScoreColor = (score) => {
    if (score >= 90) return '#28a745';
    if (score >= 80) return '#17a2b8';
    if (score >= 70) return '#ffc107';
    return '#dc3545';
  };

  const getGradeColor = (grade) => {
    if (grade === 'A') return '#28a745';
    if (grade === 'B') return '#17a2b8';
    if (grade === 'C') return '#ffc107';
    return '#dc3545';
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="exam-results">
      <div className="page-header">
        <h2>Exam Results</h2>
        <p>View your performance and detailed analysis</p>
      </div>

      <div className="results-overview">
        <div className="overview-stats">
          <div className="stat-item">
            <div className="stat-value">{results.length}</div>
            <div className="stat-label">Total Exams</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">
              {Math.round(results.reduce((acc, result) => acc + result.score, 0) / results.length)}%
            </div>
            <div className="stat-label">Average Score</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">
              {results.filter(r => r.score >= 80).length}
            </div>
            <div className="stat-label">High Scores (80%+)</div>
          </div>
        </div>
      </div>

      <div className="results-grid">
        {results.map((result) => (
          <div key={result.id} className="result-card">
            <div className="result-header">
              <div className="result-subject">{result.subject}</div>
              <div className="result-grade" style={{ color: getGradeColor(result.grade) }}>
                {result.grade}
              </div>
            </div>
            
            <h3 className="result-title">{result.examTitle}</h3>
            
            <div className="result-score">
              <div className="score-circle" style={{ '--score-color': getScoreColor(result.score) }}>
                <span className="score-value">{result.score}%</span>
              </div>
            </div>
            
            <div className="result-details">
              <div className="result-detail">
                <span className="detail-icon">📅</span>
                <span>{formatDate(result.date)}</span>
              </div>
              <div className="result-detail">
                <span className="detail-icon">✅</span>
                <span>{result.correctAnswers}/{result.totalQuestions} correct</span>
              </div>
              <div className="result-detail">
                <span className="detail-icon">⏱️</span>
                <span>{result.timeTaken}/{result.totalTime} minutes</span>
              </div>
            </div>
            
            <div className="result-feedback">
              <strong>Feedback:</strong> {result.feedback}
            </div>
            
            <div className="result-actions">
              <button
                className="btn btn-primary"
                onClick={() => setSelectedResult(result)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedResult && (
        <div className="modal-overlay" onClick={() => setSelectedResult(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedResult.examTitle} - Detailed Results</h3>
              <button className="modal-close" onClick={() => setSelectedResult(null)}>
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="detailed-score">
                <div className="score-breakdown">
                  <h4>Score Breakdown</h4>
                  {Object.entries(selectedResult.detailedResults).map(([section, data]) => (
                    <div key={section} className="section-score">
                      <div className="section-header">
                        <span className="section-name">{section.charAt(0).toUpperCase() + section.slice(1)}</span>
                        <span className="section-percentage">{data.percentage}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${data.percentage}%` }}
                        ></div>
                      </div>
                      <div className="section-detail">
                        {data.correct} out of {data.total} questions correct
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="performance-summary">
                  <h4>Performance Summary</h4>
                  <div className="summary-item">
                    <span>Overall Score:</span>
                    <span className="summary-value">{selectedResult.score}%</span>
                  </div>
                  <div className="summary-item">
                    <span>Grade:</span>
                    <span className="summary-value" style={{ color: getGradeColor(selectedResult.grade) }}>
                      {selectedResult.grade}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span>Time Efficiency:</span>
                    <span className="summary-value">
                      {Math.round((selectedResult.timeTaken / selectedResult.totalTime) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {results.length === 0 && (
        <div className="no-results">
          <div className="no-results-icon">📊</div>
          <h3>No Results Available</h3>
          <p>You haven't completed any exams yet.</p>
        </div>
      )}
    </div>
  );
};

export default ExamResults;