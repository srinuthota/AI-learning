import React, { useState } from 'react';
import './CourseQuiz.css';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';

function CourseQuiz({ courseId, user, onBack }) {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const quizzes = {
    'physical-ai': {
      title: 'Physical AI',
      icon: '🤖',
      description: 'Test your knowledge of robotics and physical AI systems',
      questions: [
        {
          id: 1,
          question: 'What does DOF (Degrees of Freedom) represent in robotics?',
          options: [
            'The number of independent movements a robot can make',
            'The distance a robot can travel',
            'The power consumption of a robot',
            'The number of sensors on a robot'
          ],
          correct: 0,
          explanation: 'DOF represents the number of independent movements. A 6-DOF arm can position and orient itself in 3D space.'
        },
        {
          id: 2,
          question: 'Which sensor is best for obstacle avoidance in autonomous robots?',
          options: [
            'Thermometer',
            'LiDAR or Ultrasonic sensors',
            'Temperature sensor',
            'Humidity sensor'
          ],
          correct: 1,
          explanation: 'LiDAR and ultrasonic sensors can measure distances to detect obstacles in real-time.'
        },
        {
          id: 3,
          question: 'What is the primary purpose of PID control in robotics?',
          options: [
            'To store robot data',
            'To adjust motor output based on error feedback',
            'To communicate with other robots',
            'To predict future movements'
          ],
          correct: 1,
          explanation: 'PID control continuously adjusts output based on the difference between desired and actual state.'
        },
        {
          id: 4,
          question: 'Forward kinematics calculates what?',
          options: [
            'The joint angles needed for a desired position',
            'The end-effector position from joint angles',
            'The force required to move joints',
            'The energy consumption of movement'
          ],
          correct: 1,
          explanation: 'Forward kinematics computes the end-effector position given the joint angles and robot structure.'
        },
        {
          id: 5,
          question: 'Which microcontroller is commonly used in robotics projects?',
          options: [
            'Graphics Processing Unit',
            'Arduino or Raspberry Pi',
            'Printer driver',
            'Camera module'
          ],
          correct: 1,
          explanation: 'Arduino and Raspberry Pi are popular platforms for controlling robots and processing sensor data.'
        },
        {
          id: 6,
          question: 'What is the main advantage of ROS (Robot Operating System)?',
          options: [
            'It makes robots move faster',
            'It provides middleware and tools for robot development and communication',
            'It reduces the cost of robots',
            'It eliminates the need for sensors'
          ],
          correct: 1,
          explanation: 'ROS provides a flexible framework for writing robot software, with tools for hardware abstraction and message passing.'
        },
        {
          id: 7,
          question: 'In computer vision for robots, what does object detection involve?',
          options: [
            'Measuring temperature',
            'Identifying and locating specific objects in images',
            'Recording sound',
            'Measuring robot weight'
          ],
          correct: 1,
          explanation: 'Object detection enables robots to identify and locate objects in their environment using cameras.'
        },
        {
          id: 8,
          question: 'What is the perception-action cycle in robotics?',
          options: [
            'A robot reading a book',
            'Sensors detect → Process → Actuators act → Repeat',
            'Turning a robot on and off',
            'Charging the robot battery'
          ],
          correct: 1,
          explanation: 'The perception-action cycle is the continuous loop: sense the environment, think about it, and take action.'
        },
        {
          id: 9,
          question: 'Which algorithm is commonly used for robot path planning?',
          options: [
            'Cooking recipe',
            'RRT (Rapidly-exploring Random Trees) or Dijkstra',
            'Spelling checker',
            'Weather prediction'
          ],
          correct: 1,
          explanation: 'RRT and Dijkstra are popular algorithms that find collision-free paths for robots to follow.'
        },
        {
          id: 10,
          question: 'What is sensor fusion in robotics?',
          options: [
            'Combining multiple sensors data for better perception',
            'Heating sensors to high temperatures',
            'Removing sensors from robots',
            'Connecting all sensors to a single wire'
          ],
          correct: 0,
          explanation: 'Sensor fusion combines data from multiple sensors (camera, LiDAR, IMU) to create a more accurate perception.'
        }
      ]
    },
    'generative-ai': {
      title: 'Generative AI',
      icon: '✨',
      description: 'Assess your understanding of generative AI models and techniques',
      questions: [
        {
          id: 1,
          question: 'What is the primary difference between generative and discriminative models?',
          options: [
            'Generative creates data, discriminative classifies data',
            'Generative is faster',
            'Discriminative is more accurate',
            'There is no difference'
          ],
          correct: 0,
          explanation: 'Generative models learn to generate new data, while discriminative models learn to classify existing data.'
        },
        {
          id: 2,
          question: 'What is the Transformer architecture primarily based on?',
          options: [
            'Convolution operations',
            'Recurrent neural networks',
            'Attention mechanisms',
            'Random forests'
          ],
          correct: 2,
          explanation: 'Transformers use self-attention mechanisms to process input in parallel and capture long-range dependencies.'
        },
        {
          id: 3,
          question: 'What does a diffusion model do?',
          options: [
            'Compresses images',
            'Gradually removes noise to generate data',
            'Filters spam emails',
            'Predicts stock prices'
          ],
          correct: 1,
          explanation: 'Diffusion models generate new data by learning to reverse the process of adding noise step-by-step.'
        },
        {
          id: 4,
          question: 'What is prompt engineering in the context of LLMs?',
          options: [
            'Building the AI model from scratch',
            'Writing effective instructions to get better outputs from AI models',
            'Fixing code bugs',
            'Designing computer chips'
          ],
          correct: 1,
          explanation: 'Prompt engineering is the art of crafting inputs to generative AI models to achieve desired outputs.'
        },
        {
          id: 5,
          question: 'Which of these is a Large Language Model (LLM)?',
          options: [
            'Machine learning library',
            'GPT-4 or Llama',
            'Image compression software',
            'Data backup tool'
          ],
          correct: 1,
          explanation: 'LLMs like GPT-4, Claude, and Llama are large neural networks trained on vast text data.'
        },
        {
          id: 6,
          question: 'What does LoRA stand for in fine-tuning?',
          options: [
            'Large Operating Range Adapter',
            'Low-Rank Adaptation',
            'Long Range Analysis',
            'Library Of Reusable Algorithms'
          ],
          correct: 1,
          explanation: 'LoRA is a technique that reduces the number of trainable parameters needed for fine-tuning large models.'
        },
        {
          id: 7,
          question: 'In neural networks, what is backpropagation?',
          options: [
            'Moving data backwards through the network',
            'Computing gradients to update weights during training',
            'Storing data in memory',
            'Copying a neural network'
          ],
          correct: 1,
          explanation: 'Backpropagation efficiently computes gradients of the loss function using the chain rule.'
        },
        {
          id: 8,
          question: 'What is multi-head attention in Transformers?',
          options: [
            'Multiple neural networks stacked together',
            'Processing different representation subspaces in parallel',
            'Having multiple input files',
            'Running multiple computers'
          ],
          correct: 1,
          explanation: 'Multi-head attention allows the model to attend to different parts of input simultaneously.'
        },
        {
          id: 9,
          question: 'What is the main advantage of using pre-trained models?',
          options: [
            'They are always perfect',
            'They require no computing power',
            'They provide a starting point and reduce training time',
            'They eliminate the need for data'
          ],
          correct: 2,
          explanation: 'Pre-trained models transfer knowledge from large datasets, reducing training time and data requirements.'
        },
        {
          id: 10,
          question: 'What is temperature in LLM sampling?',
          options: [
            'The heat of the computer',
            'A parameter controlling randomness of outputs (0=deterministic, >1=more random)',
            'The time it takes to generate text',
            'The number of layers in the model'
          ],
          correct: 1,
          explanation: 'Temperature controls diversity in model outputs: low values make predictions more confident, high values more random.'
        }
      ]
    }
  };

  const quiz = quizzes[courseId];

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleAnswerSelect = (optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: optionIndex
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = () => {
    let finalScore = 0;
    quiz.questions.forEach((question, idx) => {
      if (selectedAnswers[idx] === question.correct) {
        finalScore++;
      }
    });
    setScore(finalScore);
    setShowResults(true);
  };

  const percentage = Math.round((score / quiz.questions.length) * 100);
  const passed = percentage >= 70;

  return (
    <div className="course-quiz-page">
      {/* Background */}
      <div className="quiz-background"></div>

      {/* Header */}
      <header className="quiz-header">
        <button onClick={onBack} className="back-btn">← Back</button>
        <div className="header-title">
          <span className="quiz-icon">{quiz.icon}</span>
          <h1>{quiz.title} - Assignment</h1>
        </div>
        <div className="header-right">
          <span className="user-email">{user.email}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      {!quizStarted ? (
        // Quiz Start Screen
        <div className="quiz-start-screen">
          <div className="start-card">
            <div className="start-icon">{quiz.icon}</div>
            <h2>{quiz.title} Assignment</h2>
            <p className="start-description">{quiz.description}</p>
            
            <div className="quiz-info">
              <div className="info-item">
                <span className="info-label">Total Questions</span>
                <span className="info-value">{quiz.questions.length}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Passing Score</span>
                <span className="info-value">70%</span>
              </div>
              <div className="info-item">
                <span className="info-label">Time Limit</span>
                <span className="info-value">No limit</span>
              </div>
            </div>

            <p className="start-instructions">
              ✓ Test your knowledge with 10 comprehensive questions<br/>
              ✓ Each question has 4 options<br/>
              ✓ You can review and change your answers<br/>
              ✓ Score 70% or higher to pass
            </p>

            <button
              className="start-quiz-btn"
              onClick={() => setQuizStarted(true)}
            >
              Start Assignment
            </button>
          </div>
        </div>
      ) : !showResults ? (
        // Quiz Questions
        <div className="quiz-container">
          <div className="quiz-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
              ></div>
            </div>
            <div className="progress-text">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </div>
          </div>

          <div className="quiz-question-container">
            <div className="question-header">
              <h3>Question {currentQuestion + 1}</h3>
              <span className="question-number">{currentQuestion + 1}/{quiz.questions.length}</span>
            </div>

            <div className="question-text">
              {quiz.questions[currentQuestion].question}
            </div>

            <div className="options-container">
              {quiz.questions[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  className={`option-button ${
                    selectedAnswers[currentQuestion] === idx ? 'selected' : ''
                  }`}
                  onClick={() => handleAnswerSelect(idx)}
                >
                  <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                  <span className="option-text">{option}</span>
                  {selectedAnswers[currentQuestion] === idx && (
                    <span className="option-check">✓</span>
                  )}
                </button>
              ))}
            </div>

            <div className="quiz-navigation">
              <button
                className="nav-btn"
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
              >
                ← Previous
              </button>

              {currentQuestion === quiz.questions.length - 1 ? (
                <button
                  className="submit-btn"
                  onClick={handleSubmitQuiz}
                >
                  Submit Quiz
                </button>
              ) : (
                <button
                  className="nav-btn"
                  onClick={handleNextQuestion}
                >
                  Next →
                </button>
              )}
            </div>

            <div className="question-indicator">
              {quiz.questions.map((_, idx) => (
                <div
                  key={idx}
                  className={`indicator ${
                    idx === currentQuestion
                      ? 'current'
                      : selectedAnswers[idx] !== undefined
                      ? 'answered'
                      : 'unanswered'
                  }`}
                  onClick={() => setCurrentQuestion(idx)}
                ></div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Results Screen
        <div className="quiz-results-screen">
          <div className="results-card">
            <div className={`results-icon ${passed ? 'passed' : 'failed'}`}>
              {passed ? '🎉' : '📚'}
            </div>

            <h2>{passed ? 'Assignment Passed!' : 'Keep Learning!'}</h2>

            <div className="score-display">
              <div className="score-circle">
                <div className="score-number">{percentage}%</div>
                <div className="score-label">Score</div>
              </div>
            </div>

            <div className="score-details">
              <p>You answered <strong>{score} out of {quiz.questions.length}</strong> questions correctly</p>
              {passed ? (
                <p className="pass-message">Congratulations! You've passed the assignment.</p>
              ) : (
                <p className="fail-message">You need 70% to pass. Review the material and try again!</p>
              )}
            </div>

            <div className="review-section">
              <h3>Answer Review</h3>
              <div className="review-list">
                {quiz.questions.map((question, idx) => {
                  const isCorrect = selectedAnswers[idx] === question.correct;
                  return (
                    <div key={idx} className={`review-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                      <div className="review-header">
                        <span className="review-number">Q{idx + 1}</span>
                        <span className={`review-status ${isCorrect ? 'correct' : 'incorrect'}`}>
                          {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                        </span>
                      </div>
                      <p className="review-question">{question.question}</p>
                      <p className="review-answer">
                        Your answer: <strong>{question.options[selectedAnswers[idx]]}</strong>
                      </p>
                      {!isCorrect && (
                        <p className="correct-answer">
                          Correct answer: <strong>{question.options[question.correct]}</strong>
                        </p>
                      )}
                      <p className="review-explanation">{question.explanation}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              className="finish-btn"
              onClick={onBack}
            >
              Back to Course
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseQuiz;