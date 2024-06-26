// import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { Register } from "./Register";
import { Login } from './Login';
import { Navbar } from './Navbar';
// import { Profile } from './Profile';
// import { Route, Routes } from "react-router-dom";
const App = () => {
  const[currentpage,setCurrentpage]=useState('login');

  const currform=(form)=>{
    setCurrentpage(form);
  }
  return (
    // <Routes>
    //   <Route path='/' element={<Home />}/>
    //   <Route path='/login' element={<Login />} />
    //   <Route path='/register' element={<Register />} />
    // </Routes>
    <div>
      {
        currentpage==='login'?<Login onSwitch={currform}/>:<Register onSwitch={currform}/>
      }
    </div>
  );
};


export default App;
