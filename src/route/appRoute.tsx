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
import JourneyPage from "../pages/journey-page/JourneyPage";
import EditJourneyPage from "../pages/journey-page/edit-journey/EditJourneyPage";
import ListReservationPage from "../pages/list-reservation/listReservationPage";
import RequestsReservation from "../pages/requests-reservations/RequestsReservation";
import ReviewPage from "../pages/review/ReviewPage";

const AppRoute: React.FC = () => {
    return (
        <Routes>
            <Route path={"/"} element={<HomePage/>}/>
            <Route path={"/login"} element={<AuthForm/>} />
            <Route path={"/register"} element={<RegisterForm/>} />
            <Route path={"/forgot-password"} element={<ForgotPassword/>}/>
            <Route path={"/dashboard"}element={<Dashboard/>} />
            <Route path={"/reservation"} element={<ReservationPage/>} />
            <Route path={"/my-journeys"} element={<JourneyPage/>} />
            <Route path={"/new-journey"} element={<CreateTrajetPage/>} />
            <Route path={"/profil"} element={<ProfilPage/>}/>
            <Route path={"/edit-journey"} element={<EditJourneyPage/>} />
            <Route path={"/my-bookings"} element={<ListReservationPage/>} />
            <Route path={"/my-booking-requests"} element={<RequestsReservation/>}/>
            <Route path={"/reviews"} element={<ReviewPage/>}/>
        </Routes>
    );
};

export default AppRoute;
