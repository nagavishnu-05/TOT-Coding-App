import React from 'react';
import { CheckCircle, Code, Trophy, Clock } from 'lucide-react';

const Progress = ({ stats }) => {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glassmorphism p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Problems Solved</p>
              <p className="text-2xl font-bold text-slate-800">{stats.problemsSolved}</p>
            </div>
            <CheckCircle className="text-green-500" size={24} />
          </div>
        </div>
        <div className="glassmorphism p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Total Submissions</p>
              <p className="text-2xl font-bold text-slate-800">{stats.totalSubmissions}</p>
            </div>
            <Code className="text-blue-500" size={24} />
          </div>
        </div>
        <div className="glassmorphism p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Success Rate</p>
              <p className="text-2xl font-bold text-slate-800">{stats.successRate}%</p>
            </div>
            <Trophy className="text-yellow-500" size={24} />
          </div>
        </div>
        <div className="glassmorphism p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Current Streak</p>
              <p className="text-2xl font-bold text-slate-800">{stats.currentStreak} days</p>
            </div>
            <Clock className="text-purple-500" size={24} />
          </div>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="glassmorphism p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Weekly Progress</h3>
        <div className="h-32 bg-white/50 rounded-lg flex items-end justify-around p-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
            <div key={day} className="flex flex-col items-center">
              <div 
                className="w-8 bg-blue-500 rounded-t"
                style={{ height: `${Math.random() * 60 + 20}px` }}
              ></div>
              <span className="text-xs text-slate-600 mt-2">{day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Progress; 