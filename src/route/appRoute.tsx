import React from "react";
import AuthForm from "../pages/authentification/AuthForm";
import { Routes, Route } from "react-router-dom";
import RegisterForm from "../pages/register/RegisterForm";
import ForgotPassword from "../pages/forgot-password/ForgotPassword";
import Dashboard from "../component/dashboard";
import ReservationPage from "../pages/reservation/ReservationPage";
import CreateTrajetPage from "../pages/new-journey/CreateTrajetPage";
import ProfilPage from "../pages/profil/ProfilPage";
import HomePage from "../pages/home/HomePage";

const AppRoute: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<AuthForm/>} />
            <Route path="/register" element={<RegisterForm/>} />
            <Route path="/forgot-password" element={<ForgotPassword/>}/>
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/reservation" element={<ReservationPage/>} />
            <Route path="/new-journey" element={<CreateTrajetPage/>} />
            <Route path="/profil" element={<ProfilPage/>}/>
        </Routes>
    );
};

export default AppRoute;
