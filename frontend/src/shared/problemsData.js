// Shared problems data that can be accessed by both Admin and Student portals
export const problemsData = [
  {
    id: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
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
    description: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.',
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
    points: 20
  },
  {
    id: 3,
    title: 'Reverse String',
    difficulty: 'Easy',
    category: 'Strings',
    description: 'Write a function that reverses a string. The input string is given as an array of characters s.',
    constraints: [
      '1 <= s.length <= 105',
      's[i] is a printable ascii character.'
    ],
    sampleTestCases: [
      { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
      { input: 's = ["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]' }
    ],
    hiddenTestCases: [
      { input: 's = ["a"]', output: '["a"]' },
      { input: 's = ["a","b"]', output: '["b","a"]' },
      { input: 's = ["1","2","3","4","5"]', output: '["5","4","3","2","1"]' },
      { input: 's = ["A","B","C","D"]', output: '["D","C","B","A"]' }
    ],
    solved: false,
    submissions: 28,
    points: 10
  },
  {
    id: 4,
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    description: 'Given an integer array nums, find the subarray with the largest sum, and return its sum.',
    constraints: [
      '1 <= nums.length <= 105',
      '-104 <= nums[i] <= 104'
    ],
    sampleTestCases: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6' },
      { input: 'nums = [1]', output: '1' },
      { input: 'nums = [5,4,-1,7,8]', output: '23' }
    ],
    hiddenTestCases: [
      { input: 'nums = [-1,-2,-3,-4]', output: '-1' },
      { input: 'nums = [2,3,-2,4]', output: '7' },
      { input: 'nums = [0,0,0,0]', output: '0' },
      { input: 'nums = [100,-50,100,-50]', output: '100' }
    ],
    solved: false,
    submissions: 15,
    points: 20
  },
  {
    id: 5,
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    category: 'Dynamic Programming',
    description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    constraints: [
      '1 <= n <= 45'
    ],
    sampleTestCases: [
      { input: 'n = 2', output: '2' },
      { input: 'n = 3', output: '3' },
      { input: 'n = 4', output: '5' }
    ],
    hiddenTestCases: [
      { input: 'n = 1', output: '1' },
      { input: 'n = 5', output: '8' },
      { input: 'n = 6', output: '13' },
      { input: 'n = 10', output: '89' }
    ],
    solved: false,
    submissions: 22,
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
    points: newProblem.points || (newProblem.difficulty === 'Easy' ? 10 : newProblem.difficulty === 'Medium' ? 20 : 30)
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