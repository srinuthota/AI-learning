import { useState, useEffect } from 'react';
import './App.css';
import Auth from './Auth';
import Courses from './Courses';
import CourseLearning from './CourseLearning';
import CourseQuiz from './CourseQuiz';
import ApplyProjects from './ApplyProjects';
import { auth } from './firebase';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('courses');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [completedCourses, setCompletedCourses] = useState([
    'physical-ai',
    'generative-ai'
  ]); // TODO: Load from backend

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  if (currentPage === 'quiz' && selectedCourse) {
    return (
      <CourseQuiz
        courseId={selectedCourse}
        user={user}
        onBack={() => {
          setCurrentPage('learning');
        }}
      />
    );
  }

  if (currentPage === 'learning' && selectedCourse) {
    return (
      <CourseLearning
        courseId={selectedCourse}
        user={user}
        onBack={() => {
          setCurrentPage('courses');
          setSelectedCourse(null);
        }}
        onStartQuiz={() => {
          setCurrentPage('quiz');
        }}
      />
    );
  }

  if (currentPage === 'projects') {
    return (
      <ApplyProjects
        user={user}
        completedCourses={completedCourses}
        onBack={() => {
          setCurrentPage('courses');
        }}
      />
    );
  }

  return (
    <div className="App">
      <Courses
        user={user}
        onEnroll={(courseId) => {
          setSelectedCourse(courseId);
          setCurrentPage('learning');
        }}
        onNavigateProjects={() => {
          setCurrentPage('projects');
        }}
      />
    </div>
  );
}

export default App;
