import React from 'react';
import { Code, Eye } from 'lucide-react';

const NavigationTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex gap-1 mb-8 bg-white/70 rounded-xl p-1 backdrop-blur-md">
      <button
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
          activeTab === 'problems' ? 'bg-blue-500 text-white' : 'text-slate-600 hover:bg-white/50'
        }`}
        onClick={() => setActiveTab('problems')}
      >
        <Code size={18} />
        Problems
      </button>
      <button
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
          activeTab === 'problemDetails' ? 'bg-blue-500 text-white' : 'text-slate-600 hover:bg-white/50'
        }`}
        onClick={() => setActiveTab('problemDetails')}
      >
        <Eye size={18} />
        Problem Details
      </button>
    </div>
  );
};

export default NavigationTabs; 