import React, { useState, useEffect } from 'react';
import DisclaimerPage from './components/DisclaimerPage';
import TestMode from './components/TestMode';
import { problemsData, updateStudentSubmission } from '../shared/problemsData';

const StudentPortal = () => {
  const [currentPage, setCurrentPage] = useState('disclaimer'); // 'disclaimer' or 'test'
  const [isTestMode, setIsTestMode] = useState(false);
  const [testStartTime, setTestStartTime] = useState(null);
  const [testDuration] = useState(3 * 60 * 60 * 1000); // 3 hours in milliseconds
  const [problems, setProblems] = useState(problemsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [testEndedByEscape, setTestEndedByEscape] = useState(false);

  useEffect(() => {
    document.title = "Trialthon of Tech | Student Portal";
  }, []);

  // Update problems when shared data changes
  useEffect(() => {
    setProblems(problemsData);
  }, [problemsData]);

  // Full-screen test mode handlers
  useEffect(() => {
    if (isTestMode) {
      // Request fullscreen
      const requestFullscreen = () => {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
          document.documentElement.msRequestFullscreen();
        }
      };

      // Prevent context menu
      const preventContextMenu = (e) => e.preventDefault();
      
      // Prevent keyboard shortcuts
      const preventKeyboardShortcuts = (e) => {
        if (e.ctrlKey || e.altKey || e.metaKey) {
          e.preventDefault();
        }
        // Prevent F11, F5, etc.
        if (e.key === 'F11' || e.key === 'F5' || e.key === 'F12') {
          e.preventDefault();
        }
      };

      // Handle fullscreen change - AUTOMATICALLY END TEST WITHOUT PERMISSION
      const handleFullscreenChange = () => {
        if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
          // User exited fullscreen, end test automatically with zero score
          setTestEndedByEscape(true);
          endTest();
        }
      };

      // Handle visibility change (tab switching) - AUTOMATICALLY END TEST WITHOUT PERMISSION
      const handleVisibilityChange = () => {
        if (document.hidden) {
          // User switched tabs, end test automatically with zero score
          setTestEndedByEscape(true);
          endTest();
        }
      };

      // Handle beforeunload (page refresh/close) - AUTOMATICALLY END TEST WITHOUT PERMISSION
      const handleBeforeUnload = (e) => {
        setTestEndedByEscape(true);
        endTest();
        e.preventDefault();
        e.returnValue = '';
        return '';
      };

      requestFullscreen();
      document.addEventListener('contextmenu', preventContextMenu);
      document.addEventListener('keydown', preventKeyboardShortcuts);
      document.addEventListener('fullscreenchange', handleFullscreenChange);
      document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.addEventListener('msfullscreenchange', handleFullscreenChange);
      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        document.removeEventListener('contextmenu', preventContextMenu);
        document.removeEventListener('keydown', preventKeyboardShortcuts);
        document.removeEventListener('fullscreenchange', handleFullscreenChange);
        document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.removeEventListener('msfullscreenchange', handleFullscreenChange);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [isTestMode]);

  const handleBeginTest = () => {
    if (window.confirm('Are you ready to start the test? You will not be able to leave full-screen mode or switch tabs. The test will end if you try to escape.')) {
      setCurrentPage('test');
      setIsTestMode(true);
      setTestStartTime(Date.now());
      setTestEndedByEscape(false);
    }
  };

  const endTest = () => {
    // NO PERMISSION PROMPT - automatically end test
    setIsTestMode(false);
    setTestStartTime(null);
    setCurrentPage('disclaimer');
    
    // If test ended by escape, mark all problems as failed with zero score
    if (testEndedByEscape) {
      problems.forEach(problem => {
        updateStudentSubmission('2024CSE001', problem.id, '', false, 0);
      });
      alert('Test ended due to escape attempt. All scores marked as zero.');
    }
    
    // Exit fullscreen
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || problem.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  // Calculate remaining time
  const getRemainingTime = () => {
    if (!testStartTime) return '';
    const elapsed = Date.now() - testStartTime;
    const remaining = testDuration - elapsed;
    if (remaining <= 0) {
      endTest();
      return 'Time\'s up!';
    }
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle problem submission
  const handleProblemSubmission = (problemId, solution) => {
    // Mock evaluation - in real implementation, this would be evaluated by backend
    const problem = problems.find(p => p.id === problemId);
    if (problem) {
      // Simple mock evaluation (in real app, this would be proper code evaluation)
      const isCorrect = Math.random() > 0.5; // 50% chance of being correct for demo
      const score = isCorrect ? problem.points : 0;
      
      // Update student submission in shared data
      updateStudentSubmission('2024CSE001', problemId, solution, isCorrect, score);
      
      // Show result to student
      if (isCorrect) {
        alert(`Correct! You earned ${score} points.`);
      } else {
        alert('Incorrect. Please try again.');
      }
    }
  };

  // Show disclaimer page first
  if (currentPage === 'disclaimer') {
    return <DisclaimerPage onBeginTest={handleBeginTest} />;
  }

  // Show test mode
  if (currentPage === 'test' && isTestMode) {
    return (
      <TestMode
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedDifficulty={selectedDifficulty}
        setSelectedDifficulty={setSelectedDifficulty}
        filteredProblems={filteredProblems}
        getRemainingTime={getRemainingTime}
        endTest={endTest}
        onProblemSubmission={handleProblemSubmission}
      />
    );
  }

  return null;
};

export default StudentPortal; 