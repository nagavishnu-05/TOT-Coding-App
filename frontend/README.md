# Trialthon of Tech - Coding Contest Platform

A comprehensive online coding competition platform similar to LeetCode/HackerRank with Admin and Student portals.

## Features

### Admin Portal
- **Login**: `admin` / `admin@123`
- **Add Problems**: Create coding problems with title, description, constraints, and test cases
- **Problem Management**: View, edit, and delete problems
- **Student Results**: Download student submissions as Excel files
- **Test Cases**: Add 3 sample test cases (visible to students) and 4 hidden test cases (backend testing)

### Student Portal
- **Login**: `student` / `student@123`
- **Disclaimer Page**: Shows test rules and conditions
- **Full-Screen Test Mode**: Secure environment with escape detection
- **LeetCode-Style Interface**: Professional coding interface with problem description and code editor
- **Real Code Compilation**: Uses Judge0 API for actual code compilation and testing
- **Multiple Languages**: Support for C, C++, Java, Python, JavaScript

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up Judge0 API (Required for Code Compilation)

The platform uses Judge0 API for real code compilation and testing. You need to:

1. **Get a RapidAPI Key**:
   - Go to [RapidAPI Judge0 CE](https://rapidapi.com/judge0-official/api/judge0-ce/)
   - Sign up for a free account
   - Subscribe to the Judge0 CE API (free tier available)

2. **Update the API Key**:
   - Open `src/Student/components/TestMode.jsx`
   - Find line 25: `const JUDGE0_API_KEY = 'YOUR_RAPIDAPI_KEY';`
   - Replace `'YOUR_RAPIDAPI_KEY'` with your actual RapidAPI key

### 3. Run the Application
```bash
npm run dev
```

## How It Works

### Admin Workflow
1. Login with admin credentials
2. Click "Add Problem" to create new coding problems
3. Fill in problem details:
   - Title, category, difficulty
   - Description and constraints
   - 3 sample test cases (input/output pairs)
   - 4 hidden test cases (input/output pairs)
4. Problems are immediately available to students
5. Download student results as Excel files

### Student Workflow
1. Login with student credentials
2. Read disclaimer and click "Begin Test"
3. Full-screen test mode activates
4. Select problems to solve
5. Use LeetCode-style interface:
   - **Left Panel**: Problem description, constraints, sample test cases
   - **Right Panel**: Code editor with language selection
6. Write code in C, C++, Java, Python, or JavaScript
7. Test with custom input or submit against all test cases
8. Real compilation and testing via Judge0 API
9. Score tracking (10 marks per problem)

## Contest Setup
- **Total Questions**: 2 problems
- **Scoring**: 10 marks per problem (20 total)
- **Languages**: C, C++, Java, Python, JavaScript
- **Security**: Full-screen mode with automatic test termination on escape attempts

## Technical Details

### Judge0 API Integration
- **API Endpoint**: `https://judge0-ce.p.rapidapi.com`
- **Supported Languages**:
  - C (GCC 9.2.0) - ID: 50
  - C++ (GCC 9.2.0) - ID: 54
  - Java (OpenJDK 13.0.1) - ID: 62
  - Python (3.8.1) - ID: 71
  - JavaScript (Node.js 12.14.0) - ID: 63

### Security Features
- Full-screen test mode
- Automatic test termination on escape attempts
- Tab switching detection
- Page refresh/close detection
- Zero score penalty for escape attempts

### Data Management
- Shared problem data between Admin and Student portals
- Real-time updates when Admin adds problems
- Student submission tracking
- Excel export functionality

## File Structure
```
src/
├── Admin/
│   ├── AdminDashboard.jsx
│   └── components/
│       ├── AdminHeader.jsx
│       ├── NavigationTabs.jsx
│       ├── ProblemsTable.jsx
│       ├── ProblemDetails.jsx
│       ├── AddProblemModal.jsx
│       └── ProblemsManagement.jsx
├── Student/
│   ├── StudentPortal.jsx
│   └── components/
│       ├── DisclaimerPage.jsx
│       └── TestMode.jsx
├── shared/
│   └── problemsData.js
├── styles/
│   ├── glassmorphism.css
│   └── codeEditor.css
└── assets/
    ├── VCET Logo.jpg
    └── CSE LOGO.jpg
```

## Troubleshooting

### Judge0 API Issues
- Ensure your RapidAPI key is valid and has Judge0 CE subscription
- Check browser console for API errors
- Verify network connectivity

### Test Mode Issues
- Ensure browser supports full-screen API
- Check that escape detection is working properly
- Verify that test termination functions correctly

## Future Enhancements
- Backend integration for persistent data
- User authentication system
- Real-time leaderboards
- Advanced code analysis
- Multiple contest support
