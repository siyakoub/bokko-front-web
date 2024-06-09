import React from 'react';
import { Trajet } from "../../../interface/TrajetInterface/Trajet";
import { Profil } from "../../../interface/ProfilInterface/Profil";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import BoxReveal from '../../../element/magicui/box-reveal'; // Assurez-vous que le chemin est correct
import '../resultStyle.css';

interface ResultItemProps {
    trajet: Trajet;
    profil: Profil;
}

const ResultItem: React.FC<ResultItemProps> = ({ trajet, profil }) => {
    const { id, depart, arrivee, dateHeureDepart, prix, nbPlaces } = trajet;
    const { userDTO, bio, pictureProfil } = profil;

    const navigate = useNavigate();

    const handleReservation = () => {
        navigate('/reservation', { state: { trajet, profil } });
    };

    return (
        <motion.div
            className="result-item"
            onClick={handleReservation}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <BoxReveal boxColor="#28477C" duration={0.8} width="100%">
                <div className="content">
                    <div className="route-info">
                        <div className="departure-time">{depart}</div>
                        <div className="arrow">↓</div>
                        <div className="arrival">{arrivee}</div>
                    </div>
                    <div className="details">
                        <div className="date-time-depart">{dateHeureDepart}</div>
                        <div className="available-places">{`Places disponibles: ${nbPlaces}`}</div>
                        <div className="price">{`${prix} €`}</div>
                    </div>
                    <div className="driver-info">
                        <img src={pictureProfil} alt={`${userDTO.firstName}`} className="profile-pic"/>
                        <div className="driver-name">{userDTO.firstName}</div>
                    </div>
                </div>
            </BoxReveal>
        </motion.div>
    );
};

export default ResultItem;
