import React from 'react';
import { Info, BookOpen, Code, Trophy } from 'lucide-react';

const NavigationTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex gap-1 mb-8 bg-white/70 rounded-xl p-1 backdrop-blur-md">
      <button
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
          activeTab === 'dashboard' ? 'bg-blue-500 text-white' : 'text-slate-600 hover:bg-white/50'
        }`}
        onClick={() => setActiveTab('dashboard')}
      >
        <Info size={18} />
        Dashboard
      </button>
      <button
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
          activeTab === 'problems' ? 'bg-blue-500 text-white' : 'text-slate-600 hover:bg-white/50'
        }`}
        onClick={() => setActiveTab('problems')}
      >
        <BookOpen size={18} />
        Problems
      </button>
      <button
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
          activeTab === 'submissions' ? 'bg-blue-500 text-white' : 'text-slate-600 hover:bg-white/50'
        }`}
        onClick={() => setActiveTab('submissions')}
      >
        <Code size={18} />
        Submissions
      </button>
      <button
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
          activeTab === 'progress' ? 'bg-blue-500 text-white' : 'text-slate-600 hover:bg-white/50'
        }`}
        onClick={() => setActiveTab('progress')}
      >
        <Trophy size={18} />
        Progress
      </button>
    </div>
  );
};

export default NavigationTabs; 