import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import { Register } from "./Register";
// import { Login } from './Login';
import reportWebVitals from './reportWebVitals';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Profile } from './Profile';
import { Followers, Following } from './Follow';
import { Navbar } from './Navbar';
import { Home } from './Home';
import { New } from './New';
import { MySubGrd } from './MySubGrd';
import { AllSubGrd } from './AllSubGrd';
import { FormForSubGrd } from './FormForSubGrd';
import { Posts } from './Posts';
import { Saved } from './Saved';
import { InMySubGrd } from './InMySubgrd';
import { InAllSubGrd } from './InAllSubgrd';
import { Joinreqs } from './Joinreqs';
import { Users } from './Users';
import { Report } from './Report';
import { ReportsPage } from './Reportspage';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/profile' element={<Profile />} />
        <Route path='/login-register' element={<App />} />
        <Route path='/form-for-new-greddiit' element={<FormForSubGrd />} />
        <Route path='/followers' element={<Followers />} />
        <Route path='/following' element={<Following />} />
        <Route path='/posts' element={<Posts />} />
        <Route path='/' element={<Home />} />
        <Route path='/saved-posts/:id' element={<Saved/>} />
        <Route path='/my-sub-greddiits' element={<MySubGrd />} />
        <Route path='/my-sub-greddiits/:id' element={<InMySubGrd />} />
        <Route path='/all-sub-greddiits' element={<AllSubGrd />} />
        <Route path='/all-sub-greddiits/:id' element={<InAllSubGrd />} />
        <Route path='/joiningreqs/:id' element={<Joinreqs />} />
        <Route path='/users/:id' element={<Users />} />
        <Route path='/report/:id' element={<Report />} />
        <Route path='/reportpage/:id' element={<ReportsPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
