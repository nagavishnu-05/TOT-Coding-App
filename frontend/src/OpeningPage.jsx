import React, { useEffect } from 'react';
import vcetLogo from './assets/VCET Logo.jpg';
import cseLogo from './assets/CSE LOGO.jpg';
import { Info, Palette, Target, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OpeningPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Trialthon of Tech | Home";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-blue-100 relative flex flex-col items-center justify-start overflow-hidden">
      <div
        className="absolute top-10 left-[10vw] w-[400px] h-[120px] bg-white opacity-70 rounded-full blur-2xl z-0"
        style={{
          boxShadow: '100px 40px 0 20px #fff, 300px 60px 0 40px #e0e7ef',
        }}
      ></div>
      <div
        className="absolute top-32 right-[10vw] w-[300px] h-[100px] bg-white opacity-70 rounded-full blur-2xl z-0"
        style={{
          boxShadow: '80px 30px 0 10px #fff, 200px 50px 0 30px #e0e7ef',
        }}
      ></div>

      <header className="w-full max-w-7xl flex items-center justify-between px-8 pt-12 pb-4 relative z-10">
        <div className="flex items-center gap-4">
          <img
            src={vcetLogo}
            alt="VCET Logo"
            className="h-20 w-auto object-contain"
          />
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-wide font-sans whitespace-nowrap">
            Velammal College of Engineering and Technology
          </h1>
          <img
            src={cseLogo}
            alt="CSE Logo"
            className="h-20 w-auto object-contain"
          />
        </div>
        <div className="flex gap-4 pr-15">
          <button
            className="px-8 py-3 rounded-xl font-semibold bg-white/70 text-green-700 shadow hover:bg-green-100 transition border border-green-200 backdrop-blur-md text-lg"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>
      </header>

      <div className="mt-8">
        <div className="glassmorphism px-8 py-4 rounded-xl shadow-lg text-xl md:text-2xl font-semibold text-slate-700 text-center font-sans">
          Department of Computer Science and Engineering
        </div>
      </div>

      <div className="relative w-full flex justify-center items-center mt-12 mb-8" style={{ height: '220px' }}>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-40 pointer-events-none z-0">
          <div className="w-60 h-40 bg-gradient-to-r from-pink-400 via-yellow-300 to-transparent opacity-80 blur-2xl animate-powder-left" />
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-40 pointer-events-none z-0">
          <div className="w-60 h-40 bg-gradient-to-l from-blue-400 via-green-300 to-transparent opacity-80 blur-2xl animate-powder-right ml-auto" />
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
          <span className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-blue-500 to-green-400 drop-shadow-lg">
            Trialthon of Tech
          </span>
          <span className="text-xl md:text-2xl font-semibold text-slate-600 mt-3 bg-white/70 px-6 py-2 rounded-full backdrop-blur-md">
            Coding Contest
          </span>
        </div>
      </div>

      <div className="relative flex justify-center items-center w-full pb-16">
        <div className="grid grid-cols-4 gap-6 w-full max-w-5xl">
          <div className="glassmorphism bg-white/90 shadow-xl rounded-3xl px-4 py-8 flex flex-col items-center text-center h-full">
            <Info className="text-blue-400 w-10 h-10 mb-2" />
            <h2 className="text-base font-bold text-slate-800 mb-1">Overview</h2>
            <p className="text-slate-700 text-sm leading-snug">
              A one-day team event uniting coders, designers, and non-tech talents for creative, role-based challenges
              and a final team pitch.
            </p>
          </div>
          <div className="glassmorphism bg-white/90 shadow-xl rounded-3xl px-4 py-8 flex flex-col items-center text-center h-full">
            <Palette className="text-pink-400 w-10 h-10 mb-2" />
            <h2 className="text-base font-bold text-slate-800 mb-1">Theme</h2>
            <p className="text-slate-700 text-sm leading-snug font-semibold">Decode. Design. Deliver.</p>
            <p className="text-slate-600 text-xs leading-snug mt-2">
              Teams will decode problems, design creative solutions, and deliver their best in a collaborative, fast-paced environment.<br/>
              Every role matters—bring your unique skills to the challenge!
            </p>
          </div>
          <div className="glassmorphism bg-white/90 shadow-xl rounded-3xl px-4 py-8 flex flex-col items-center text-center h-full">
            <Target className="text-green-400 w-10 h-10 mb-2" />
            <h2 className="text-base font-bold text-slate-800 mb-1">Objectives</h2>
            <ul className="list-disc pl-4 text-slate-700 text-sm leading-snug space-y-0.5 text-left inline-block">
              <li>Blend tech & non-tech skills</li>
              <li>Promote innovation & teamwork</li>
              <li>Sharpen project execution</li>
              <li>Compete in a fast-paced setting</li>
            </ul>
          </div>
          <div className="glassmorphism bg-white/90 shadow-xl rounded-3xl px-4 py-8 flex flex-col items-center text-center h-full">
            <Users className="text-yellow-400 w-10 h-10 mb-2" />
            <h2 className="text-base font-bold text-slate-800 mb-1">Team</h2>
            <p className="text-slate-700 text-sm leading-snug">
              Teams of 3. Roles are flexible—adapt, collaborate, and deliver your best as a group.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpeningPage; 