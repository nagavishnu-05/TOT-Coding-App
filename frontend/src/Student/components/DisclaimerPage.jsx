import React from 'react';
import { AlertTriangle, CheckCircle, Clock, Users, Target } from 'lucide-react';
import vcetLogo from '../../assets/VCET Logo.jpg';
import cseLogo from '../../assets/CSE LOGO.jpg';

const DisclaimerPage = ({ onBeginTest }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-blue-100 flex flex-col">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-8 pt-8 pb-6">
        <div className="flex items-center gap-4">
          <img src={vcetLogo} alt="VCET Logo" className="h-16 w-auto object-contain" />
          <div>
            <h1 className="text-xl font-bold text-slate-800">Trialthon of Tech</h1>
            <p className="text-sm text-slate-600">Coding Contest - Disclaimer</p>
          </div>
          <img src={cseLogo} alt="CSE Logo" className="h-16 w-auto object-contain" />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-600 font-medium">Student ID: 2024CSE001</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="max-w-4xl w-full">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Test Disclaimer</h2>
            <p className="text-lg text-slate-600">Please read all instructions carefully before proceeding</p>
          </div>

          {/* Disclaimer Content */}
          <div className="glassmorphism p-8 rounded-xl mb-8">
            <div className="space-y-6">
              {/* Important Notice */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="text-red-600" size={24} />
                  <h3 className="text-xl font-bold text-red-800">Important Notice</h3>
                </div>
                <p className="text-red-700 mb-4">
                  This is a secure testing environment. Once you begin the test, you will not be able to:
                </p>
                <ul className="text-red-700 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-red-600" size={16} />
                    Exit full-screen mode
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-red-600" size={16} />
                    Switch browser tabs or windows
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-red-600" size={16} />
                    Use keyboard shortcuts (Ctrl+Alt+Del, F11, etc.)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-red-600" size={16} />
                    Refresh or close the page
                  </li>
                </ul>
              </div>

              {/* Test Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/50 p-4 rounded-lg text-center">
                  <Clock className="text-blue-500 mx-auto mb-2" size={24} />
                  <h4 className="font-semibold text-slate-800 mb-1">Duration</h4>
                  <p className="text-slate-600">3 Hours</p>
                </div>
                <div className="bg-white/50 p-4 rounded-lg text-center">
                  <Users className="text-green-500 mx-auto mb-2" size={24} />
                  <h4 className="font-semibold text-slate-800 mb-1">Team Size</h4>
                  <p className="text-slate-600">3 Members</p>
                </div>
                <div className="bg-white/50 p-4 rounded-lg text-center">
                  <Target className="text-purple-500 mx-auto mb-2" size={24} />
                  <h4 className="font-semibold text-slate-800 mb-1">Problems</h4>
                  <p className="text-slate-600">Multiple Choice</p>
                </div>
              </div>

              {/* Rules and Guidelines */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-800">Rules and Guidelines</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-700">All team members must be present and actively participating</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-700">Only use the provided code editor and documentation</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-700">No external resources or internet access allowed</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-700">Submit solutions before the time limit expires</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-700">Any attempt to escape the test environment will result in automatic disqualification</p>
                  </div>
                </div>
              </div>

              {/* Scoring System */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Scoring System</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Easy Problems</h4>
                    <p className="text-green-700">10 points each</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">Medium Problems</h4>
                    <p className="text-yellow-700">20 points each</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">Hard Problems</h4>
                    <p className="text-red-700">30 points each</p>
                  </div>
                </div>
              </div>

              {/* Final Warning */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="text-yellow-600" size={20} />
                  <h4 className="font-semibold text-yellow-800">Final Warning</h4>
                </div>
                <p className="text-yellow-700">
                  By clicking "Begin Test", you acknowledge that you have read and understood all the rules and guidelines. 
                  You agree to abide by the testing conditions and understand that any violation will result in immediate disqualification.
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="text-center">
            <button
              onClick={onBeginTest}
              className="px-8 py-4 bg-red-500 text-white text-lg font-bold rounded-lg hover:bg-red-600 transition shadow-lg"
            >
              Begin Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPage; 