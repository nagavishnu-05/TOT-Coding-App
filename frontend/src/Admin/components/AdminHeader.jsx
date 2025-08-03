import React from 'react';
import { useNavigate } from 'react-router-dom';
import vcetLogo from '../../assets/VCET Logo.jpg';
import cseLogo from '../../assets/CSE LOGO.jpg';

const AdminHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <img src={vcetLogo} alt="VCET Logo" className="h-16 w-auto object-contain" />
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-wide font-sans">
            Velammal College of Engineering and Technology
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-semibold text-slate-600">Trialthon of Tech : Coding Contest</span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-sm font-semibold text-blue-600">Admin</span>
          </div>
        </div>
        <img src={cseLogo} alt="CSE Logo" className="h-16 w-auto object-contain" />
      </div>
      <button
        className="px-5 py-2 rounded-xl font-semibold bg-red-500 text-white shadow hover:bg-red-600 transition"
        onClick={() => navigate('/')}
      >
        Logout
      </button>
    </div>
  );
};

export default AdminHeader; 