import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Play, CheckCircle } from 'lucide-react';

const Problems = ({ searchTerm, setSearchTerm, selectedDifficulty, setSelectedDifficulty, filteredProblems }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search problems..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="all">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      {/* Problems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProblems.map((problem) => (
          <div key={problem.id} className="glassmorphism p-6 rounded-xl hover:shadow-lg transition">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{problem.title}</h3>
                <p className="text-sm text-slate-600 mb-3 line-clamp-2">{problem.description}</p>
              </div>
              {problem.solved && (
                <CheckCircle className="text-green-500 flex-shrink-0 ml-2" size={20} />
              )}
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {problem.difficulty}
              </span>
              <span className="text-xs text-slate-500">{problem.category}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">{problem.submissions} submissions</span>
              <button
                onClick={() => navigate(`/problem/${problem.id}`)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition"
              >
                <Play size={16} />
                Solve
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Problems; 