import React from 'react';
import ResultItem from './item/ResultItem';
import { Trajet } from "../../interface/TrajetInterface/Trajet";
import { Profil } from "../../interface/ProfilInterface/Profil";
import './resultStyle.css';

interface ResultProps {
    trajets: Trajet[];
    profils: Profil[];
}

const Result: React.FC<ResultProps> = ({ trajets, profils }) => {
    const getProfilForTrajet = (userDTOId: number): Profil | undefined => {
        return profils.find(profil => profil.userDTO.id === userDTOId);
    };

    return (
        <div className="result-list">
            {trajets.map((trajet, index) => {
                const profil = getProfilForTrajet(trajet.userDTO.id);
                // Fallback to index if trajet.id is null
                const key = trajet.id != null ? trajet.id : `fallback-${index}`;
                return profil ? <ResultItem key={key} trajet={trajet} profil={profil} /> : null;
            })}
        </div>
    );
};

export default Result;
