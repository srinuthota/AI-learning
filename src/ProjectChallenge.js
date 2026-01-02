import React, { useState, useEffect, useRef } from 'react';
import './ProjectChallenge.css';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import PhysicsVisualizer from './PhysicsVisualizer';

function ProjectChallenge({ project, user, onBack, onSubmit }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [code, setCode] = useState('// Write your solution here\n\n');
  const [description, setDescription] = useState('');
  const [showVisualizer, setShowVisualizer] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const canvasRef = useRef(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleSubmit = () => {
    if (!code.trim() || !description.trim()) {
      alert('Please fill in both code and description');
      return;
    }

    onSubmit({
      code,
      description,
      screenshot: null
    });

    setSubmissionStatus('success');
    setTimeout(() => {
      onBack();
    }, 2000);
  };

  const handleRunVisualization = () => {
    setShowVisualizer(true);
  };

  const handleDownloadCode = () => {
    const element = document.createElement('a');
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${project.id}.js`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="project-challenge-page">
      {/* Background */}
      <div className="challenge-background"></div>

      {/* Header */}
      <header className="challenge-header">
        <div className="header-left">
          <button onClick={onBack} className="back-btn">← Back to Projects</button>
        </div>
        <div className="header-center">
          <h1>{project.title}</h1>
          <span className={`level-badge ${project.difficulty}`}>{project.level}</span>
        </div>
        <div className="header-right">
          <span className="user-email">{user.email}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      {/* Tabs */}
      <div className="challenge-tabs">
        <button
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📋 Overview
        </button>
        <button
          className={`tab-btn ${activeTab === 'code' ? 'active' : ''}`}
          onClick={() => setActiveTab('code')}
        >
          💻 Code Editor
        </button>
        <button
          className={`tab-btn ${activeTab === 'visualize' ? 'active' : ''}`}
          onClick={() => setActiveTab('visualize')}
        >
          🎨 Visualize
        </button>
        <button
          className={`tab-btn ${activeTab === 'submit' ? 'active' : ''}`}
          onClick={() => setActiveTab('submit')}
        >
          ✅ Submit
        </button>
      </div>

      {/* Content */}
      <main className="challenge-content">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="overview-intro">
              <h2>{project.title}</h2>
              <p className="description">{project.description}</p>
            </div>

            <div className="overview-grid">
              <div className="overview-card">
                <h3>🎯 Learning Objectives</h3>
                <ul>
                  {project.objectives.map((obj, idx) => (
                    <li key={idx}>{obj}</li>
                  ))}
                </ul>
              </div>

              <div className="overview-card">
                <h3>🛠️ Required Skills</h3>
                <div className="skills-badges">
                  {project.skills.map((skill, idx) => (
                    <span key={idx} className="skill-badge">{skill}</span>
                  ))}
                </div>
                <p className="time-estimate">⏱️ Estimated Time: {project.timeToComplete}</p>
              </div>

              <div className="overview-card">
                <h3>📚 Learning Resources</h3>
                <p>Review the course materials before starting this project:</p>
                <ul>
                  <li>📖 Course theory and concepts</li>
                  <li>🎥 Video tutorials relevant to this project</li>
                  <li>📝 Course notes and documentation</li>
                  <li>🔗 External references and papers</li>
                </ul>
              </div>

              <div className="overview-card">
                <h3>⚙️ Project Setup</h3>
                <p>Start with the starter code in the Code Editor:</p>
                <ul>
                  <li>✓ Basic structure provided</li>
                  <li>✓ Helper functions included</li>
                  <li>✓ Visualization framework ready</li>
                  <li>✓ Comments guide your implementation</li>
                </ul>
              </div>
            </div>

            <div className="tips-section">
              <h3>💡 Pro Tips</h3>
              <div className="tips-list">
                <div className="tip">
                  <span className="tip-icon">1️⃣</span>
                  <p>Start with the simplest approach, then optimize</p>
                </div>
                <div className="tip">
                  <span className="tip-icon">2️⃣</span>
                  <p>Use the visualizer to debug your code in real-time</p>
                </div>
                <div className="tip">
                  <span className="tip-icon">3️⃣</span>
                  <p>Test edge cases and extreme values</p>
                </div>
                <div className="tip">
                  <span className="tip-icon">4️⃣</span>
                  <p>Document your code with comments</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Code Editor Tab */}
        {activeTab === 'code' && (
          <div className="code-section">
            <div className="editor-container">
              <div className="editor-header">
                <h3>💻 Code Editor</h3>
                <div className="editor-actions">
                  <button
                    className="action-btn run-btn"
                    onClick={handleRunVisualization}
                    title="Run and visualize your code"
                  >
                    ▶ Run & Visualize
                  </button>
                  <button
                    className="action-btn download-btn"
                    onClick={handleDownloadCode}
                    title="Download your code"
                  >
                    ⬇ Download
                  </button>
                </div>
              </div>
              <textarea
                className="code-editor"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="// Write your solution here"
                spellCheck="false"
              />
            </div>

            <div className="editor-sidebar">
              <h4>📖 Starter Structure</h4>
              <pre className="starter-code">{`// Physical AI Project Template
class RobotArm {
  constructor(config) {
    // Initialize arm parameters
  }

  forwardKinematics(angles) {
    // Calculate end-effector position
  }

  inverseKinematics(position) {
    // Calculate joint angles
  }
}`}</pre>
            </div>
          </div>
        )}

        {/* Visualize Tab */}
        {activeTab === 'visualize' && (
          <div className="visualize-section">
            <PhysicsVisualizer
              project={project}
              code={code}
              canvasRef={canvasRef}
            />
          </div>
        )}

        {/* Submit Tab */}
        {activeTab === 'submit' && (
          <div className="submit-section">
            <div className="submit-form">
              <h2>📝 Submit Your Project</h2>

              {submissionStatus === 'success' && (
                <div className="success-message">
                  <h3>✅ Submitted Successfully!</h3>
                  <p>Your project has been recorded. Great work!</p>
                </div>
              )}

              {submissionStatus !== 'success' && (
                <>
                  <div className="form-group">
                    <label>Project Description</label>
                    <p className="helper-text">
                      Explain your approach, challenges you faced, and how you solved them
                    </p>
                    <textarea
                      className="description-input"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your solution..."
                      rows="8"
                    />
                  </div>

                  <div className="checklist">
                    <h3>Before You Submit:</h3>
                    <div className="check-item">
                      <input type="checkbox" id="working" defaultChecked />
                      <label htmlFor="working">Code runs without errors</label>
                    </div>
                    <div className="check-item">
                      <input type="checkbox" id="documented" defaultChecked />
                      <label htmlFor="documented">Code is well-documented with comments</label>
                    </div>
                    <div className="check-item">
                      <input type="checkbox" id="tested" defaultChecked />
                      <label htmlFor="tested">Tested with multiple inputs/cases</label>
                    </div>
                    <div className="check-item">
                      <input type="checkbox" id="optimized" />
                      <label htmlFor="optimized">Code is optimized for performance</label>
                    </div>
                  </div>

                  <button
                    className="submit-btn"
                    onClick={handleSubmit}
                    disabled={!code.trim() || !description.trim()}
                  >
                    🚀 Submit Project
                  </button>

                  <p className="submit-note">
                    Your submission will be recorded and can be used for your portfolio
                  </p>
                </>
              )}
            </div>

            <div className="submission-info">
              <h3>📋 What Happens Next?</h3>
              <div className="info-card">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Code Review</h4>
                    <p>Your solution will be reviewed for correctness and quality</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Feedback</h4>
                    <p>Receive detailed feedback on your implementation</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Portfolio</h4>
                    <p>Add to your portfolio and share with employers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ProjectChallenge;
