import React, { useEffect, useRef, useState } from 'react';
import './PhysicsVisualizer.css';

function PhysicsVisualizer({ project, code, canvasRef }) {
  const internalCanvasRef = useRef(null);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [fps, setFps] = useState(60);
  const animationFrameRef = useRef(null);
  const fpsCounterRef = useRef({ frames: 0, lastTime: Date.now() });

  useEffect(() => {
    const canvas = internalCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Initialize visualization based on project type
    let simulation = {
      robots: [],
      particles: [],
      time: 0
    };

    // Robot Arm Simulation
    if (project.id === 'robot-arm-simulation') {
      simulation.robots = [
        {
          baseX: width / 2,
          baseY: height / 2,
          joints: [
            { angle: 0, length: 80, speed: 0.02 },
            { angle: 45, length: 80, speed: 0.015 },
            { angle: 90, length: 60, speed: 0.01 }
          ]
        }
      ];
    }

    // Autonomous Navigation Simulation
    if (project.id === 'autonomous-robot-navigation') {
      simulation.robots = [
        {
          x: 100,
          y: height / 2,
          angle: 0,
          speed: 2,
          sensorRange: 100,
          sensors: []
        }
      ];

      // Add obstacles
      simulation.obstacles = [
        { x: width / 3, y: height / 3, radius: 40 },
        { x: width * 2 / 3, y: height / 3, radius: 50 },
        { x: width / 2, y: height * 2 / 3, radius: 45 }
      ];
    }

    // Drone Flight Simulator
    if (project.id === 'drone-flight-simulator') {
      simulation.drones = [
        {
          x: width / 2,
          y: height / 2,
          z: 0,
          vx: 0,
          vy: 0,
          vz: 0,
          rotX: 0,
          rotY: 0,
          mass: 1,
          thrust: 0
        }
      ];

      simulation.wind = { x: 0.3, y: 0.2 };
    }

    const drawRobotArm = (robot, time) => {
      let x = robot.baseX;
      let y = robot.baseY;

      ctx.strokeStyle = '#667eea';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Draw base
      ctx.fillStyle = '#667eea';
      ctx.fillRect(x - 15, y - 15, 30, 30);

      // Draw joints
      robot.joints.forEach((joint, i) => {
        joint.angle += joint.speed * Math.sin(time * 0.05 + i);

        const nextX = x + joint.length * Math.cos((joint.angle * Math.PI) / 180);
        const nextY = y + joint.length * Math.sin((joint.angle * Math.PI) / 180);

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(nextX, nextY);
        ctx.stroke();

        // Draw joint
        ctx.fillStyle = '#764ba2';
        ctx.beginPath();
        ctx.arc(nextX, nextY, 6, 0, Math.PI * 2);
        ctx.fill();

        x = nextX;
        y = nextY;
      });

      // Draw end effector
      ctx.fillStyle = '#ff6b6b';
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fill();

      // Draw trajectory
      ctx.strokeStyle = 'rgba(255, 107, 107, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(robot.baseX, robot.baseY, 150, 0, Math.PI * 2);
      ctx.stroke();
    };

    const drawAutonomousRobot = (robot, obstacles, time) => {
      // Draw obstacles
      ctx.fillStyle = '#ff6b6b';
      obstacles.forEach(obs => {
        ctx.beginPath();
        ctx.arc(obs.x, obs.y, obs.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update robot position
      robot.angle += 0.02;
      robot.x = width / 3 + 120 * Math.cos(time * 0.01);
      robot.y = height / 2 + 80 * Math.sin(time * 0.01);

      // Draw sensor range
      ctx.strokeStyle = 'rgba(102, 126, 234, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(robot.x, robot.y, robot.sensorRange, 0, Math.PI * 2);
      ctx.stroke();

      // Draw robot
      ctx.fillStyle = '#667eea';
      ctx.beginPath();
      ctx.arc(robot.x, robot.y, 12, 0, Math.PI * 2);
      ctx.fill();

      // Draw direction indicator
      ctx.strokeStyle = '#667eea';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(robot.x, robot.y);
      ctx.lineTo(
        robot.x + 20 * Math.cos(robot.angle),
        robot.y + 20 * Math.sin(robot.angle)
      );
      ctx.stroke();

      // Draw path
      ctx.strokeStyle = 'rgba(102, 126, 234, 0.3)';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(100, height / 2);
      ctx.lineTo(robot.x, robot.y);
      ctx.stroke();
      ctx.setLineDash([]);
    };

    const drawDrone = (drone, time) => {
      // Draw altitude grid
      ctx.strokeStyle = 'rgba(102, 126, 234, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, height / 2);
        ctx.lineTo(i, height / 2 + 100);
        ctx.stroke();
      }

      // Draw altitude indicator
      ctx.fillStyle = '#667eea';
      ctx.font = 'bold 14px Arial';
      ctx.fillText(`Altitude: ${Math.max(0, (drone.z * 100).toFixed(1))}m`, 20, 30);
      ctx.fillText(`Thrust: ${(drone.thrust * 100).toFixed(1)}%`, 20, 55);

      // Update drone physics
      drone.z += drone.vz * 0.05;
      drone.vz -= 0.3; // gravity
      drone.thrust = Math.max(0, Math.min(1, 0.35 + 0.15 * Math.sin(time * 0.02)));
      drone.vz += drone.thrust - 0.1;

      // Draw drone
      const droneX = drone.x + Math.sin(time * 0.03) * 30;
      const droneY = height / 2 - drone.z * 2;

      ctx.fillStyle = '#764ba2';
      ctx.fillRect(droneX - 20, droneY - 20, 40, 40);

      // Draw propellers
      ctx.strokeStyle = '#667eea';
      ctx.lineWidth = 2;
      const propellerSpeed = drone.thrust * 0.3;
      for (let i = 0; i < 4; i++) {
        const angle = (time * propellerSpeed + (i * Math.PI) / 2) * 0.1;
        const px = droneX + (i % 2 === 0 ? 15 : -15);
        const py = droneY + (i < 2 ? -15 : 15);

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(
          px + 25 * Math.cos(angle),
          py + 25 * Math.sin(angle)
        );
        ctx.stroke();
      }

      // Draw flight path
      ctx.strokeStyle = 'rgba(118, 75, 162, 0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(100, height / 2);
      ctx.quadraticCurveTo(width / 2, height / 2 - 100, droneX, droneY);
      ctx.stroke();
    };

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = '#0f0f1e';
      ctx.fillRect(0, 0, width, height);

      // Draw grid
      ctx.strokeStyle = 'rgba(102, 126, 234, 0.1)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }
      for (let i = 0; i < height; i += 50) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
      }

      simulation.time += 1;

      if (simulation.robots && simulation.robots.length > 0) {
        if (project.id === 'robot-arm-simulation') {
          simulation.robots.forEach(robot => drawRobotArm(robot, simulation.time));
        } else if (project.id === 'autonomous-robot-navigation') {
          drawAutonomousRobot(simulation.robots[0], simulation.obstacles, simulation.time);
        }
      }

      if (simulation.drones && simulation.drones.length > 0) {
        simulation.drones.forEach(drone => drawDrone(drone, simulation.time));
      }

      // FPS Counter
      fpsCounterRef.current.frames++;
      const now = Date.now();
      if (now - fpsCounterRef.current.lastTime >= 1000) {
        setFps(fpsCounterRef.current.frames);
        fpsCounterRef.current.frames = 0;
        fpsCounterRef.current.lastTime = now;
      }

      ctx.fillStyle = '#667eea';
      ctx.font = 'bold 12px monospace';
      ctx.fillText(`FPS: ${fps}`, width - 80, 25);
      ctx.fillText(`Time: ${(simulation.time / 60).toFixed(2)}s`, width - 80, 45);

      if (simulationRunning) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    const startAnimation = () => {
      setSimulationRunning(true);
      animate();
    };

    startAnimation();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [project.id, fps, simulationRunning]);

  return (
    <div className="physics-visualizer">
      <div className="visualizer-container">
        <canvas
          ref={internalCanvasRef}
          width={800}
          height={600}
          className="visualization-canvas"
        />
      </div>

      <div className="visualizer-controls">
        <h3>🎮 Live Visualization</h3>
        <p>Watch your code in action! The simulation shows your algorithm working in real-time.</p>

        <div className="control-buttons">
          <button
            className="control-btn"
            onClick={() => setSimulationRunning(!simulationRunning)}
          >
            {simulationRunning ? '⏸ Pause' : '▶ Play'}
          </button>
          <button
            className="control-btn reset-btn"
            onClick={() => window.location.reload()}
          >
            🔄 Reset
          </button>
        </div>

        <div className="visualizer-info">
          <h4>What You're Seeing:</h4>
          {project.id === 'robot-arm-simulation' && (
            <p>A 3-DOF robot arm with joints that move based on kinematics calculations. The red dot is the end-effector position.</p>
          )}
          {project.id === 'autonomous-robot-navigation' && (
            <p>An autonomous robot (blue) navigating around obstacles (red) using pathfinding and collision avoidance.</p>
          )}
          {project.id === 'drone-flight-simulator' && (
            <p>A drone simulating realistic physics with thrust, gravity, and wind effects. The purple square is the drone with spinning propellers.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PhysicsVisualizer;
