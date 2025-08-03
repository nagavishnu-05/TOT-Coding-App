import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Play, RotateCcw, Copy, CheckCircle, XCircle, Clock, TestTube, AlertTriangle } from 'lucide-react';
import vcetLogo from '../assets/VCET Logo.jpg';
import cseLogo from '../assets/CSE LOGO.jpg';
import { problemsData } from '../shared/problemsData';

const CodeEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [customInput, setCustomInput] = useState('');
  const [customOutput, setCustomOutput] = useState('');
  const [problem, setProblem] = useState(null);

  // Judge0 API configuration
  const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com';
  const JUDGE0_API_KEY = 'd6cf3af761msha58ebe1726e4697p180d53jsn0319e3ce1427';

  // Language ID mapping for Judge0
  const languageIds = {
    'javascript': 63, // JavaScript (Node.js 12.14.0)
    'python': 71,     // Python (3.8.1)
    'java': 62,       // Java (OpenJDK 13.0.1)
    'cpp': 54,        // C++ (GCC 9.2.0)
    'c': 50           // C (GCC 9.2.0)
  };

  useEffect(() => {
    document.title = "Trialthon of Tech | Code Editor";
    
    // Find the problem by ID
    const foundProblem = problemsData.find(p => p.id === parseInt(id));
    if (foundProblem) {
      setProblem(foundProblem);
      // Set default code based on the problem
      setCode(getDefaultCode(selectedLanguage, foundProblem));
    }
  }, [id, selectedLanguage]);

  const getDefaultCode = (language, problem) => {
    const templates = {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Your code here
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
};

// Test the function
console.log(twoSum([2,7,11,15], 9)); // Should output [0,1]
console.log(twoSum([3,2,4], 6));      // Should output [1,2]
console.log(twoSum([3,3], 6));        // Should output [0,1]`,
      
      python: `def twoSum(nums, target):
    # Your code here
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []

# Test the function
print(twoSum([2,7,11,15], 9))  # Should output [0,1]
print(twoSum([3,2,4], 6))      # Should output [1,2]
print(twoSum([3,3], 6))        # Should output [0,1]`,
      
      java: `import java.util.*;

public class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] + nums[j] == target) {
                    return new int[]{i, j};
                }
            }
        }
        return new int[]{};
    }
    
    public static void main(String[] args) {
        Solution solution = new Solution();
        System.out.println(Arrays.toString(solution.twoSum(new int[]{2,7,11,15}, 9)));
        System.out.println(Arrays.toString(solution.twoSum(new int[]{3,2,4}, 6)));
        System.out.println(Arrays.toString(solution.twoSum(new int[]{3,3}, 6)));
    }
}`,
      
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Your code here
        for (int i = 0; i < nums.size(); i++) {
            for (int j = i + 1; j < nums.size(); j++) {
                if (nums[i] + nums[j] == target) {
                    return {i, j};
                }
            }
        }
        return {};
    }
};

int main() {
    Solution solution;
    vector<int> nums1 = {2,7,11,15};
    vector<int> result1 = solution.twoSum(nums1, 9);
    cout << "[" << result1[0] << "," << result1[1] << "]" << endl;
    
    vector<int> nums2 = {3,2,4};
    vector<int> result2 = solution.twoSum(nums2, 6);
    cout << "[" << result2[0] << "," << result2[1] << "]" << endl;
    
    return 0;
}`
    };

    return templates[language] || templates.javascript;
  };

  // Judge0 API function to compile and run code
  const compileAndRunWithJudge0 = async (code, language, inputs) => {
    try {
      // Create submission
      const createResponse = await fetch(`${JUDGE0_API_URL}/submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
          'X-RapidAPI-Key': JUDGE0_API_KEY
        },
        body: JSON.stringify({
          source_code: code,
          language_id: languageIds[language],
          stdin: inputs.join('\n')
        })
      });

      if (!createResponse.ok) {
        throw new Error('Failed to create submission');
      }

      const submission = await createResponse.json();
      const token = submission.token;

      // Poll for results
      let result = null;
      let attempts = 0;
      const maxAttempts = 30; // 30 seconds timeout

      while (attempts < maxAttempts) {
        const getResponse = await fetch(`${JUDGE0_API_URL}/submissions/${token}`, {
          headers: {
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
            'X-RapidAPI-Key': JUDGE0_API_KEY
          }
        });

        if (!getResponse.ok) {
          throw new Error('Failed to get submission result');
        }

        result = await getResponse.json();

        if (result.status && result.status.id > 2) {
          // Status > 2 means processing is complete
          break;
        }

        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
        attempts++;
      }

      return result;
    } catch (error) {
      console.error('Judge0 API error:', error);
      throw error;
    }
  };

  const handleRunCode = async () => {
    if (!code.trim()) {
      alert('Please write some code first.');
      return;
    }

    setIsRunning(true);
    setResults(null);

    try {
      // Use custom input if provided, otherwise use first sample test case
      const testInput = customInput.trim() || (problem?.sampleTestCases[0]?.input || '');
      
      const result = await compileAndRunWithJudge0(code, selectedLanguage, [testInput]);
      
      if (result.stdout) {
        setCustomOutput(result.stdout);
      } else if (result.stderr) {
        setCustomOutput(`Error: ${result.stderr}`);
      } else {
        setCustomOutput('No output');
      }

      setResults({
        status: 'success',
        message: 'Code executed successfully',
        output: result.stdout || result.stderr || 'No output',
        runtime: result.time || 'N/A',
        memory: result.memory || 'N/A'
      });

    } catch (error) {
      setResults({
        status: 'error',
        message: 'Execution failed',
        output: `Error: ${error.message}`,
        runtime: 'N/A',
        memory: 'N/A'
      });
      setCustomOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmitCode = async () => {
    if (!code.trim()) {
      alert('Please write some code before submitting.');
      return;
    }

    setIsRunning(true);
    setResults(null);

    try {
      // Get all test cases from the problem
      const allTestCases = [
        ...problem.sampleTestCases,
        ...problem.hiddenTestCases
      ];

      // Prepare inputs for Judge0
      const inputs = allTestCases.map(testCase => testCase.input);
      const expectedOutputs = allTestCases.map(testCase => testCase.output);

      // Compile and run with Judge0
      const result = await compileAndRunWithJudge0(code, selectedLanguage, inputs);

      // Process results
      let passedTests = 0;
      let totalTests = allTestCases.length;
      let testResults = [];

      if (result.stdout) {
        const actualOutputs = result.stdout.trim().split('\n');
        
        for (let i = 0; i < Math.min(actualOutputs.length, expectedOutputs.length); i++) {
          const actual = actualOutputs[i].trim();
          const expected = expectedOutputs[i].trim();
          const passed = actual === expected;
          
          if (passed) passedTests++;
          
          testResults.push({
            input: allTestCases[i].input,
            output: actual,
            expected: expected,
            passed: passed
          });
        }
      }

      const isCorrect = passedTests === totalTests;
      const score = isCorrect ? problem.points : 0;

      setResults({
        status: isCorrect ? 'success' : 'error',
        message: isCorrect ? 'All test cases passed!' : 'Some test cases failed',
        testCases: testResults,
        runtime: result.time || 'N/A',
        memory: result.memory || 'N/A',
        totalTests: totalTests,
        passedTests: passedTests,
        score: score,
        submitted: true
      });

      if (isCorrect) {
        alert(`Congratulations! Your solution is correct and has been submitted successfully. Score: ${score} points`);
      } else {
        alert(`Some test cases failed. Please review your solution and try again. Passed: ${passedTests}/${totalTests}`);
      }

    } catch (error) {
      setResults({
        status: 'error',
        message: 'Submission failed',
        output: `Error: ${error.message}`,
        runtime: 'N/A',
        memory: 'N/A',
        totalTests: 0,
        passedTests: 0,
        score: 0
      });
      alert(`Submission failed: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleResetCode = () => {
    setCode(getDefaultCode(selectedLanguage, problem));
    setResults(null);
    setCustomInput('');
    setCustomOutput('');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  if (!problem) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-white to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Problem Not Found</h2>
          <button
            onClick={() => navigate('/student')}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Back to Problems
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              className="px-4 py-2 rounded-lg font-semibold bg-slate-700 text-white hover:bg-slate-600 transition"
              onClick={() => navigate('/student')}
            >
              &larr; Back
            </button>
            <img src={vcetLogo} alt="VCET Logo" className="h-12 w-auto object-contain" />
            <h1 className="text-xl font-bold text-white">{problem.title}</h1>
            <img src={cseLogo} alt="CSE Logo" className="h-12 w-auto object-contain" />
          </div>
          <div className="flex items-center gap-4">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
              problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {problem.difficulty}
            </span>
            <span className="text-slate-300 font-medium">{problem.category}</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto h-[calc(100vh-80px)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-full">
          {/* Left Panel - Problem Description */}
          <div className="bg-slate-800 border-r border-slate-700 overflow-y-auto">
            <div className="p-6">
              <div className="flex gap-2 mb-6">
                <button
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    activeTab === 'description' ? 'bg-blue-500 text-white' : 'text-slate-400 hover:text-slate-300'
                  }`}
                  onClick={() => setActiveTab('description')}
                >
                  Description
                </button>
                <button
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    activeTab === 'submissions' ? 'bg-blue-500 text-white' : 'text-slate-400 hover:text-slate-300'
                  }`}
                  onClick={() => setActiveTab('submissions')}
                >
                  Submissions
                </button>
              </div>

              {activeTab === 'description' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-4">{problem.title}</h2>
                    <p className="text-slate-300 leading-relaxed whitespace-pre-line">{problem.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Examples:</h3>
                    {problem.sampleTestCases.map((testCase, index) => (
                      <div key={index} className="bg-slate-700 rounded-lg p-4 mb-4">
                        <div className="mb-2">
                          <span className="font-medium text-slate-300">Input:</span>
                          <code className="ml-2 bg-slate-600 px-2 py-1 rounded text-sm">{testCase.input}</code>
                        </div>
                        <div>
                          <span className="font-medium text-slate-300">Output:</span>
                          <code className="ml-2 bg-slate-600 px-2 py-1 rounded text-sm">{testCase.output}</code>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Constraints:</h3>
                    <ul className="list-disc list-inside space-y-1 text-slate-300">
                      {problem.constraints.map((constraint, index) => (
                        <li key={index}>{constraint}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'submissions' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white mb-4">My Submissions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                      <div>
                        <p className="font-medium text-white">Submission #1</p>
                        <p className="text-sm text-slate-400">2 minutes ago</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="text-green-500" size={16} />
                        <span className="text-xs text-green-400">Accepted</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                      <div>
                        <p className="font-medium text-white">Submission #2</p>
                        <p className="text-sm text-slate-400">15 minutes ago</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <XCircle className="text-red-500" size={16} />
                        <span className="text-xs text-red-400">Wrong Answer</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Code Editor */}
          <div className="bg-slate-900 flex flex-col">
            {/* Editor Toolbar */}
            <div className="bg-slate-800 border-b border-slate-700 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-white font-medium">Code</span>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-slate-600 bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                    <option value="c">C</option>
                  </select>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={copyToClipboard}
                    className="p-2 text-slate-400 hover:text-white transition"
                    title="Copy code"
                  >
                    <Copy size={16} />
                  </button>
                  <button
                    onClick={handleResetCode}
                    className="p-2 text-slate-400 hover:text-white transition"
                    title="Reset code"
                  >
                    <RotateCcw size={16} />
                  </button>
                  <button
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 shadow-sm"
                  >
                    {isRunning ? <Clock size={16} /> : <Play size={16} />}
                    {isRunning ? 'Running...' : 'Run'}
                  </button>
                  <button
                    onClick={handleSubmitCode}
                    disabled={isRunning}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 shadow-sm"
                  >
                    {isRunning ? <Clock size={16} /> : <TestTube size={16} />}
                    {isRunning ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </div>
            </div>

            {/* Code Editor */}
            <div className="flex-1 p-4">
              <div className="code-editor-container h-full">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="code-editor-textarea h-full"
                  placeholder="Write your code here..."
                />
              </div>
            </div>

            {/* Test Cases Section */}
            <div className="bg-slate-800 border-t border-slate-700">
              <div className="flex border-b border-slate-700">
                <button
                  className={`px-4 py-2 font-medium ${
                    activeTab === 'testcase' 
                      ? 'text-blue-400 border-b-2 border-blue-400' 
                      : 'text-slate-400 hover:text-slate-300'
                  }`}
                  onClick={() => setActiveTab('testcase')}
                >
                  Testcase
                </button>
                <button
                  className={`px-4 py-2 font-medium ${
                    activeTab === 'testresult' 
                      ? 'text-blue-400 border-b-2 border-blue-400' 
                      : 'text-slate-400 hover:text-slate-300'
                  }`}
                  onClick={() => setActiveTab('testresult')}
                >
                  Test Result
                </button>
              </div>

              <div className="p-4">
                {activeTab === 'testcase' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Input:</label>
                      <textarea
                        value={customInput}
                        onChange={(e) => setCustomInput(e.target.value)}
                        placeholder="Enter test input here..."
                        className="io-textarea w-full"
                        rows={4}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Output:</label>
                      <textarea
                        value={customOutput}
                        readOnly
                        placeholder="Output will appear here..."
                        className="io-textarea w-full"
                        rows={4}
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'testresult' && (
                  <div className="space-y-4">
                    {isRunning ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-4"></div>
                        <p className="text-slate-400">Compiling and testing...</p>
                      </div>
                    ) : results ? (
                      <div className={`p-4 rounded-lg ${
                        results.status === 'success' 
                          ? 'bg-green-900/20 border border-green-700' 
                          : 'bg-red-900/20 border border-red-700'
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          {results.status === 'success' ? (
                            <CheckCircle className="text-green-400" size={20} />
                          ) : (
                            <AlertTriangle className="text-red-400" size={20} />
                          )}
                          <span className={`font-medium ${
                            results.status === 'success' ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {results.message}
                          </span>
                        </div>
                        
                        {results.testCases && (
                          <div className="space-y-2 mb-3">
                            {results.testCases.map((testCase, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-slate-700 rounded">
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
                        )}
                        
                        <pre className="text-sm text-slate-300 whitespace-pre-wrap">
                          {results.output}
                        </pre>
                        
                        {results.passedTests !== undefined && (
                          <div className="mt-2 text-slate-400 text-sm">
                            Passed: {results.passedTests}/{results.totalTests} test cases
                          </div>
                        )}
                        
                        {results.submitted && results.score > 0 && (
                          <div className="mt-2 text-green-400 font-medium">
                            Score: {results.score} points
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-slate-400 text-center py-8">
                        Click "Submit" to run your solution against all test cases.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor; 