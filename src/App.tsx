import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { AnonLandingPage } from './AnonLandingPage';
import { AuthProvider } from './contexts/authContext';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import UserLandingPage from './UserLandingPage';
import SurveysPage from './SurveysPage';
import TakingURESurvey from './TakingURESurvey';
import { BrowserRouter as Router } from 'react-router-dom';
import TakeWorkSurvey from './TakeWorkSurvey';
import OnetJobs from './OnetJobs'

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<AnonLandingPage />}></Route>
            <Route path="/" element={<PrivateRoute />} >
              <Route path="/" element={<UserLandingPage />} />
              <Route path='/surveys' element={<SurveysPage />} />
              <Route path='/surveys/1' element={<TakingURESurvey />} />
              <Route path='/surveys/2' element={<TakeWorkSurvey></TakeWorkSurvey>} />
              <Route path='/onet_jobs' element={<OnetJobs></OnetJobs>} />
              {/* <Route path='/surveys/1' element={<TakingURESurvey />} /> */}
            </Route>
            

          </Routes>

        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
