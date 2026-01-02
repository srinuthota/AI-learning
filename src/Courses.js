import React, { useState } from 'react';
import './Courses.css';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';

function Courses({ user, onEnroll }) {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const handleEnroll = (courseId) => {
    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses([...enrolledCourses, courseId]);
      // Navigate to course learning page after enrolling
      setTimeout(() => onEnroll(courseId), 500);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="courses-page">
      <div className="courses-background">
        <svg className="circuit-background" viewBox="0 0 1440 800" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#667eea', stopOpacity: 0.1 }} />
              <stop offset="100%" style={{ stopColor: '#764ba2', stopOpacity: 0.1 }} />
            </linearGradient>
          </defs>
          <rect width="1440" height="800" fill="url(#circuit-gradient)" />
          {/* Circuit lines */}
          <line x1="100" y1="100" x2="400" y2="100" stroke="#667eea" strokeWidth="2" opacity="0.2" />
          <line x1="400" y1="100" x2="400" y2="300" stroke="#667eea" strokeWidth="2" opacity="0.2" />
          <line x1="1100" y1="200" x2="1300" y2="200" stroke="#764ba2" strokeWidth="2" opacity="0.2" />
          <line x1="1300" y1="200" x2="1300" y2="400" stroke="#764ba2" strokeWidth="2" opacity="0.2" />
          <circle cx="400" cy="100" r="5" fill="#667eea" opacity="0.3" />
          <circle cx="400" cy="300" r="5" fill="#667eea" opacity="0.3" />
          <circle cx="1300" cy="200" r="5" fill="#764ba2" opacity="0.3" />
          <circle cx="1300" cy="400" r="5" fill="#764ba2" opacity="0.3" />
        </svg>
      </div>

      {/* Header */}
      <header className="courses-header">
        <div className="header-content">
          <h1>🤖 AI Courses Platform</h1>
          <div className="user-info">
            <span className="user-email">{user.email}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="courses-main">
        <div className="welcome-section">
          <h2>Welcome to Your Learning Journey</h2>
          <p>Explore cutting-edge AI and robotics courses designed for the future</p>
        </div>

        {/* Courses Grid */}
        <div className="courses-grid">
          {/* Physical AI Course */}
          <div className="course-card-large">
            <div className="course-header">
              <div className="course-icon-large">🤖</div>
              <div className="course-badge">Advanced</div>
            </div>
            
            <div className="course-content">
              <h3>Physical AI</h3>
              <p className="course-subtitle">Build Intelligent Robots</p>
              
              <div className="course-details">
                <div className="detail-item">
                  <span className="detail-icon">⏱️</span>
                  <span>12 Weeks</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">📊</span>
                  <span>Intermediate</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">👥</span>
                  <span>2,345 Students</span>
                </div>
              </div>

              <div className="course-description">
                <p>Learn to design, build, and program autonomous robots. This comprehensive course covers robotics principles, embedded systems, sensor integration, and real-world applications in industry automation and healthcare.</p>
              </div>

              <div className="course-topics">
                <h4>Topics Covered:</h4>
                <ul>
                  <li>✓ Robot Design & Mechanics</li>
                  <li>✓ Embedded Systems & Microcontrollers</li>
                  <li>✓ Sensor Integration</li>
                  <li>✓ Motion Control & Kinematics</li>
                  <li>✓ ROS Framework</li>
                  <li>✓ Capstone Project</li>
                </ul>
              </div>

              <div className="course-footer">
                <div className="course-rating">⭐ 4.8 (342 reviews)</div>
                {enrolledCourses.includes('physical-ai') ? (
                  <button className="enroll-btn enrolled">✓ Enrolled</button>
                ) : (
                  <button 
                    className="enroll-btn" 
                    onClick={() => handleEnroll('physical-ai')}
                  >
                    Enroll Now
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Generative AI Course */}
          <div className="course-card-large">
            <div className="course-header">
              <div className="course-icon-large">✨</div>
              <div className="course-badge">Expert</div>
            </div>
            
            <div className="course-content">
              <h3>Generative AI</h3>
              <p className="course-subtitle">Create with AI Models</p>
              
              <div className="course-details">
                <div className="detail-item">
                  <span className="detail-icon">⏱️</span>
                  <span>10 Weeks</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">📊</span>
                  <span>Advanced</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">👥</span>
                  <span>3,892 Students</span>
                </div>
              </div>

              <div className="course-description">
                <p>Master the latest in generative AI technologies. Learn how to build, train, and deploy large language models, image generation systems, and creative AI applications. Includes practical experience with state-of-the-art models.</p>
              </div>

              <div className="course-topics">
                <h4>Topics Covered:</h4>
                <ul>
                  <li>✓ Transformer Architecture</li>
                  <li>✓ Large Language Models (LLMs)</li>
                  <li>✓ Image Generation (Diffusion)</li>
                  <li>✓ Fine-tuning & Prompt Engineering</li>
                  <li>✓ Deployment & Optimization</li>
                  <li>✓ Capstone Project</li>
                </ul>
              </div>

              <div className="course-footer">
                <div className="course-rating">⭐ 4.9 (567 reviews)</div>
                {enrolledCourses.includes('generative-ai') ? (
                  <button className="enroll-btn enrolled">✓ Enrolled</button>
                ) : (
                  <button 
                    className="enroll-btn" 
                    onClick={() => handleEnroll('generative-ai')}
                  >
                    Enroll Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Enrolled Courses Section */}
        {enrolledCourses.length > 0 && (
          <div className="enrolled-section">
            <h2>Your Enrolled Courses</h2>
            <div className="enrolled-courses">
              {enrolledCourses.includes('physical-ai') && (
                <div className="enrolled-card">
                  <span>🤖 Physical AI</span>
                  <span className="progress">Progress: 0%</span>
                </div>
              )}
              {enrolledCourses.includes('generative-ai') && (
                <div className="enrolled-card">
                  <span>✨ Generative AI</span>
                  <span className="progress">Progress: 0%</span>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Courses;