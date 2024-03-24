import React from "react";
import AuthForm from "../pages/AuthForm";
import { Routes, Route } from "react-router-dom";

const AppRoute: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<AuthForm/>} />
        </Routes>
    );
};

export default AppRoute;
