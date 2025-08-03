import React from 'react';
import { Plus, Download } from 'lucide-react';
import AddProblemModal from './AddProblemModal';
import ProblemsTable from './ProblemsTable';

const ProblemsManagement = ({
  problems,
  setProblems,
  showAddForm,
  setShowAddForm,
  newProblem,
  setNewProblem,
  handleAddProblem,
  addConstraint,
  updateConstraint,
  removeConstraint,
  addSampleTestCase,
  updateSampleTestCase,
  removeSampleTestCase,
  addHiddenTestCase,
  updateHiddenTestCase,
  removeHiddenTestCase,
  onDownloadResults,
  onDeleteProblem
}) => {
  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Problems Management</h2>
          <p className="text-slate-600">Manage coding problems and view student results</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={onDownloadResults}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            <Download size={16} />
            Download Results
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            <Plus size={16} />
            Add Problem
          </button>
        </div>
      </div>

      {/* Problems Table */}
      <ProblemsTable problems={problems} setProblems={setProblems} onDeleteProblem={onDeleteProblem} />

      {/* Add Problem Modal */}
      {showAddForm && (
        <AddProblemModal
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
          onClose={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
};

export default ProblemsManagement; 