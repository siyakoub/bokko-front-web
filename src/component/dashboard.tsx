import React, { useEffect, useState } from 'react';
import Navbar from "./navBar/NavBar";
import SearchBar from "./searchBar/SearchBar";
import Filter from "./filter/Filter";
import Result from "./result/Result";
import "./dashboard.css";
import { Trajet } from "../interface/TrajetInterface/Trajet";
import { Profil } from "../interface/ProfilInterface/Profil";
// Importez vos services
import { getAll as getAllTrajets } from "../service/TrajetService";
import { getAll as getAllProfils } from "../service/ProfilService";
import Footer from "./footer/Footer";
import {useNavigate} from "react-router-dom";
import CssBaseline from "@mui/joy/CssBaseline";
import {CssVarsProvider} from "@mui/joy/styles";
import ColorSchemeToggle from "../pages/home/component/ColorSchemeToggle/ColorSchemeToggle";
import {CircularProgress} from "@mui/joy";

const DashBoard = () => {
    const [trajets, setTrajets] = useState<Trajet[]>([]);
    const [profils, setProfils] = useState<Profil[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const userInfoString = localStorage.getItem('userInfo');
    const userInfo = userInfoString ? JSON.parse(userInfoString): null;
    const tokenIdentif = localStorage.getItem('token');

    const page = 1; // pour la pagination
    const size = 1; // nombre d'éléments par page


    useEffect(() => {
        const fetchTrajetsAndProfils = async () => {
            if (tokenIdentif === '' || tokenIdentif === null || tokenIdentif === undefined) {
                navigate('/');
            } else {
                setLoading(true);
                try {
                    const fetchedTrajets = await getAllTrajets(tokenIdentif, page, size);
                    const fetchedProfils = await getAllProfils(tokenIdentif, page, size);
                    setTrajets(fetchedTrajets);
                    setProfils(fetchedProfils);
                } catch (error) {
                    setError('Une erreur est survenue lors du chargement des données.');
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchTrajetsAndProfils();
    }, [page, size]); // Exécutez useEffect lorsque ces valeurs changent

    // Dans votre composant React
    if (loading) {
        return (
            <div className="spinner-container">
                <CircularProgress variant="outlined"/>
            </div>
        );
    }

    return (
        <>
            <Navbar/>
            <div className="fadeInUpAnimation">
                <div className="app-header">
                    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
                        <CssBaseline/>
                        <ColorSchemeToggle/>
                    </CssVarsProvider>
                </div>
                <div className="con">
                    <SearchBar onSearch={() => { /* logique de recherche ici */
                    }}/>
                </div>
                <div className="app-container">
                    <Filter onFilterChange={() => { /* logique de filtre ici */
                    }}/>
                    <Result trajets={trajets} profils={profils}/>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
            <div className="footer-container">
                <Footer/>
            </div>
        </>
    );
};

export default DashBoard;
