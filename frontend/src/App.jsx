import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OpeningPage from './OpeningPage';
import Login from './Login';
import AdminDashboard from './Admin/AdminDashboard';
import StudentPortal from './Student/StudentPortal';
import CodeEditor from './Student/CodeEditor';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OpeningPage />} />
        <Route path="/signup" element={<div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-white to-blue-100">
          <div className="glassmorphism px-8 py-6 rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold text-slate-800 mb-4">Sign Up</h1>
            <p className="text-slate-600">Sign up page coming soon...</p>
          </div>
        </div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/student" element={<StudentPortal />} />
        <Route path="/problem/:id" element={<CodeEditor />} />
        <Route path="/studentView" element={<StudentPortal />} />
      </Routes>
    </Router>
  );
}

export default App
