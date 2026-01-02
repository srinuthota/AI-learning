import React, { useState, useEffect } from 'react';
import './ApplyProjects.css';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
import ProjectChallenge from './ProjectChallenge';

function ApplyProjects({ user, completedCourses, onBack }) {
  const [activeTab, setActiveTab] = useState('projects');
  const [selectedProject, setSelectedProject] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  // Real-world projects based on completed courses
  const projects = {
    'physical-ai': [
      {
        id: 'robot-arm-simulation',
        title: '🦾 Robotic Arm Control Simulator',
        level: 'Intermediate',
        description: 'Build and control a virtual robotic arm using kinematics principles learned in the course',
        objectives: [
          'Implement forward kinematics for a 3-DOF arm',
          'Control joint angles to reach target positions',
          'Calculate inverse kinematics for end-effector placement',
          'Visualize the arm in 3D space'
        ],
        skills: ['Robot Kinematics', 'Control Systems', '3D Visualization'],
        timeToComplete: '2-3 hours',
        type: 'visualization',
        difficulty: 'medium'
      },
      {
        id: 'autonomous-robot-navigation',
        title: '🚗 Autonomous Navigation System',
        level: 'Advanced',
        description: 'Create an autonomous robot that navigates through obstacles using sensor fusion and pathfinding',
        objectives: [
          'Implement sensor fusion from multiple sensors',
          'Build pathfinding algorithm (A* or Dijkstra)',
          'Handle real-time collision avoidance',
          'Optimize navigation efficiency'
        ],
        skills: ['Sensor Fusion', 'Motion Planning', 'Real-time Control'],
        timeToComplete: '3-4 hours',
        type: 'visualization',
        difficulty: 'hard'
      },
      {
        id: 'drone-flight-simulator',
        title: '🚁 Drone Flight Dynamics Simulator',
        level: 'Advanced',
        description: 'Simulate drone physics with realistic flight dynamics and PID control',
        objectives: [
          'Model drone dynamics and physics',
          'Implement PID control for stability',
          'Add wind simulation and perturbations',
          'Create flight path planning UI'
        ],
        skills: ['Control Theory', 'Physics Simulation', 'PID Control'],
        timeToComplete: '4-5 hours',
        type: 'visualization',
        difficulty: 'hard'
      }
    ],
    'generative-ai': [
      {
        id: 'text-generation-model',
        title: '📝 Text Generation AI Chatbot',
        level: 'Intermediate',
        description: 'Build an interactive chatbot using transformer concepts to generate contextual responses',
        objectives: [
          'Implement attention mechanism visualization',
          'Create prompt engineering interface',
          'Build response quality analyzer',
          'Fine-tune model on custom dataset'
        ],
        skills: ['Transformers', 'Prompt Engineering', 'NLP'],
        timeToComplete: '3-4 hours',
        type: 'interactive',
        difficulty: 'medium'
      },
      {
        id: 'image-generation-playground',
        title: '🎨 AI Image Generator Playground',
        level: 'Advanced',
        description: 'Create an interactive tool for generating images with diffusion models and style transfer',
        objectives: [
          'Implement diffusion process visualization',
          'Build prompt-to-image generator',
          'Add style transfer capabilities',
          'Create image comparison tools'
        ],
        skills: ['Diffusion Models', 'Image Processing', 'Neural Networks'],
        timeToComplete: '4-5 hours',
        type: 'interactive',
        difficulty: 'hard'
      },
      {
        id: 'code-generation-assistant',
        title: '💻 AI Code Generation Assistant',
        level: 'Beginner',
        description: 'Build a coding assistant that suggests functions, refactors code, and explains functionality',
        objectives: [
          'Parse and analyze code structure',
          'Generate function suggestions',
          'Refactor code for optimization',
          'Provide explanations using LLM'
        ],
        skills: ['Code Generation', 'AST Parsing', 'LLM Integration'],
        timeToComplete: '2-3 hours',
        type: 'interactive',
        difficulty: 'easy'
      }
    ]
  };

  // Combine projects from all completed courses
  const availableProjects = Object.keys(projects)
    .filter(courseId => completedCourses?.includes(courseId))
    .flatMap(courseId => projects[courseId].map(p => ({ ...p, courseId })));

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setActiveTab('challenge');
  };

  const handleProjectSubmit = (submission) => {
    const newSubmission = {
      id: Date.now(),
      projectId: selectedProject.id,
      projectTitle: selectedProject.title,
      submittedAt: new Date().toLocaleDateString(),
      code: submission.code,
      description: submission.description,
      screenshot: submission.screenshot
    };
    setSubmissions([...submissions, newSubmission]);
    alert('✅ Project submitted successfully!');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (selectedProject && activeTab === 'challenge') {
    return (
      <ProjectChallenge
        project={selectedProject}
        user={user}
        onBack={() => {
          setSelectedProject(null);
          setActiveTab('projects');
        }}
        onSubmit={handleProjectSubmit}
      />
    );
  }

  return (
    <div className="apply-projects-page">
      {/* Background */}
      <div className="projects-background"></div>

      {/* Header */}
      <header className="projects-header">
        <div className="header-left">
          <button onClick={onBack} className="back-btn">← Back to Courses</button>
        </div>
        <div className="header-center">
          <h1>🚀 Apply Your Skills</h1>
          <p>Build real-world projects using concepts you learned</p>
        </div>
        <div className="header-right">
          <span className="user-email">{user.email}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      {/* Tabs */}
      <div className="tabs-container">
        <button
          className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          📚 Available Projects
        </button>
        <button
          className={`tab-btn ${activeTab === 'submissions' ? 'active' : ''}`}
          onClick={() => setActiveTab('submissions')}
        >
          ✅ My Submissions ({submissions.length})
        </button>
      </div>

      {/* Content */}
      <main className="projects-content">
        {activeTab === 'projects' && (
          <div className="projects-section">
            {availableProjects.length === 0 ? (
              <div className="no-projects">
                <div className="empty-state">
                  <h2>🔒 No Projects Available</h2>
                  <p>Complete courses to unlock real-world project challenges!</p>
                  <button onClick={onBack} className="unlock-btn">
                    Go Back to Courses
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="projects-intro">
                  <h2>🎯 Real-World Applications</h2>
                  <p>
                    Transform your learning into practical skills. These projects let you apply course concepts
                    to build actual applications, simulations, and tools.
                  </p>
                </div>

                <div className="projects-grid">
                  {availableProjects.map((project) => (
                    <div key={project.id} className="project-card">
                      <div className="project-header">
                        <h3>{project.title}</h3>
                        <span className={`difficulty ${project.difficulty}`}>
                          {project.level}
                        </span>
                      </div>

                      <p className="project-description">{project.description}</p>

                      <div className="project-meta">
                        <div className="meta-item">
                          <span className="meta-icon">⏱️</span>
                          <span>{project.timeToComplete}</span>
                        </div>
                        <div className="meta-item">
                          <span className="meta-icon">🛠️</span>
                          <span>{project.type === 'visualization' ? '3D Visualization' : 'Interactive'}</span>
                        </div>
                      </div>

                      <div className="skills-list">
                        {project.skills.map((skill, idx) => (
                          <span key={idx} className="skill-tag">{skill}</span>
                        ))}
                      </div>

                      <div className="project-objectives">
                        <p className="objectives-title">What you'll build:</p>
                        <ul>
                          {project.objectives.slice(0, 2).map((obj, idx) => (
                            <li key={idx}>{obj}</li>
                          ))}
                          {project.objectives.length > 2 && (
                            <li className="more">+{project.objectives.length - 2} more objectives</li>
                          )}
                        </ul>
                      </div>

                      <button
                        className="start-project-btn"
                        onClick={() => handleProjectClick(project)}
                      >
                        Start Project →
                      </button>
                    </div>
                  ))}
                </div>

                <div className="projects-benefits">
                  <h3>✨ Why Build These Projects?</h3>
                  <div className="benefits-grid">
                    <div className="benefit">
                      <div className="benefit-icon">🏆</div>
                      <h4>Build Portfolio</h4>
                      <p>Create impressive projects to showcase your skills</p>
                    </div>
                    <div className="benefit">
                      <div className="benefit-icon">💼</div>
                      <h4>Real-World Experience</h4>
                      <p>Apply concepts to actual problems you'll face professionally</p>
                    </div>
                    <div className="benefit">
                      <div className="benefit-icon">🚀</div>
                      <h4>Career Ready</h4>
                      <p>Gain hands-on experience employers are looking for</p>
                    </div>
                    <div className="benefit">
                      <div className="benefit-icon">🧠</div>
                      <h4>Deep Learning</h4>
                      <p>Solidify your understanding through practical implementation</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'submissions' && (
          <div className="submissions-section">
            {submissions.length === 0 ? (
              <div className="no-submissions">
                <div className="empty-state">
                  <h2>📝 No Submissions Yet</h2>
                  <p>Start a project and submit your work to see it here!</p>
                </div>
              </div>
            ) : (
              <>
                <h2>Your Project Submissions</h2>
                <div className="submissions-list">
                  {submissions.map((submission) => (
                    <div key={submission.id} className="submission-card">
                      <div className="submission-header">
                        <h4>{submission.projectTitle}</h4>
                        <span className="submission-date">{submission.submittedAt}</span>
                      </div>
                      <p className="submission-description">{submission.description}</p>
                      {submission.screenshot && (
                        <div className="submission-screenshot">
                          <img src={submission.screenshot} alt="Project screenshot" />
                        </div>
                      )}
                      <div className="submission-code">
                        <p className="code-label">Code:</p>
                        <pre><code>{submission.code.substring(0, 200)}...</code></pre>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default ApplyProjects;
