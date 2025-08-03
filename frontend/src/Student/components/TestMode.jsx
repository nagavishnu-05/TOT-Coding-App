import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Play, CheckCircle, AlertTriangle, X, Code, FileText, TestTube, PlayCircle, Trash2, Save, Download, Share2, Star, MessageCircle } from 'lucide-react';
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
  const [selectedLanguage, setSelectedLanguage] = useState('cpp');
  const [testInput, setTestInput] = useState('');
  const [testOutput, setTestOutput] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);
  const [compilationResult, setCompilationResult] = useState(null);
  const [activeTab, setActiveTab] = useState('description'); // description, editorial, solutions, submissions
  const [testCaseTab, setTestCaseTab] = useState('testcase'); // testcase, testresult

  // Judge0 API configuration
  const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com';
  const JUDGE0_API_KEY = 'd6cf3af761msha58ebe1726e4697p180d53jsn0319e3ce1427'; // Replace with your actual API key

  // Language ID mapping for Judge0
  const languageIds = {
    'c': 50,      // C (GCC 9.2.0)
    'cpp': 54,    // C++ (GCC 9.2.0)
    'java': 62,   // Java (OpenJDK 13.0.1)
    'python': 71, // Python (3.8.1)
    'javascript': 63 // JavaScript (Node.js 12.14.0)
  };

  const handleSolveProblem = (problem) => {
    setSelectedProblem(problem);
    setShowProblemDetails(true);
    setCodeSolution('');
    setTestInput('');
    setTestOutput('');
    setCompilationResult(null);
    setActiveTab('description');
    setTestCaseTab('testcase');
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

  const handleCompileAndRun = async () => {
    if (!codeSolution.trim()) {
      alert('Please enter your code first.');
      return;
    }

    setIsCompiling(true);
    setCompilationResult(null);

    try {
      // Get all test cases from the problem (created by Admin)
      const allTestCases = [
        ...selectedProblem.sampleTestCases,
        ...selectedProblem.hiddenTestCases
      ];

      // Prepare inputs for Judge0
      const inputs = allTestCases.map(testCase => testCase.input);
      const expectedOutputs = allTestCases.map(testCase => testCase.output);

      // Compile and run with Judge0
      const result = await compileAndRunWithJudge0(codeSolution, selectedLanguage, inputs);

      // Process results
      let passedTests = 0;
      let totalTests = allTestCases.length;
      let outputDetails = '';

      if (result.stdout) {
        const actualOutputs = result.stdout.trim().split('\n');
        
        for (let i = 0; i < Math.min(actualOutputs.length, expectedOutputs.length); i++) {
          const actual = actualOutputs[i].trim();
          const expected = expectedOutputs[i].trim();
          
          if (actual === expected) {
            passedTests++;
            outputDetails += `✓ Test case ${i + 1} passed\n`;
          } else {
            outputDetails += `✗ Test case ${i + 1} failed\n`;
          }
        }
      }

      const isCorrect = passedTests === totalTests;
      const score = isCorrect ? selectedProblem.points : 0;

      setCompilationResult({
        status: isCorrect ? 'success' : 'error',
        message: isCorrect ? 'All test cases passed!' : 'Some test cases failed',
        output: outputDetails,
        score: score,
        passedTests: passedTests,
        totalTests: totalTests
      });

    } catch (error) {
      setCompilationResult({
        status: 'error',
        message: 'Compilation failed',
        output: `Error: ${error.message}`,
        score: 0
      });
    } finally {
      setIsCompiling(false);
      setTestCaseTab('testresult');
    }
  };

  const handleRunTest = async () => {
    if (testInput.trim() && codeSolution.trim()) {
      setIsCompiling(true);
      
      try {
        const result = await compileAndRunWithJudge0(codeSolution, selectedLanguage, [testInput]);
        
        if (result.stdout) {
          setTestOutput(result.stdout);
        } else if (result.stderr) {
          setTestOutput(`Error: ${result.stderr}`);
        } else {
          setTestOutput('No output');
        }
      } catch (error) {
        setTestOutput(`Error: ${error.message}`);
      } finally {
        setIsCompiling(false);
      }
    } else {
      alert('Please enter both code and test input.');
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

        {/* LeetCode-style Layout */}
        <div className="h-full flex">
          {/* Left Panel - Problem Description */}
          <div className="w-1/2 bg-slate-800 border-r border-slate-700 overflow-y-auto">
            <div className="p-6">
              {/* Problem Tabs */}
              <div className="flex border-b border-slate-700 mb-6">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`px-4 py-2 font-medium ${
                    activeTab === 'description' 
                      ? 'text-blue-400 border-b-2 border-blue-400' 
                      : 'text-slate-400 hover:text-slate-300'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('editorial')}
                  className={`px-4 py-2 font-medium ${
                    activeTab === 'editorial' 
                      ? 'text-blue-400 border-b-2 border-blue-400' 
                      : 'text-slate-400 hover:text-slate-300'
                  }`}
                >
                  Editorial
                </button>
                <button
                  onClick={() => setActiveTab('solutions')}
                  className={`px-4 py-2 font-medium ${
                    activeTab === 'solutions' 
                      ? 'text-blue-400 border-b-2 border-blue-400' 
                      : 'text-slate-400 hover:text-slate-300'
                  }`}
                >
                  Solutions
                </button>
                <button
                  onClick={() => setActiveTab('submissions')}
                  className={`px-4 py-2 font-medium ${
                    activeTab === 'submissions' 
                      ? 'text-blue-400 border-b-2 border-blue-400' 
                      : 'text-slate-400 hover:text-slate-300'
                  }`}
                >
                  Submissions
                </button>
              </div>

              {/* Problem Content */}
              {activeTab === 'description' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{selectedProblem.title}</h2>
                    <div className="flex gap-2 mb-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        selectedProblem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                        selectedProblem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {selectedProblem.difficulty}
                      </span>
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {selectedProblem.category}
                      </span>
                      <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                        {selectedProblem.points} points
                      </span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{selectedProblem.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Constraints:</h3>
                    <ul className="list-disc list-inside space-y-1 text-slate-300">
                      {selectedProblem.constraints.map((constraint, index) => (
                        <li key={index}>{constraint}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Sample Test Cases:</h3>
                    <div className="space-y-3">
                      {selectedProblem.sampleTestCases.map((testCase, index) => (
                        <div key={index} className="bg-slate-700 p-4 rounded-lg">
                          <div className="mb-2">
                            <span className="text-sm font-medium text-slate-400">Input:</span>
                            <p className="text-white text-sm mt-1">{testCase.input}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-slate-400">Output:</span>
                            <p className="text-white text-sm mt-1">{testCase.output}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Engagement Metrics */}
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-700">
                    <div className="flex items-center gap-2 text-slate-400">
                      <MessageCircle size={16} />
                      <span className="text-sm">775</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Star size={16} />
                      <span className="text-sm">4.5</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Share2 size={16} />
                      <span className="text-sm">Share</span>
                    </div>
                    <div className="ml-auto text-slate-400 text-sm">
                      4845 Online
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'editorial' && (
                <div className="text-slate-300">
                  <h3 className="text-lg font-semibold text-white mb-3">Editorial</h3>
                  <p>This section will contain the solution approach and explanation.</p>
                </div>
              )}

              {activeTab === 'solutions' && (
                <div className="text-slate-300">
                  <h3 className="text-lg font-semibold text-white mb-3">Solutions</h3>
                  <p>Community solutions will appear here.</p>
                </div>
              )}

              {activeTab === 'submissions' && (
                <div className="text-slate-300">
                  <h3 className="text-lg font-semibold text-white mb-3">Submissions</h3>
                  <p>Your submission history will appear here.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Code Editor */}
          <div className="w-1/2 bg-slate-900 flex flex-col">
            {/* Code Editor Header */}
            <div className="bg-slate-800 border-b border-slate-700 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-white font-medium">Code</span>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="px-3 py-1 bg-slate-700 text-white rounded border border-slate-600"
                  >
                    <option value="c">C</option>
                    <option value="cpp">C++</option>
                    <option value="java">Java</option>
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript</option>
                  </select>
                  <button className="px-3 py-1 bg-slate-700 text-white rounded text-sm">
                    Auto
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-slate-400 hover:text-white">
                    <Save size={16} />
                  </button>
                  <button className="text-slate-400 hover:text-white">
                    <Download size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Code Editor */}
            <div className="flex-1 p-4">
              <div className="code-editor-container h-full">
                <textarea
                  value={codeSolution}
                  onChange={(e) => setCodeSolution(e.target.value)}
                  placeholder={getCodeTemplate(selectedLanguage)}
                  className="code-editor-textarea h-full"
                />
              </div>
            </div>

            {/* Test Cases Section */}
            <div className="bg-slate-800 border-t border-slate-700">
              <div className="flex border-b border-slate-700">
                <button
                  onClick={() => setTestCaseTab('testcase')}
                  className={`px-4 py-2 font-medium ${
                    testCaseTab === 'testcase' 
                      ? 'text-blue-400 border-b-2 border-blue-400' 
                      : 'text-slate-400 hover:text-slate-300'
                  }`}
                >
                  Testcase
                </button>
                <button
                  onClick={() => setTestCaseTab('testresult')}
                  className={`px-4 py-2 font-medium ${
                    testCaseTab === 'testresult' 
                      ? 'text-blue-400 border-b-2 border-blue-400' 
                      : 'text-slate-400 hover:text-slate-300'
                  }`}
                >
                  Test Result
                </button>
              </div>

              <div className="p-4">
                {testCaseTab === 'testcase' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Input:</label>
                      <textarea
                        value={testInput}
                        onChange={(e) => setTestInput(e.target.value)}
                        placeholder="Enter test input here..."
                        className="io-textarea w-full"
                        rows={4}
                      />
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={handleRunTest}
                        className="test-btn run"
                        disabled={isCompiling}
                      >
                        <Play size={14} />
                        Run
                      </button>
                      <button 
                        onClick={handleCompileAndRun}
                        className="test-btn run-all"
                        disabled={isCompiling}
                      >
                        <TestTube size={14} />
                        {isCompiling ? 'Compiling...' : 'Submit'}
                      </button>
                    </div>
                  </div>
                )}

                {testCaseTab === 'testresult' && (
                  <div className="space-y-4">
                    {isCompiling ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-4"></div>
                        <p className="text-slate-400">Compiling and testing...</p>
                      </div>
                    ) : compilationResult ? (
                      <div className={`p-4 rounded-lg ${
                        compilationResult.status === 'success' 
                          ? 'bg-green-900/20 border border-green-700' 
                          : 'bg-red-900/20 border border-red-700'
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          {compilationResult.status === 'success' ? (
                            <CheckCircle className="text-green-400" size={20} />
                          ) : (
                            <AlertTriangle className="text-red-400" size={20} />
                          )}
                          <span className={`font-medium ${
                            compilationResult.status === 'success' ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {compilationResult.message}
                          </span>
                        </div>
                        <pre className="text-sm text-slate-300 whitespace-pre-wrap">
                          {compilationResult.output}
                        </pre>
                        {compilationResult.passedTests !== undefined && (
                          <div className="mt-2 text-slate-400 text-sm">
                            Passed: {compilationResult.passedTests}/{compilationResult.totalTests} test cases
                          </div>
                        )}
                        {compilationResult.status === 'success' && (
                          <div className="mt-2 text-green-400 font-medium">
                            Score: {compilationResult.score} points
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

// Helper function to get code templates for different languages
const getCodeTemplate = (language) => {
  switch (language) {
    case 'c':
      return `#include <stdio.h>
#include <stdlib.h>

int main() {
    // Your C code here
    printf("Hello, World!\\n");
    return 0;
}`;
    case 'cpp':
      return `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    // Your C++ code here
    void solve() {
        cout << "Hello, World!" << endl;
    }
};

int main() {
    Solution solution;
    solution.solve();
    return 0;
}`;
    case 'java':
      return `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        // Your Java code here
        System.out.println("Hello, World!");
    }
}`;
    case 'python':
      return `# Your Python code here
def main():
    print("Hello, World!")

if __name__ == "__main__":
    main()`;
    case 'javascript':
      return `// Your JavaScript code here
function main() {
    console.log("Hello, World!");
}

main();`;
    default:
      return `// Write your code here`;
  }
};

export default TestMode; 