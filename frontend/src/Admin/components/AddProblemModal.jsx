import React from 'react';
import { Plus } from 'lucide-react';

const AddProblemModal = ({ 
  newProblem, 
  setNewProblem,
  handleAddProblem,
  addConstraint,
  updateConstraint,
  removeConstraint,
  addSampleTestCase,
  updateSampleTestCase,
  removeSampleTestCase,
  addHiddenTestCase,
  updateHiddenTestCase,
  removeHiddenTestCase,
  onClose
}) => {
  return (
    <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-slate-800">Add New Problem</h3>
            <button
              onClick={onClose}
              className="text-red-500 hover:text-red-700 text-xl"
            >
              ✕
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-slate-700 font-semibold mb-2">Problem Title</label>
              <input
                type="text"
                value={newProblem.title}
                onChange={(e) => setNewProblem({...newProblem, title: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Enter problem title"
              />
            </div>
            
            <div>
              <label className="block text-slate-700 font-semibold mb-2">Category</label>
              <input
                type="text"
                value={newProblem.category}
                onChange={(e) => setNewProblem({...newProblem, category: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="e.g., Arrays, Strings, etc."
              />
            </div>
            
            <div>
              <label className="block text-slate-700 font-semibold mb-2">Difficulty</label>
              <select
                value={newProblem.difficulty}
                onChange={(e) => setNewProblem({...newProblem, difficulty: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-slate-700 font-semibold mb-2">Problem Description</label>
            <textarea
              value={newProblem.description}
              onChange={(e) => setNewProblem({...newProblem, description: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300 h-32 resize-none"
              placeholder="Enter detailed problem description..."
            />
          </div>

          <div className="mt-6">
            <label className="block text-slate-700 font-semibold mb-2">Constraints</label>
            {newProblem.constraints.map((constraint, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={constraint}
                  onChange={(e) => updateConstraint(index, e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="Enter constraint"
                />
                <button
                  onClick={() => removeConstraint(index)}
                  className="px-3 py-2 text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              onClick={addConstraint}
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              + Add Constraint
            </button>
          </div>

          {/* Sample Test Cases (3 pairs) */}
          <div className="mt-6">
            <label className="block text-slate-700 font-semibold mb-2">
              Sample Test Cases (Visible to Students) - {newProblem.sampleTestCases.length}/3
            </label>
            {newProblem.sampleTestCases.map((testCase, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                <input
                  type="text"
                  value={testCase.input}
                  onChange={(e) => updateSampleTestCase(index, 'input', e.target.value)}
                  className="px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="Sample Input"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={testCase.output}
                    onChange={(e) => updateSampleTestCase(index, 'output', e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Sample Output"
                  />
                  {newProblem.sampleTestCases.length > 1 && (
                    <button
                      onClick={() => removeSampleTestCase(index)}
                      className="px-3 py-2 text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            ))}
            {newProblem.sampleTestCases.length < 3 && (
              <button
                onClick={addSampleTestCase}
                className="text-blue-500 hover:text-blue-700 text-sm"
              >
                + Add Sample Test Case
              </button>
            )}
          </div>

          {/* Hidden Test Cases (4 pairs) */}
          <div className="mt-6">
            <label className="block text-slate-700 font-semibold mb-2">
              Hidden Test Cases (Backend Testing) - {newProblem.hiddenTestCases.length}/4
            </label>
            {newProblem.hiddenTestCases.map((testCase, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                <input
                  type="text"
                  value={testCase.input}
                  onChange={(e) => updateHiddenTestCase(index, 'input', e.target.value)}
                  className="px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="Hidden Input"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={testCase.output}
                    onChange={(e) => updateHiddenTestCase(index, 'output', e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Hidden Output"
                  />
                  {newProblem.hiddenTestCases.length > 1 && (
                    <button
                      onClick={() => removeHiddenTestCase(index)}
                      className="px-3 py-2 text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            ))}
            {newProblem.hiddenTestCases.length < 4 && (
              <button
                onClick={addHiddenTestCase}
                className="text-blue-500 hover:text-blue-700 text-sm"
              >
                + Add Hidden Test Case
              </button>
            )}
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={handleAddProblem}
              className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
            >
              Add Problem
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProblemModal; 