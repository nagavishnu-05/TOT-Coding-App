import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Play, RotateCcw, Download, Copy, CheckCircle, XCircle, Clock } from 'lucide-react';
import vcetLogo from '../assets/VCET Logo.jpg';
import cseLogo from '../assets/CSE LOGO.jpg';

const CodeEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState('problem');

  useEffect(() => {
    document.title = "Trialthon of Tech | Code Editor";
  }, []);

  // Mock problem data
  const problem = {
    id: id || 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays',
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
      }
    ],
    constraints: [
      '2 <= nums.length <= 104',
      '-109 <= nums[i] <= 109',
      '-109 <= target <= 109',
      'Only one valid answer exists.'
    ]
  };

  const defaultCode = {
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Your code here
    
};`,
    python: `def twoSum(nums, target):
    # Your code here
    pass`,
    java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        return new int[]{};
    }
}`,
    cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Your code here
        return {};
    }
};`
  };

  useEffect(() => {
    setCode(defaultCode[selectedLanguage]);
  }, [selectedLanguage]);

  const handleRunCode = async () => {
    setIsRunning(true);
    // Simulate code execution
    setTimeout(() => {
      setResults({
        status: 'success',
        testCases: [
          { input: '[2,7,11,15], 9', output: '[0,1]', expected: '[0,1]', passed: true },
          { input: '[3,2,4], 6', output: '[1,2]', expected: '[1,2]', passed: true },
          { input: '[3,3], 6', output: '[0,1]', expected: '[0,1]', passed: true }
        ],
        runtime: '4ms',
        memory: '38.5MB',
        totalTests: 3,
        passedTests: 3
      });
      setIsRunning(false);
    }, 2000);
  };

  const handleResetCode = () => {
    setCode(defaultCode[selectedLanguage]);
    setResults(null);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-blue-100">
      {/* Header */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between px-8 pt-8 pb-6">
        <div className="flex items-center gap-4">
          <button
            className="px-4 py-2 rounded-lg font-semibold bg-white/70 text-green-700 shadow hover:bg-green-100 transition border border-green-200 backdrop-blur-md"
            onClick={() => navigate('/student')}
          >
            &larr; Back
          </button>
          <img src={vcetLogo} alt="VCET Logo" className="h-16 w-auto object-contain" />
          <h1 className="text-xl font-bold text-slate-800">{problem.title}</h1>
          <img src={cseLogo} alt="CSE Logo" className="h-16 w-auto object-contain" />
        </div>
        <div className="flex items-center gap-4">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
            problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {problem.difficulty}
          </span>
          <span className="text-slate-600 font-medium">{problem.category}</span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
          {/* Left Panel - Problem Description */}
          <div className="glassmorphism rounded-xl p-6 overflow-y-auto">
            <div className="flex gap-2 mb-6">
              <button
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === 'problem' ? 'bg-blue-500 text-white' : 'text-slate-600 hover:bg-white/50'
                }`}
                onClick={() => setActiveTab('problem')}
              >
                Problem
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === 'submissions' ? 'bg-blue-500 text-white' : 'text-slate-600 hover:bg-white/50'
                }`}
                onClick={() => setActiveTab('submissions')}
              >
                Submissions
              </button>
            </div>

            {activeTab === 'problem' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 mb-4">{problem.title}</h2>
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line">{problem.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Examples:</h3>
                  {problem.examples.map((example, index) => (
                    <div key={index} className="bg-white/50 rounded-lg p-4 mb-4">
                      <div className="mb-2">
                        <span className="font-medium text-slate-700">Input:</span>
                        <code className="ml-2 bg-slate-100 px-2 py-1 rounded text-sm">{example.input}</code>
                      </div>
                      <div className="mb-2">
                        <span className="font-medium text-slate-700">Output:</span>
                        <code className="ml-2 bg-slate-100 px-2 py-1 rounded text-sm">{example.output}</code>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">Explanation:</span>
                        <p className="mt-1 text-slate-600">{example.explanation}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Constraints:</h3>
                  <ul className="list-disc list-inside space-y-1 text-slate-700">
                    {problem.constraints.map((constraint, index) => (
                      <li key={index}>{constraint}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'submissions' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">My Submissions</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-800">Submission #1</p>
                      <p className="text-sm text-slate-600">2 minutes ago</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-green-500" size={16} />
                      <span className="text-xs text-green-600">Accepted</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-800">Submission #2</p>
                      <p className="text-sm text-slate-600">15 minutes ago</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <XCircle className="text-red-500" size={16} />
                      <span className="text-xs text-red-600">Wrong Answer</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Code Editor */}
          <div className="glassmorphism rounded-xl p-6 flex flex-col">
            {/* Editor Toolbar */}
            <div className="flex items-center justify-between mb-4">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
              </select>
              
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="p-2 text-slate-600 hover:text-slate-800 transition"
                  title="Copy code"
                >
                  <Copy size={16} />
                </button>
                <button
                  onClick={handleResetCode}
                  className="p-2 text-slate-600 hover:text-slate-800 transition"
                  title="Reset code"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition disabled:opacity-50"
                >
                  {isRunning ? <Clock size={16} /> : <Play size={16} />}
                  {isRunning ? 'Running...' : 'Run Code'}
                </button>
              </div>
            </div>

            {/* Code Editor */}
            <div className="flex-1 bg-slate-900 rounded-lg overflow-hidden">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full bg-slate-900 text-green-400 p-4 font-mono text-sm resize-none focus:outline-none"
                placeholder="Write your code here..."
              />
            </div>

            {/* Results Panel */}
            {results && (
              <div className="mt-4 glassmorphism rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-slate-800">Test Results</h3>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-slate-600">Runtime: {results.runtime}</span>
                    <span className="text-slate-600">Memory: {results.memory}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {results.testCases.map((testCase, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-white/50 rounded">
                      <div className="flex items-center gap-2">
                        {testCase.passed ? (
                          <CheckCircle className="text-green-500" size={16} />
                        ) : (
                          <XCircle className="text-red-500" size={16} />
                        )}
                        <span className="text-sm font-medium">Test Case {index + 1}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        testCase.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {testCase.passed ? 'Passed' : 'Failed'}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-3 pt-3 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">
                      {results.passedTests}/{results.totalTests} test cases passed
                    </span>
                    <span className={`text-sm font-medium ${
                      results.passedTests === results.totalTests ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {results.passedTests === results.totalTests ? 'All Tests Passed!' : 'Some Tests Failed'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor; 