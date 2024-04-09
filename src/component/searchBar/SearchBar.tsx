import React, {ChangeEvent, useState} from 'react';
import './searchBarStyle.css';
import Input from "@mui/joy/Input";
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// Définition de l'interface pour les éventuelles props
interface SearchProps {
    onSearch?: (departure: string, arrival: string, date: string, passengers: number) => void;
}

const SearchBar: React.FC<SearchProps> = ({ onSearch }) => {
    // Utilisation des hooks d'état pour gérer les valeurs du formulaire
    const [departure, setDeparture] = useState('');
    const [arrival, setArrival] = useState('');
    const [passengers, setPassengers] = useState<number>(1);
    const [date, setDate] = useState<string>(''); // Utilisez Date ou null comme type

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(onSearch && date) {
            onSearch(departure, arrival, date.toString(), passengers);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <form className="search-form" onSubmit={handleSubmit}>
                <label>
                    Départ
                </label>
                <Input
                    type="text"
                    value={departure}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setDeparture(e.target.value)}
                    placeholder="Lieu de départ"
                />
                <label>
                    Destination
                </label>
                <Input
                    type="text"
                    value={arrival}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setArrival(e.target.value)}
                    placeholder="Lieu de Destination"
                />
                <label>
                    Date
                </label>
                <Input
                    type="date"
                    value={date}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
                />
                <label>
                    Passagers
                </label>
                <Input
                    type="number"
                    value={passengers}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassengers(parseInt(e.target.value) || 1)}
                />
                <button className="sub" type="submit">Rechercher</button>
            </form>
        </LocalizationProvider>
    );
};

export default SearchBar;
