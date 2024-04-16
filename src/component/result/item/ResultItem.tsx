import React from 'react';
import { Trajet } from "../../../interface/TrajetInterface/Trajet";
import { Profil } from "../../../interface/ProfilInterface/Profil";
import '../resultStyle.css';
import {useNavigate} from "react-router-dom";

interface ResultItemProps {
    trajet: Trajet;
    profil: Profil;
}

const ResultItem: React.FC<ResultItemProps> = ({ trajet, profil }) => {
    // Extraction des données de trajet et de profil
    const { id, depart, arrivee, dateHeureDepart, prix, nbPlaces } = trajet;
    const {userDTO, bio, pictureProfil } = profil;

    const navigate = useNavigate();

    const handleReservation = () => {
        navigate('/reservation', { state: { trajet: trajet, profil: profil }});
    }

    return (
        <div className="result-item" onClick={handleReservation}>
            <div className="departure-time">{depart}</div>
            <div className="arrival">{arrivee}</div>
            <div className="date-time-depart">{dateHeureDepart}</div>
            <div className="available-places">{`Places disponibles: ${nbPlaces}`}</div>
            <div className="driver-info">
                {/* Assurez-vous que pictureProfil est l'URL de l'image ou le chemin correct */}
                <img src={pictureProfil} alt={`${userDTO.firstName}`}/>
                <div>{userDTO.firstName}</div>
            </div>
            <div className="price">{`${prix} €`}</div>
        </div>
    );
};

export default ResultItem;

