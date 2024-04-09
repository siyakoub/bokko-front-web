import React from 'react';
import './filterStyle.css';
import Radio from "@mui/material/Radio";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import Sheet from "@mui/joy/Sheet";
import Divider from "@mui/joy/Divider";
import {RadioGroup} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";

interface FilterProps {
    onFilterChange: (filters: any) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
    // Notez la nouvelle signature de handleFilterChange ici
    const handleFilterChange = (event: React.SyntheticEvent, checked: boolean) => {
        // Ici, vous mettez à jour les filtres en fonction de l'input qui a déclenché l'événement
        onFilterChange({ checked });
    };

    return (
        <Sheet
            sx={{
                padding: 2,
                margin: 2,
                border: '2px solid #28477C',
                borderRadius: 'md',
                bgcolor: 'background.body',
                boxShadow: 'md',
            }}
        >
            <FormControl>
                <FormLabel sx={{ color: '#28477C', fontWeight: 'bold' }}>Trier par</FormLabel>
                <RadioGroup name="sort">
                    <FormControlLabel value="earliest" control={<Radio />} label="Départ le plus tôt" onChange={(event) => handleFilterChange(event, (event.target as HTMLInputElement).checked)} />
                    <FormControlLabel value="cheapest" control={<Radio />} label="Prix le plus bas" onChange={(event) => handleFilterChange(event, (event.target as HTMLInputElement).checked)} />
                    {/* ...autres options... */}
                </RadioGroup>
            </FormControl>

            <Divider sx={{ my: 2, borderColor: '#28477C' }} />

            <FormControl>
                <FormLabel sx={{ color: '#28477C', fontWeight: 'bold' }}>Heure de départ</FormLabel>
                <FormControlLabel control={<Checkbox />} label="Avant 6h" onChange={(event, checked) => handleFilterChange(event, checked)} />
                <FormControlLabel control={<Checkbox />} label="6:00 - 12:00" onChange={(event, checked) => handleFilterChange(event, checked)} />
                {/* ...autres options... */}
            </FormControl>
        </Sheet>
    );
};

export default Filter;
