import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const Submissions = () => {
  return (
    <div className="glassmorphism p-6 rounded-xl">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">My Submissions</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
          <div className="flex items-center gap-4">
            <CheckCircle className="text-green-500" size={20} />
            <div>
              <p className="font-medium text-slate-800">Two Sum</p>
              <p className="text-sm text-slate-600">Submitted 2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Accepted</span>
            <span className="text-xs text-slate-500">Runtime: 4ms</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
          <div className="flex items-center gap-4">
            <XCircle className="text-red-500" size={20} />
            <div>
              <p className="font-medium text-slate-800">Valid Parentheses</p>
              <p className="text-sm text-slate-600">Submitted 15 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Wrong Answer</span>
            <span className="text-xs text-slate-500">Test case 3 failed</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
          <div className="flex items-center gap-4">
            <CheckCircle className="text-green-500" size={20} />
            <div>
              <p className="font-medium text-slate-800">Reverse String</p>
              <p className="text-sm text-slate-600">Submitted 1 hour ago</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Accepted</span>
            <span className="text-xs text-slate-500">Runtime: 2ms</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submissions; 