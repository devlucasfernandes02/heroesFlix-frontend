import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Registrar from '../pages/Registrar'
import Inicial from '../pages/Inicial';
import Home from '../pages/Home';
import Perfil from '../pages/Perfil';
import Detalhes from '../pages/Detalhes';
const AppRoutes = () => (
    <Router>
        <Routes> 
            <Route path="/" element={<Inicial/>} />
            <Route path="/Home" element={<Home/>} />
            <Route path="/Perfil" element={<Perfil/>} />
            <Route path="/Login" element={<Login/>} />  
            <Route path="/Registrar" element={<Registrar/>} />  
            <Route path="/item/:tipo/:id" element={<Detalhes />} />
        </Routes>
    </Router>
);

export default AppRoutes;