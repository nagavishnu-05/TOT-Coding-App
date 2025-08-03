import React from 'react';
import { Users, Calendar, Clock, Info, Target, AlertCircle, Award, Play, Trophy } from 'lucide-react';

const Dashboard = ({ stats, startTest, setActiveTab }) => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="glassmorphism p-8 rounded-xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
            <Users className="text-white" size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-800">Welcome to Trialthon of Tech!</h2>
            <p className="text-slate-600">Ready to showcase your coding skills?</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="text-blue-500" size={20} />
              <span className="font-semibold text-slate-800">Event Date</span>
            </div>
            <p className="text-slate-600">December 15, 2024</p>
          </div>
          <div className="bg-white/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="text-green-500" size={20} />
              <span className="font-semibold text-slate-800">Duration</span>
            </div>
            <p className="text-slate-600">3 Hours</p>
          </div>
          <div className="bg-white/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users className="text-purple-500" size={20} />
              <span className="font-semibold text-slate-800">Team Size</span>
            </div>
            <p className="text-slate-600">3 Members</p>
          </div>
        </div>
      </div>

      {/* Event Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glassmorphism p-6 rounded-xl">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Info className="text-blue-500" size={24} />
            Event Information
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Theme</h4>
              <p className="text-slate-600">Decode. Design. Deliver.</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Description</h4>
              <p className="text-slate-600">A one-day team event uniting coders, designers, and non-tech talents for creative, role-based challenges and a final team pitch.</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Venue</h4>
              <p className="text-slate-600">Computer Science Department, Velammal College of Engineering and Technology</p>
            </div>
          </div>
        </div>

        <div className="glassmorphism p-6 rounded-xl">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Target className="text-green-500" size={24} />
            Test Conditions
          </h3>
          <div className="space-y-4">
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="text-yellow-600" size={20} />
                <span className="font-semibold text-yellow-800">Important Rules</span>
              </div>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• No external resources or internet access allowed</li>
                <li>• Only use provided code editor and documentation</li>
                <li>• Team collaboration is encouraged</li>
                <li>• Submit solutions before time limit</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Scoring System</h4>
              <ul className="text-slate-600 space-y-1 text-sm">
                <li>• Easy Problems: 10 points each</li>
                <li>• Medium Problems: 20 points each</li>
                <li>• Hard Problems: 30 points each</li>
                <li>• Bonus points for optimal solutions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="glassmorphism p-6 rounded-xl">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Award className="text-purple-500" size={24} />
          Your Progress
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.problemsSolved}</div>
            <div className="text-sm text-slate-600">Problems Solved</div>
          </div>
          <div className="bg-white/50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{stats.totalSubmissions}</div>
            <div className="text-sm text-slate-600">Total Submissions</div>
          </div>
          <div className="bg-white/50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.successRate}%</div>
            <div className="text-sm text-slate-600">Success Rate</div>
          </div>
          <div className="bg-white/50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.currentStreak}</div>
            <div className="text-sm text-slate-600">Day Streak</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glassmorphism p-6 rounded-xl">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={startTest}
            className="flex items-center justify-center gap-3 p-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            <Play size={20} />
            Start Test (Full Screen)
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className="flex items-center justify-center gap-3 p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            <Trophy size={20} />
            View Progress
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 