import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Play, CheckCircle, AlertTriangle, X, Code, FileText, TestTube, PlayCircle, Trash2 } from 'lucide-react';
import vcetLogo from '../../assets/VCET Logo.jpg';
import cseLogo from '../../assets/CSE LOGO.jpg';

const TestMode = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedDifficulty, 
  setSelectedDifficulty, 
  filteredProblems, 
  getRemainingTime, 
  endTest,
  onProblemSubmission
}) => {
  const navigate = useNavigate();
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [showProblemDetails, setShowProblemDetails] = useState(false);
  const [codeSolution, setCodeSolution] = useState('');
  const [testInput, setTestInput] = useState('');
  const [testOutput, setTestOutput] = useState('');

  const handleSolveProblem = (problem) => {
    setSelectedProblem(problem);
    setShowProblemDetails(true);
    setCodeSolution('');
    setTestInput('');
    setTestOutput('');
  };

  const handleSubmitSolution = () => {
    if (codeSolution.trim()) {
      onProblemSubmission(selectedProblem.id, codeSolution);
      setCodeSolution('');
      setShowProblemDetails(false);
      setSelectedProblem(null);
    } else {
      alert('Please enter your solution before submitting.');
    }
  };

  const handleRunTest = () => {
    if (testInput.trim() && codeSolution.trim()) {
      // Mock test execution
      setTestOutput('Test output will appear here...');
    } else {
      alert('Please enter both code and test input.');
    }
  };

  const handleRunAllTests = () => {
    if (codeSolution.trim()) {
      // Mock all tests execution
      setTestOutput('Running all test cases...\n✓ Test case 1 passed\n✓ Test case 2 passed\n✗ Test case 3 failed');
    } else {
      alert('Please enter your solution first.');
    }
  };

  if (showProblemDetails && selectedProblem) {
    return (
      <div className="fixed inset-0 bg-slate-900 text-white z-50">
        {/* Problem Header - Matching Admin style */}
        <div className="bg-slate-800 border-b border-slate-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={vcetLogo} alt="VCET Logo" className="h-16 w-auto object-contain" />
              <div>
                <h1 className="text-xl font-bold text-white">Trialthon of Tech : Coding Contest</h1>
                <p className="text-sm text-slate-400">Test Mode - Student ID: 2024CSE001</p>
              </div>
              <img src={cseLogo} alt="CSE Logo" className="h-16 w-auto object-contain" />
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-sm text-slate-400">Time Remaining</div>
                <div className="text-2xl font-bold text-red-400">{getRemainingTime()}</div>
              </div>
              <button
                onClick={() => setShowProblemDetails(false)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition"
              >
                <X size={16} />
                Back to Problems
              </button>
            </div>
          </div>
        </div>

        {/* Problem Content - New Layout */}
        <div className="h-full overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
              {/* Left Side - Problem Description */}
              <div className="space-y-6">
                <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <FileText className="text-blue-400" size={20} />
                    Problem Description
                  </h3>
                  <p className="text-slate-300 mb-4">{selectedProblem.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-white mb-2">Constraints:</h4>
                    <ul className="text-slate-300 space-y-1">
                      {selectedProblem.constraints.map((constraint, index) => (
                        <li key={index} className="text-sm">• {constraint}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Sample Test Cases */}
                <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <TestTube className="text-green-400" size={20} />
                    Sample Test Cases
                  </h3>
                  <div className="space-y-4">
                    {selectedProblem.sampleTestCases.map((testCase, index) => (
                      <div key={index} className="bg-slate-700 p-4 rounded-lg">
                        <div className="mb-2">
                          <span className="text-sm font-medium text-slate-400">Input:</span>
                          <p className="text-white text-sm">{testCase.input}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-slate-400">Output:</span>
                          <p className="text-white text-sm">{testCase.output}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Problem Info */}
                <div className="problem-info">
                  <h3>Problem Information</h3>
                  <div className="problem-info-row">
                    <span className="problem-info-label">Difficulty:</span>
                    <span className={`difficulty-badge ${selectedProblem.difficulty.toLowerCase()}`}>
                      {selectedProblem.difficulty}
                    </span>
                  </div>
                  <div className="problem-info-row">
                    <span className="problem-info-label">Category:</span>
                    <span className="problem-info-value">{selectedProblem.category}</span>
                  </div>
                  <div className="problem-info-row">
                    <span className="problem-info-label">Points:</span>
                    <span className="problem-info-value">{selectedProblem.points}</span>
                  </div>
                  <div className="problem-info-row">
                    <span className="problem-info-label">Submissions:</span>
                    <span className="problem-info-value">{selectedProblem.submissions}</span>
                  </div>
                </div>
              </div>

              {/* Right Side - Code Editor and Input/Output */}
              <div className="space-y-6">
                {/* Code Editor - First Half */}
                <div className="code-editor-container">
                  <div className="code-editor-header">
                    <span className="code-editor-title">Your Solution</span>
                    <div className="code-editor-actions">
                      <button
                        onClick={handleSubmitSolution}
                        className="code-editor-btn run"
                      >
                        <PlayCircle size={12} />
                        Submit
                      </button>
                      <button
                        onClick={() => setCodeSolution('')}
                        className="code-editor-btn clear"
                      >
                        <Trash2 size={12} />
                        Clear
                      </button>
                    </div>
                  </div>
                  <textarea
                    value={codeSolution}
                    onChange={(e) => setCodeSolution(e.target.value)}
                    placeholder="Write your solution here..."
                    className="code-editor-textarea"
                  />
                </div>

                {/* Input/Output - Second Half */}
                <div className="io-section">
                  <div className="io-header">
                    Test Your Solution
                  </div>
                  <div className="io-content">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Input:</label>
                        <textarea
                          value={testInput}
                          onChange={(e) => setTestInput(e.target.value)}
                          placeholder="Enter test input here..."
                          className="io-textarea"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Output:</label>
                        <textarea
                          value={testOutput}
                          placeholder="Expected output will appear here..."
                          className="io-textarea"
                          readOnly
                        />
                      </div>
                      <div className="test-buttons">
                        <button 
                          onClick={handleRunTest}
                          className="test-btn run"
                        >
                          <Play size={14} />
                          Run Test
                        </button>
                        <button 
                          onClick={handleRunAllTests}
                          className="test-btn run-all"
                        >
                          <TestTube size={14} />
                          Run All Tests
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-900 text-white z-50">
      {/* Test Header - Matching Admin style */}
      <div className="bg-slate-800 border-b border-slate-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={vcetLogo} alt="VCET Logo" className="h-16 w-auto object-contain" />
            <div>
              <h1 className="text-xl font-bold text-white">Trialthon of Tech : Coding Contest</h1>
              <p className="text-sm text-slate-400">Test Mode - Student ID: 2024CSE001</p>
            </div>
            <img src={cseLogo} alt="CSE Logo" className="h-16 w-auto object-contain" />
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-sm text-slate-400">Time Remaining</div>
              <div className="text-2xl font-bold text-red-400">{getRemainingTime()}</div>
            </div>
            <button
              onClick={endTest}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              <X size={16} />
              End Test
            </button>
          </div>
        </div>
      </div>

      {/* Test Content */}
      <div className="h-full overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto">
          {/* Warning Banner */}
          <div className="bg-red-900/50 border border-red-700 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="text-red-400" size={20} />
              <span className="font-semibold text-red-400">Test Mode Active</span>
            </div>
            <p className="text-sm text-red-300">
              You are in full-screen test mode. Do not attempt to exit full-screen, switch tabs, or refresh the page. 
              Any attempt to escape will automatically end your test and mark all scores as zero.
            </p>
          </div>

          {/* Problems Section */}
          <div className="space-y-6">
            <div className="flex gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Search problems..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-600 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-2 rounded-lg border border-slate-600 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="all">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProblems.map((problem) => (
                <div key={problem.id} className="bg-slate-800 border border-slate-700 p-6 rounded-xl hover:shadow-lg transition">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">{problem.title}</h3>
                      <p className="text-sm text-slate-400 mb-3 line-clamp-2">{problem.description}</p>
                    </div>
                    {problem.solved && (
                      <CheckCircle className="text-green-500 flex-shrink-0 ml-2" size={20} />
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className={`difficulty-badge ${problem.difficulty.toLowerCase()}`}>
                      {problem.difficulty}
                    </span>
                    <span className="text-xs text-slate-400">{problem.category}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-slate-400">{problem.submissions} submissions</span>
                      <span className="text-xs text-slate-400">{problem.points} points</span>
                    </div>
                    <button
                      onClick={() => handleSolveProblem(problem)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                    >
                      <Play size={16} />
                      Solve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestMode; 