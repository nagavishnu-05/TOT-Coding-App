import React, { useState, useEffect } from 'react';
import AdminHeader from './components/AdminHeader';
import NavigationTabs from './components/NavigationTabs';
import ProblemDetails from './components/ProblemDetails';
import ProblemsManagement from './components/ProblemsManagement';
import { problemsData, getStudentResults, exportResultsAsCSV, addProblem } from '../shared/problemsData';

const AdminDashboard = () => {
  console.log('AdminDashboard component rendering');
  const [activeTab, setActiveTab] = useState('problems');
  const [problems, setProblems] = useState(problemsData);

  const [selectedProblem, setSelectedProblem] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProblem, setNewProblem] = useState({
    title: '',
    difficulty: 'Easy',
    category: '',
    description: '',
    constraints: [''],
    sampleTestCases: [{ input: '', output: '' }],
    hiddenTestCases: [{ input: '', output: '' }]
  });

  useEffect(() => {
    document.title = "Trialthon of Tech | Admin Dashboard";
  }, []);

  const handleAddProblem = () => {
    if (newProblem.title && newProblem.description) {
      const problemToAdd = {
        ...newProblem,
        id: problems.length + 1,
        solved: false,
        submissions: 0,
        points: newProblem.difficulty === 'Easy' ? 10 : newProblem.difficulty === 'Medium' ? 20 : 30,
        testCases: [...newProblem.sampleTestCases, ...newProblem.hiddenTestCases]
      };
      
      // Update both local state and shared data
      setProblems([...problems, problemToAdd]);
      addProblem(problemToAdd); // Update shared problemsData
      
      setNewProblem({
        title: '',
        difficulty: 'Easy',
        category: '',
        description: '',
        constraints: [''],
        sampleTestCases: [{ input: '', output: '' }],
        hiddenTestCases: [{ input: '', output: '' }]
      });
      setShowAddForm(false);
    } else {
      alert('Please fill in the title and description fields.');
    }
  };

  const addConstraint = () => {
    setNewProblem({
      ...newProblem,
      constraints: [...newProblem.constraints, '']
    });
  };

  const updateConstraint = (index, value) => {
    const updatedConstraints = [...newProblem.constraints];
    updatedConstraints[index] = value;
    setNewProblem({
      ...newProblem,
      constraints: updatedConstraints
    });
  };

  const removeConstraint = (index) => {
    const updatedConstraints = newProblem.constraints.filter((_, i) => i !== index);
    setNewProblem({
      ...newProblem,
      constraints: updatedConstraints
    });
  };

  const addSampleTestCase = () => {
    setNewProblem({
      ...newProblem,
      sampleTestCases: [...newProblem.sampleTestCases, { input: '', output: '' }]
    });
  };

  const updateSampleTestCase = (index, field, value) => {
    const updatedTestCases = [...newProblem.sampleTestCases];
    updatedTestCases[index] = { ...updatedTestCases[index], [field]: value };
    setNewProblem({
      ...newProblem,
      sampleTestCases: updatedTestCases
    });
  };

  const removeSampleTestCase = (index) => {
    const updatedTestCases = newProblem.sampleTestCases.filter((_, i) => i !== index);
    setNewProblem({
      ...newProblem,
      sampleTestCases: updatedTestCases
    });
  };

  const addHiddenTestCase = () => {
    setNewProblem({
      ...newProblem,
      hiddenTestCases: [...newProblem.hiddenTestCases, { input: '', output: '' }]
    });
  };

  const updateHiddenTestCase = (index, field, value) => {
    const updatedTestCases = [...newProblem.hiddenTestCases];
    updatedTestCases[index] = { ...updatedTestCases[index], [field]: value };
    setNewProblem({
      ...newProblem,
      hiddenTestCases: updatedTestCases
    });
  };

  const removeHiddenTestCase = (index) => {
    const updatedTestCases = newProblem.hiddenTestCases.filter((_, i) => i !== index);
    setNewProblem({
      ...newProblem,
      hiddenTestCases: updatedTestCases
    });
  };

  const handleDownloadResults = () => {
    const csvContent = exportResultsAsCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'contest_results.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteProblem = (problemId) => {
    const updatedProblems = problems.filter(problem => problem.id !== problemId);
    setProblems(updatedProblems);
    
    // Also remove from shared data
    const index = problemsData.findIndex(p => p.id === problemId);
    if (index !== -1) {
      problemsData.splice(index, 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <AdminHeader />
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {activeTab === 'problemDetails' && (
          <ProblemDetails 
            selectedProblem={selectedProblem}
            setSelectedProblem={setSelectedProblem}
            problems={problems}
          />
        )}
        
        {activeTab === 'problems' && (
          <ProblemsManagement
            problems={problems}
            setProblems={setProblems}
            showAddForm={showAddForm}
            setShowAddForm={setShowAddForm}
            newProblem={newProblem}
            setNewProblem={setNewProblem}
            handleAddProblem={handleAddProblem}
            addConstraint={addConstraint}
            updateConstraint={updateConstraint}
            removeConstraint={removeConstraint}
            addSampleTestCase={addSampleTestCase}
            updateSampleTestCase={updateSampleTestCase}
            removeSampleTestCase={removeSampleTestCase}
            addHiddenTestCase={addHiddenTestCase}
            updateHiddenTestCase={updateHiddenTestCase}
            removeHiddenTestCase={removeHiddenTestCase}
            onDownloadResults={handleDownloadResults}
            onDeleteProblem={handleDeleteProblem}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 