import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainLayout from './layot/MainLayot';
import Login from './components/Login'
import Profile from './components/Profile';
import StudentFeedbackList from './components/StudentFeedbackList';
import FeedbackForm from './components/FeedbackForm';
import CreateFeedback from './components/CreateFeedback';
import Dashboard from './layot/Dashboard';
import DataAnalisys from './components/DataAnalisys';
import SurveyListPage from './components/SurveyListPage';
import Register from './components/Register';
import Faculty from './components/DepartmentForm'
import CourseAssignmen from './components/CourseAssigmen'
import StaticFeedbackForm from './components/StaticFeedbackForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="" element={<MainLayout><Login /></MainLayout>} />
        <Route path='/dashboard' element={<Dashboard></Dashboard>} />
        <Route path='/profile' element={<Dashboard><Profile /></Dashboard>} />
        <Route path='/feedbacks' element={<Dashboard><StudentFeedbackList /></Dashboard>} />
        <Route path='/createfeedback' element={<Dashboard><CreateFeedback /></Dashboard>} />
        <Route path='/feedbacks/:index' element={<Dashboard><FeedbackForm /></Dashboard>} />
        <Route path='/survey' element={<Dashboard><SurveyListPage /></Dashboard>} />
        <Route path='/analyze/:index' element={<Dashboard><DataAnalisys /></Dashboard>} />
        <Route path='/register' element={<Dashboard><Register /></Dashboard>} />
        <Route path='/faculty' element={<Dashboard><Faculty /></Dashboard>} />
        <Route path='/assignment' element={<Dashboard><CourseAssignmen /></Dashboard>} />
        <Route path='/static-feedbacks' element={<Dashboard><StaticFeedbackForm /></Dashboard>} />
      </Routes>
    </Router>
  );
}

export default App;