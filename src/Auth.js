import React, { useState } from 'react';
import './Auth.css';
import { auth } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        <svg className="robot-illustration" viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
          {/* Robot Head */}
          <rect x="120" y="80" width="160" height="160" rx="10" fill="#667eea" opacity="0.15" className="robot-head" />
          
          {/* Eyes */}
          <circle cx="160" cy="130" r="20" fill="#764ba2" opacity="0.3" className="robot-eye" />
          <circle cx="240" cy="130" r="20" fill="#764ba2" opacity="0.3" className="robot-eye" />
          
          {/* Eye highlights */}
          <circle cx="165" cy="125" r="8" fill="#ffffff" opacity="0.6" />
          <circle cx="245" cy="125" r="8" fill="#ffffff" opacity="0.6" />
          
          {/* Mouth */}
          <path d="M 160 170 Q 200 190 240 170" stroke="#764ba2" strokeWidth="3" fill="none" opacity="0.3" />
          
          {/* Antenna */}
          <line x1="200" y1="80" x2="200" y2="30" stroke="#764ba2" strokeWidth="4" opacity="0.2" className="antenna" />
          <circle cx="200" cy="25" r="8" fill="#667eea" opacity="0.2" className="antenna-dot" />
          
          {/* Body */}
          <rect x="100" y="250" width="200" height="140" rx="15" fill="#667eea" opacity="0.15" className="robot-body" />
          
          {/* Chest panel */}
          <rect x="130" y="270" width="140" height="100" rx="8" fill="#764ba2" opacity="0.1" />
          
          {/* Button indicators */}
          <circle cx="160" cy="290" r="6" fill="#667eea" opacity="0.3" />
          <circle cx="200" cy="290" r="6" fill="#667eea" opacity="0.3" />
          <circle cx="240" cy="290" r="6" fill="#667eea" opacity="0.3" />
          
          {/* Left Arm */}
          <g className="robot-arm-left">
            <rect x="50" y="280" width="50" height="40" rx="10" fill="#667eea" opacity="0.15" />
            <circle cx="50" cy="300" r="12" fill="#764ba2" opacity="0.2" />
          </g>
          
          {/* Right Arm */}
          <g className="robot-arm-right">
            <rect x="300" y="280" width="50" height="40" rx="10" fill="#667eea" opacity="0.15" />
            <circle cx="350" cy="300" r="12" fill="#764ba2" opacity="0.2" />
          </g>
          
          {/* Left Leg */}
          <rect x="130" y="400" width="40" height="80" rx="10" fill="#667eea" opacity="0.15" />
          <circle cx="150" cy="485" r="15" fill="#764ba2" opacity="0.2" />
          
          {/* Right Leg */}
          <rect x="230" y="400" width="40" height="80" rx="10" fill="#667eea" opacity="0.15" />
          <circle cx="250" cy="485" r="15" fill="#764ba2" opacity="0.2" />
        </svg>
      </div>
      <div className="auth-form">
        <div className="auth-header">
          <div className="auth-logo">🚀</div>
          <h1>{isSignUp ? 'Create Account' : 'Welcome Back'}</h1>
          <p>{isSignUp ? 'Join our AI learning community' : 'Sign in to your account'}</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">
              <span className="label-icon">📧</span> Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <span className="label-icon">🔒</span> Password
            </label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {!isSignUp && (
            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <a href="#forgot" className="forgot-link">Forgot password?</a>
            </div>
          )}

          <button type="submit" className="auth-button" disabled={loading}>
            <span>{loading ? 'Loading...' : (isSignUp ? 'Create Account' : 'Sign In')}</span>
            <span className="button-icon">→</span>
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            <button 
              type="button"
              className="toggle-auth-btn"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
            >
              {isSignUp ? 'Sign In' : 'Create one'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;