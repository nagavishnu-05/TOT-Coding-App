import React from 'react';

const ProblemDetails = ({ problems, selectedProblem, setSelectedProblem }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Problem Details</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <select
              value={selectedProblem?.id || ''}
              onChange={(e) => {
                const problem = problems.find(p => p.id === parseInt(e.target.value));
                setSelectedProblem(problem);
              }}
              className="appearance-none px-6 py-3 pr-10 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white/80 backdrop-blur-md min-w-[300px]"
            >
              <option value="">Select a problem to view details</option>
              {problems.map((problem) => (
                <option key={problem.id} value={problem.id}>
                  {problem.title} - {problem.difficulty} ({problem.category})
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {selectedProblem && (
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                selectedProblem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                selectedProblem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {selectedProblem.difficulty}
              </span>
            </div>
          )}
        </div>
      </div>
      
      {selectedProblem && (
        <div className="glassmorphism p-6 rounded-xl">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{selectedProblem.title}</h3>
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
              <p className="text-slate-700 leading-relaxed">{selectedProblem.description}</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-slate-800 mb-3">Constraints:</h4>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                {selectedProblem.constraints.map((constraint, index) => (
                  <li key={index}>{constraint}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-slate-800 mb-3">Sample Test Cases (Visible to Students):</h4>
              <div className="space-y-3">
                {selectedProblem.sampleTestCases && selectedProblem.sampleTestCases.map((testCase, index) => (
                  <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="mb-2">
                      <span className="font-medium text-slate-700">Input:</span>
                      <code className="ml-2 bg-green-100 px-2 py-1 rounded text-sm">{testCase.input}</code>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Output:</span>
                      <code className="ml-2 bg-green-100 px-2 py-1 rounded text-sm">{testCase.output}</code>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-slate-800 mb-3">Hidden Test Cases (Backend Testing):</h4>
              <div className="space-y-3">
                {selectedProblem.hiddenTestCases && selectedProblem.hiddenTestCases.map((testCase, index) => (
                  <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="mb-2">
                      <span className="font-medium text-slate-700">Input:</span>
                      <code className="ml-2 bg-red-100 px-2 py-1 rounded text-sm">{testCase.input}</code>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Output:</span>
                      <code className="ml-2 bg-red-100 px-2 py-1 rounded text-sm">{testCase.output}</code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemDetails; 