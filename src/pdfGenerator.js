import jsPDF from 'jspdf';
import { videosData } from './videosData';

// Course content data
const courseData = {
  'physical-ai': {
    title: 'Physical AI',
    icon: '🤖',
    tagline: 'Build Intelligent Robots',
    description: 'Physical AI combines robotics, embedded systems, and artificial intelligence to create autonomous machines that interact with the physical world.',
    basics: {
      intro: 'Physical AI refers to AI systems embodied in physical robots that can perceive, learn, and act in real-world environments. Unlike software-only AI, Physical AI must handle real-world constraints like friction, gravity, and sensor noise.',
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
          { name: 'Robot Kinematics', theory: 'Kinematics is the study of motion without considering forces. It describes how a robot moves based on its structure and joint angles. Forward kinematics calculates the end-effector position from joint angles, while inverse kinematics finds the joint angles needed for a desired position.' },
          { name: 'Degrees of Freedom (DOF)', theory: 'DOF represents the number of independent movements a robot can make. A 6-DOF robot arm (3 for position + 3 for orientation) can reach any point in 3D space with any orientation. More DOF means more flexibility but greater complexity.' },
          { name: 'Robot Classification', theory: 'Robots are classified by type: Serial manipulators, Parallel robots, Mobile robots, and Humanoids. Each type has unique kinematics, advantages, and limitations suited for specific applications.' }
        ]
      },
      {
        module: 'Module 2: Sensors & Perception',
        topics: [
          { name: 'Computer Vision', theory: 'Computer vision enables robots to "see" and interpret visual information. Key techniques include image processing, feature detection, and object recognition. This allows robots to navigate, identify objects, and make decisions based on visual input.' },
          { name: 'LiDAR Technology', theory: 'LiDAR (Light Detection and Ranging) uses laser pulses to measure distances and create 3D maps of environments. It provides accurate distance data and works in various lighting conditions, making it ideal for autonomous navigation and obstacle avoidance.' },
          { name: 'Sensor Fusion', theory: 'Sensor fusion combines data from multiple sensors (camera, LiDAR, IMU) to create a more accurate perception of the environment. Techniques like Kalman filtering help handle sensor noise and uncertainty.' }
        ]
      },
      {
        module: 'Module 3: Control Systems',
        topics: [
          { name: 'PID Control', theory: 'PID (Proportional-Integral-Derivative) control is fundamental for motor control and stabilization. It continuously adjusts output based on error feedback: P (current error), I (accumulated error), D (error trend).' },
          { name: 'Motion Planning', theory: 'Motion planning algorithms determine collision-free paths for robots. Popular algorithms include RRT (Rapidly-exploring Random Trees), Dijkstra, and A*. They balance optimality with computational efficiency.' },
          { name: 'Real-time Control', theory: 'Real-time systems must respond to inputs within strict time constraints. In robotics, this is critical for safety and stability. Real-time operating systems and careful algorithm design ensure predictable performance.' }
        ]
      }
    ]
  },
  'generative-ai': {
    title: 'Generative AI',
    icon: '✨',
    tagline: 'Create with AI Models',
    description: 'Generative AI refers to artificial intelligence systems that can create new content—text, images, audio, and code. These systems learn patterns from training data and generate novel, original outputs.',
    basics: {
      intro: 'Generative AI uses machine learning models to generate new data that resembles training data. Unlike discriminative models that classify data, generative models learn the underlying distribution and can create samples from it.',
      topics: [
        {
          title: 'What is Generative AI?',
          description: 'Generative AI uses machine learning models to generate new data that resembles training data. Unlike discriminative models that classify data, generative models learn the underlying distribution and can create samples from it.',
          examples: ['ChatGPT & LLMs', 'DALL-E & Image Generation', 'Stable Diffusion', 'Music Generation Tools']
        },
        {
          title: 'Key Concepts',
          description: 'Generative models learn the probability distribution of data. Key types include GANs (Generative Adversarial Networks), Transformers, Diffusion Models, and Variational Autoencoders (VAEs).',
          components: ['GANs: Two networks competing', 'Transformers: Attention-based architecture', 'Diffusion Models: Iterative denoising', 'VAEs: Variational framework']
        },
        {
          title: 'Real-World Applications',
          description: 'Generative AI is transforming multiple industries. It enables creative content generation, code assistance, data augmentation, and personalized experiences.',
          uses: ['Content Creation', 'Code Generation', 'Data Augmentation', 'Drug Discovery']
        }
      ]
    },
    theory: [
      {
        module: 'Module 1: Deep Learning Fundamentals',
        topics: [
          { name: 'Neural Networks', theory: 'Neural networks are computing systems inspired by biological neural networks. They consist of interconnected nodes (neurons) organized in layers that learn to represent data through training with backpropagation.' },
          { name: 'Backpropagation', theory: 'Backpropagation is the algorithm for training neural networks. It computes gradients of the loss function with respect to weights using the chain rule, enabling efficient parameter updates.' },
          { name: 'Activation Functions', theory: 'Activation functions introduce non-linearity to neural networks, enabling them to learn complex patterns. Common functions include ReLU, Sigmoid, Tanh, and GELU.' }
        ]
      },
      {
        module: 'Module 2: Transformer Architecture',
        topics: [
          { name: 'Attention Mechanism', theory: 'Attention allows models to focus on relevant parts of input. Self-attention computes relationships between all positions in a sequence, enabling parallel processing and capturing long-range dependencies.' },
          { name: 'Multi-Head Attention', theory: 'Multi-head attention runs multiple attention operations in parallel, each focusing on different representation subspaces. This provides richer representation learning.' },
          { name: 'Positional Encoding', theory: 'Since transformers process all positions in parallel, positional encoding adds sequence order information. This allows the model to understand token positions in the sequence.' }
        ]
      },
      {
        module: 'Module 3: Large Language Models',
        topics: [
          { name: 'Training LLMs', theory: 'LLMs are trained on massive text datasets using self-supervised learning. They predict the next token in a sequence, learning language patterns, facts, and reasoning abilities.' },
          { name: 'Fine-tuning & Adaptation', theory: 'Pre-trained LLMs are fine-tuned on specific tasks with smaller labeled datasets. Techniques like LoRA (Low-Rank Adaptation) reduce computational costs while maintaining effectiveness.' },
          { name: 'Prompt Engineering', theory: 'Prompt engineering is crafting effective instructions for LLMs. Clear prompts, few-shot examples, and chain-of-thought reasoning improve model outputs significantly.' }
        ]
      }
    ]
  }
};

export const generatePDF = async (courseId) => {
  const course = courseData[courseId];
  if (!course) return;

  // Create PDF document
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Set colors
  const primaryColor = courseId === 'physical-ai' ? [102, 126, 234] : [118, 75, 162];
  
  let yPosition = 20;
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = pdf.internal.pageSize.getWidth() - 2 * margin;

  // Helper function to add text with word wrap
  const addWrappedText = (text, x, y, options = {}) => {
    const { fontSize = 12, color = [0, 0, 0], maxWidth: mw = maxWidth, bold = false } = options;
    pdf.setFontSize(fontSize);
    pdf.setTextColor(...color);
    if (bold) pdf.setFont(undefined, 'bold');
    else pdf.setFont(undefined, 'normal');
    
    const lines = pdf.splitTextToSize(text, mw);
    pdf.text(lines, x, y);
    return y + lines.length * (fontSize / 2.5);
  };

  // Helper to check if we need a new page
  const checkNewPage = (currentY, additionalHeight = 20) => {
    if (currentY + additionalHeight > pageHeight - margin) {
      pdf.addPage();
      return margin + 10;
    }
    return currentY;
  };

  // Title Section
  pdf.setFillColor(...primaryColor);
  pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), 40, 'F');
  
  yPosition = addWrappedText(`${course.icon} ${course.title}`, margin, 15, {
    fontSize: 28,
    color: [255, 255, 255],
    bold: true
  });

  yPosition = addWrappedText(course.tagline, margin, yPosition + 10, {
    fontSize: 14,
    color: [230, 230, 255],
    bold: true
  });

  yPosition = 50;

  // Table of Contents
  yPosition = addWrappedText('📚 Table of Contents', margin, yPosition, {
    fontSize: 16,
    color: primaryColor,
    bold: true
  });
  yPosition += 8;

  yPosition = addWrappedText('1. Course Overview', margin + 5, yPosition, { fontSize: 11 });
  yPosition = addWrappedText('2. Basics & Introduction', margin + 5, yPosition, { fontSize: 11 });
  yPosition = addWrappedText('3. Theory & Core Concepts', margin + 5, yPosition, { fontSize: 11 });
  yPosition = addWrappedText('4. Learning Resources', margin + 5, yPosition, { fontSize: 11 });
  yPosition += 15;

  // Course Overview Section
  yPosition = checkNewPage(yPosition, 40);
  yPosition = addWrappedText('1. Course Overview', margin, yPosition, {
    fontSize: 16,
    color: primaryColor,
    bold: true
  });
  yPosition += 8;

  yPosition = addWrappedText(course.description, margin, yPosition, {
    fontSize: 11,
    maxWidth
  });
  yPosition += 15;

  // Basics Section
  yPosition = checkNewPage(yPosition, 40);
  yPosition = addWrappedText('2. Basics & Introduction', margin, yPosition, {
    fontSize: 16,
    color: primaryColor,
    bold: true
  });
  yPosition += 8;

  yPosition = addWrappedText(course.basics.intro, margin, yPosition, {
    fontSize: 11,
    maxWidth
  });
  yPosition += 12;

  course.basics.topics.forEach((topic, idx) => {
    yPosition = checkNewPage(yPosition, 30);
    
    yPosition = addWrappedText(`${idx + 1}. ${topic.title}`, margin, yPosition, {
      fontSize: 12,
      color: primaryColor,
      bold: true
    });
    yPosition += 6;

    yPosition = addWrappedText(topic.description, margin, yPosition, {
      fontSize: 10,
      maxWidth
    });
    yPosition += 6;

    const key = topic.examples ? 'examples' : topic.components ? 'components' : 'uses';
    topic[key].forEach((item) => {
      yPosition = checkNewPage(yPosition, 8);
      yPosition = addWrappedText(`• ${item}`, margin + 3, yPosition, { fontSize: 10 });
    });
    yPosition += 8;
  });

  // Theory Section
  yPosition = checkNewPage(yPosition, 40);
  yPosition = addWrappedText('3. Theory & Core Concepts', margin, yPosition, {
    fontSize: 16,
    color: primaryColor,
    bold: true
  });
  yPosition += 8;

  course.theory.forEach((moduleData, moduleIdx) => {
    yPosition = checkNewPage(yPosition, 30);
    
    yPosition = addWrappedText(moduleData.module, margin, yPosition, {
      fontSize: 12,
      color: primaryColor,
      bold: true
    });
    yPosition += 6;

    moduleData.topics.forEach((topic, topicIdx) => {
      yPosition = checkNewPage(yPosition, 25);
      
      yPosition = addWrappedText(`${moduleIdx + 1}.${topicIdx + 1} ${topic.name}`, margin + 3, yPosition, {
        fontSize: 11,
        color: [60, 60, 60],
        bold: true
      });
      yPosition += 5;

      yPosition = addWrappedText(topic.theory, margin + 5, yPosition, {
        fontSize: 10,
        maxWidth: maxWidth - 5
      });
      yPosition += 8;
    });
  });

  // Learning Resources Section
  yPosition = checkNewPage(yPosition, 40);
  yPosition = addWrappedText('4. Learning Resources', margin, yPosition, {
    fontSize: 16,
    color: primaryColor,
    bold: true
  });
  yPosition += 8;

  const resources = getResourcesForCourse(courseId);
  yPosition = addWrappedText('Recommended Video Resources:', margin, yPosition, {
    fontSize: 11,
    bold: true
  });
  yPosition += 6;

  resources.forEach((resource, idx) => {
    yPosition = checkNewPage(yPosition, 20);
    
    yPosition = addWrappedText(`${idx + 1}. ${resource.title}`, margin + 3, yPosition, {
      fontSize: 10,
      bold: true
    });
    yPosition += 4;

    yPosition = addWrappedText(`Instructor: ${resource.instructor}`, margin + 5, yPosition, {
      fontSize: 9,
      color: [80, 80, 80]
    });
    yPosition += 3;

    yPosition = addWrappedText(`Duration: ${resource.duration}`, margin + 5, yPosition, {
      fontSize: 9,
      color: [80, 80, 80]
    });
    yPosition += 4;

    yPosition = addWrappedText(resource.description, margin + 5, yPosition, {
      fontSize: 9,
      maxWidth: maxWidth - 5
    });
    yPosition += 6;
  });

  // Footer
  const pageCount = pdf.internal.pages.length - 1;
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    pdf.setFontSize(9);
    pdf.setTextColor(150, 150, 150);
    pdf.text(
      `Page ${i} of ${pageCount}`,
      pdf.internal.pageSize.getWidth() / 2,
      pdf.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }

  // Save the PDF
  const fileName = `${course.title.replace(/\s+/g, '_')}_Concepts.pdf`;
  pdf.save(fileName);
};

// Get resources for a course
const getResourcesForCourse = (courseId) => {
  return videosData[courseId] || [];
};

export default generatePDF;
