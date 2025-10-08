import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Registrar from '../pages/Registrar'
import Inicial from '../pages/Inicial';
const AppRoutes = () => (
    <Router>
        <Routes> 
            <Route path="/" element={<Inicial/>} />
            <Route path="/Login" element={<Login/>} />  
            <Route path="/Registrar" element={<Registrar/>} />  
        </Routes>
    </Router>
);

export default AppRoutes;