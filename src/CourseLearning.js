import React, { useState } from 'react';
import './CourseLearning.css';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';

function CourseLearning({ courseId, user, onBack }) {
  const [activeSection, setActiveSection] = useState('basics');
  const [expandedModule, setExpandedModule] = useState(0);

  const courseContent = {
    'physical-ai': {
      title: 'Physical AI',
      icon: '🤖',
      tagline: 'Build Intelligent Robots',
      color: '#667eea',
      basics: {
        intro: 'Physical AI combines robotics, embedded systems, and artificial intelligence to create autonomous machines that interact with the physical world.',
        topics: [
          {
            title: 'What is Physical AI?',
            description: 'Physical AI refers to AI systems embodied in physical robots that can perceive, learn, and act in real-world environments. Unlike software-only AI, Physical AI must handle real-world constraints like friction, gravity, and sensor noise.',
            examples: ['Autonomous vehicles', 'Industrial robots', 'Robotic arms', 'Humanoid robots']
          },
          {
            title: 'Key Components',
            description: 'A Physical AI system consists of sensors (to perceive), computation (to think), and actuators (to act). These work together in a feedback loop called the perception-action cycle.',
            components: ['Sensors: Camera, LiDAR, IMU, Encoders', 'Processor: Microcontroller, Embedded Computer', 'Actuators: Motors, Servos, Grippers']
          },
          {
            title: 'Applications',
            description: 'Physical AI is revolutionizing industries from manufacturing to healthcare. It enables machines to perform complex tasks with minimal human intervention.',
            uses: ['Manufacturing & Assembly', 'Healthcare & Surgery', 'Logistics & Delivery', 'Research & Exploration']
          }
        ]
      },
      theory: [
        {
          module: 'Module 1: Robotics Fundamentals',
          topics: [
            {
              name: 'Robot Kinematics',
              theory: 'Kinematics is the study of motion without considering forces. It describes how a robot moves based on its structure and joint angles. Forward kinematics calculates the end-effector position from joint angles, while inverse kinematics finds the joint angles needed for a desired position.'
            },
            {
              name: 'Degrees of Freedom (DOF)',
              theory: 'DOF represents the number of independent movements a robot can make. A 6-DOF robot arm (3 for position + 3 for orientation) can reach any point in 3D space with any orientation. More DOF means more flexibility but greater complexity.'
            },
            {
              name: 'Robot Classification',
              theory: 'Robots are classified by type: Serial manipulators, Parallel robots, Mobile robots, and Humanoids. Each type has unique kinematics, advantages, and limitations suited for specific applications.'
            }
          ]
        },
        {
          module: 'Module 2: Sensors & Perception',
          topics: [
            {
              name: 'Computer Vision',
              theory: 'Computer vision enables robots to "see" and interpret visual information. Key techniques include image processing, feature detection, and object recognition. This allows robots to navigate, identify objects, and make decisions based on visual input.'
            },
            {
              name: 'LiDAR Technology',
              theory: 'LiDAR (Light Detection and Ranging) uses laser pulses to measure distances and create 3D maps of environments. It provides accurate distance data and works in various lighting conditions, making it ideal for autonomous navigation and obstacle avoidance.'
            },
            {
              name: 'Sensor Fusion',
              theory: 'Sensor fusion combines data from multiple sensors (camera, LiDAR, IMU) to create a more accurate perception of the environment. Techniques like Kalman filtering help handle sensor noise and uncertainty.'
            }
          ]
        },
        {
          module: 'Module 3: Control Systems',
          topics: [
            {
              name: 'PID Control',
              theory: 'PID (Proportional-Integral-Derivative) control is fundamental for motor control and stabilization. It continuously adjusts output based on error feedback: P (current error), I (accumulated error), D (error trend).'
            },
            {
              name: 'Motion Planning',
              theory: 'Motion planning algorithms determine collision-free paths for robots. Popular algorithms include RRT (Rapidly-exploring Random Trees), Dijkstra, and A*. They balance optimality with computational efficiency.'
            },
            {
              name: 'Real-time Control',
              theory: 'Real-time systems must respond to inputs within strict time constraints. In robotics, this is critical for safety and stability. Real-time operating systems and careful algorithm design ensure predictable performance.'
            }
          ]
        }
      ]
    },
    'generative-ai': {
      title: 'Generative AI',
      icon: '✨',
      tagline: 'Create with AI Models',
      color: '#764ba2',
      basics: {
        intro: 'Generative AI refers to artificial intelligence systems that can create new content—text, images, audio, and code. These systems learn patterns from training data and generate novel, original outputs.',
        topics: [
          {
            title: 'What is Generative AI?',
            description: 'Generative AI uses machine learning models to generate new data that resembles training data. Unlike discriminative models that classify data, generative models learn the underlying distribution and can create samples from it.',
            examples: ['ChatGPT (Text Generation)', 'DALL-E (Image Generation)', 'Codex (Code Generation)', 'Jukebox (Music Generation)']
          },
          {
            title: 'Core Architectures',
            description: 'Modern generative AI uses deep learning architectures. Transformers (with attention mechanisms) revolutionized the field by enabling efficient parallel processing and better long-range dependencies.',
            architectures: ['Transformers: State-of-the-art for text and images', 'Diffusion Models: Powerful for image generation', 'GANs: Generate realistic images and data', 'Variational Autoencoders (VAE): Learn latent representations']
          },
          {
            title: 'Real-World Applications',
            description: 'Generative AI is transforming industries by automating content creation, accelerating development, and enabling new user experiences.',
            uses: ['Content Creation: Articles, code, designs', 'Customer Service: AI chatbots and support', 'Drug Discovery: Molecular generation', 'Product Design: Automated prototyping']
          }
        ]
      },
      theory: [
        {
          module: 'Module 1: Neural Networks Basics',
          topics: [
            {
              name: 'Deep Learning Fundamentals',
              theory: 'Deep learning uses neural networks with multiple layers to learn hierarchical representations. Each layer transforms input to capture increasingly abstract features. Backpropagation efficiently trains these networks.'
            },
            {
              name: 'Activation Functions',
              theory: 'Activation functions introduce non-linearity to neural networks, enabling them to learn complex patterns. Common functions include ReLU (fast, sparse), Sigmoid (smooth boundaries), and Tanh (centered outputs).'
            },
            {
              name: 'Backpropagation',
              theory: 'Backpropagation calculates gradients of the loss function with respect to weights using the chain rule. This enables efficient training of deep networks by computing gradients layer-by-layer.'
            }
          ]
        },
        {
          module: 'Module 2: Transformers & Attention',
          topics: [
            {
              name: 'Attention Mechanism',
              theory: 'Attention allows models to focus on relevant parts of input. Self-attention computes relationships between all positions in a sequence, enabling the model to understand context regardless of distance.'
            },
            {
              name: 'Transformer Architecture',
              theory: 'Transformers stack multiple attention and feed-forward layers. Multi-head attention processes different representation subspaces in parallel, and positional encoding adds sequence order information.'
            },
            {
              name: 'Scaling Transformers',
              theory: 'Large language models (LLMs) use billions of parameters trained on massive datasets. Techniques like distributed training, mixed precision, and efficient attention variants (like FlashAttention) enable practical training and inference.'
            }
          ]
        },
        {
          module: 'Module 3: Diffusion & Generation',
          topics: [
            {
              name: 'Diffusion Models',
              theory: 'Diffusion models generate data by reversing a corruption process. Training progressively adds noise to data; generation reverses this by removing noise step-by-step. Powerful for both images and text.'
            },
            {
              name: 'Prompt Engineering',
              theory: 'Prompt engineering is the art of writing effective instructions for AI models. Techniques include few-shot learning, chain-of-thought reasoning, and role-playing to improve output quality and relevance.'
            },
            {
              name: 'Fine-tuning & Adaptation',
              theory: 'Fine-tuning adapts pre-trained models to specific tasks with smaller datasets. Techniques like LoRA (Low-Rank Adaptation) reduce parameters and computational cost while maintaining performance.'
            }
          ]
        }
      ]
    }
  };

  const courseData = courseContent[courseId];

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="course-learning-page">
      {/* Background */}
      <div className="learning-background"></div>

      {/* Header */}
      <header className="learning-header">
        <div className="header-left">
          <button onClick={onBack} className="back-btn">← Back to Courses</button>
        </div>
        <div className="header-center">
          <span className="course-icon">{courseData.icon}</span>
          <h1>{courseData.title}</h1>
        </div>
        <div className="header-right">
          <span className="user-email">{user.email}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      {/* Tabs */}
      <div className="tabs-container">
        <button
          className={`tab-btn ${activeSection === 'basics' ? 'active' : ''}`}
          onClick={() => setActiveSection('basics')}
        >
          📖 Basics & Introduction
        </button>
        <button
          className={`tab-btn ${activeSection === 'theory' ? 'active' : ''}`}
          onClick={() => setActiveSection('theory')}
        >
          🧠 Theory & Concepts
        </button>
      </div>

      {/* Content */}
      <main className="learning-content">
        {activeSection === 'basics' && (
          <div className="basics-section">
            <div className="intro-card">
              <h2>{courseData.title} Fundamentals</h2>
              <p className="tagline">{courseData.tagline}</p>
              <p className="intro-text">{courseData.basics.intro}</p>
            </div>

            <div className="basics-grid">
              {courseData.basics.topics.map((topic, idx) => (
                <div key={idx} className="basic-card">
                  <h3>{topic.title}</h3>
                  <p>{topic.description}</p>
                  
                  <div className="topic-list">
                    {topic.examples && (
                      <>
                        <p className="list-title">Examples:</p>
                        <ul>
                          {topic.examples.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </>
                    )}
                    {topic.components && (
                      <>
                        <p className="list-title">Components:</p>
                        <ul>
                          {topic.components.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </>
                    )}
                    {topic.uses && (
                      <>
                        <p className="list-title">Applications:</p>
                        <ul>
                          {topic.uses.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </>
                    )}
                    {topic.architectures && (
                      <>
                        <p className="list-title">Architectures:</p>
                        <ul>
                          {topic.architectures.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'theory' && (
          <div className="theory-section">
            <h2>🎓 Theory & Concepts</h2>
            
            <div className="modules-container">
              {courseData.theory.map((moduleData, moduleIdx) => (
                <div key={moduleIdx} className="theory-module">
                  <button
                    className="module-header"
                    onClick={() => setExpandedModule(expandedModule === moduleIdx ? -1 : moduleIdx)}
                  >
                    <span className="module-title">{moduleData.module}</span>
                    <span className="expand-icon">{expandedModule === moduleIdx ? '▼' : '▶'}</span>
                  </button>

                  {expandedModule === moduleIdx && (
                    <div className="module-content">
                      {moduleData.topics.map((topic, topicIdx) => (
                        <div key={topicIdx} className="theory-topic">
                          <h4>{topic.name}</h4>
                          <p className="theory-text">{topic.theory}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default CourseLearning;