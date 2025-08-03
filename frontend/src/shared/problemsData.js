// Shared problems data that can be accessed by both Admin and Student portals
export const problemsData = [
  {
    id: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.',
    constraints: [
      '2 <= nums.length <= 104',
      '-109 <= nums[i] <= 109',
      '-109 <= target <= 109',
      'Only one valid answer exists.'
    ],
    sampleTestCases: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' },
      { input: 'nums = [3,3], target = 6', output: '[0,1]' }
    ],
    hiddenTestCases: [
      { input: 'nums = [1,5,8,10,13], target = 18', output: '[2,4]' },
      { input: 'nums = [0,4,3,0], target = 0', output: '[0,3]' },
      { input: 'nums = [-1,-2,-3,-4,-5], target = -8', output: '[2,4]' },
      { input: 'nums = [100,200,300,400], target = 500', output: '[1,3]' }
    ],
    solved: false,
    submissions: 45,
    points: 10
  },
  {
    id: 2,
    title: 'Valid Parentheses',
    difficulty: 'Medium',
    category: 'Stack',
    description: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets. Open brackets must be closed in the correct order. Every close bracket has a corresponding open bracket of the same type.',
    constraints: [
      '1 <= s.length <= 104',
      's consists of parentheses only \'()[]{}\''
    ],
    sampleTestCases: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' }
    ],
    hiddenTestCases: [
      { input: 's = "([)]"', output: 'false' },
      { input: 's = "{[]}"', output: 'true' },
      { input: 's = "((("', output: 'false' },
      { input: 's = ")))"', output: 'false' }
    ],
    solved: false,
    submissions: 32,
    points: 10
  }
];

// Student submission results
export const studentResults = [
  {
    studentId: '2024CSE001',
    studentName: 'John Doe',
    teamName: 'Team Alpha',
    problemsSolved: 0,
    totalScore: 0,
    submissions: [],
    startTime: null,
    endTime: null,
    status: 'Not Started'
  }
];

// Function to add a new problem (used by Admin)
export const addProblem = (newProblem) => {
  // Add the problem to the shared problemsData array
  problemsData.push({
    ...newProblem,
    id: problemsData.length + 1,
    solved: false,
    submissions: 0,
    points: newProblem.points || (newProblem.difficulty === 'Easy' ? 10 : newProblem.difficulty === 'Medium' ? 10 : 10)
  });
};

// Function to update student submission (used by Student)
export const updateStudentSubmission = (studentId, problemId, solution, isCorrect, score) => {
  const student = studentResults.find(s => s.studentId === studentId);
  if (student) {
    const submission = {
      problemId,
      solution,
      isCorrect,
      score,
      timestamp: new Date().toISOString()
    };
    
    student.submissions.push(submission);
    
    if (isCorrect) {
      student.problemsSolved += 1;
      student.totalScore += score;
    }
    
    // Update problem submission count
    const problem = problemsData.find(p => p.id === problemId);
    if (problem) {
      problem.submissions += 1;
      if (isCorrect) {
        problem.solved = true;
      }
    }
  }
};

// Function to get student results for Admin
export const getStudentResults = () => {
  return studentResults;
};

// Function to export results as CSV
export const exportResultsAsCSV = () => {
  const headers = ['Student ID', 'Student Name', 'Team Name', 'Problems Solved', 'Total Score', 'Status', 'Start Time', 'End Time'];
  
  const csvContent = [
    headers.join(','),
    ...studentResults.map(student => [
      student.studentId,
      student.studentName,
      student.teamName,
      student.problemsSolved,
      student.totalScore,
      student.status,
      student.startTime || 'N/A',
      student.endTime || 'N/A'
    ].join(','))
  ].join('\n');
  
  return csvContent;
}; 