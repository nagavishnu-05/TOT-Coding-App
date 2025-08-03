import React from 'react';
import { useNavigate } from 'react-router-dom';
import vcetLogo from '../../assets/VCET Logo.jpg';
import cseLogo from '../../assets/CSE LOGO.jpg';

const StudentHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full max-w-7xl mx-auto flex items-center justify-between px-8 pt-8 pb-6">
      <div className="flex items-center gap-4">
        <button
          className="px-4 py-2 rounded-lg font-semibold bg-white/70 text-green-700 shadow hover:bg-green-100 transition border border-green-200 backdrop-blur-md"
          onClick={() => navigate('/')}
        >
          &larr; Back
        </button>
        <img src={vcetLogo} alt="VCET Logo" className="h-16 w-auto object-contain" />
        <div>
          <h1 className="text-xl font-bold text-slate-800">Student Portal</h1>
          <p className="text-sm text-slate-600">Trialthon of Tech : Coding Contest</p>
        </div>
        <img src={cseLogo} alt="CSE Logo" className="h-16 w-auto object-contain" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-slate-600 font-medium">Student ID: 2024CSE001</span>
        <button
          className="px-4 py-2 rounded-lg font-semibold bg-red-500 text-white shadow hover:bg-red-600 transition"
          onClick={() => navigate('/')}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default StudentHeader; 