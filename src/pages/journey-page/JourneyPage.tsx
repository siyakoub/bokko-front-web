import React, {useEffect, useState} from 'react';
import NavBar from "../../component/navBar/NavBar";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import Stack from "@mui/joy/Stack";
import './css/fadeUp.css';
import './css/spinner.css';
import {
    Fab,
    Paper,
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import CardOverflow from "@mui/joy/CardOverflow";
import CardActions from "@mui/joy/CardActions";
import Button from "@mui/joy/Button";
import {Add} from "@mui/icons-material";
import {CircularProgress, Modal, ModalDialog} from "@mui/joy";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Card from "@mui/joy/Card";
import {blue} from "@mui/material/colors";
import {Trajet} from "../../interface/TrajetInterface/Trajet";
import {useNavigate} from "react-router-dom";
import { getAllTrajetByDriver } from "../../service/TrajetService";
import {EditIcon} from "evergreen-ui";
import { TrashIcon } from "evergreen-ui";
import { deleteTrajetById } from "../../service/TrajetService";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: blue["800"],
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));



const JourneyPage: React.FC = () => {
    const [trajets, setTrajets] = useState<Trajet[]>();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const userInfoString = localStorage.getItem('userInfo');
    const userInfo = userInfoString ? JSON.parse(userInfoString): null;
    const tokenIdentif = localStorage.getItem('token');

    useEffect(() => {
        const fetchTrajet = async () => {
            if (tokenIdentif === '' || tokenIdentif === null || tokenIdentif === undefined) {
                navigate('/');
            } else {
                setLoading(true);
                try {
                    const response = await getAllTrajetByDriver(String(tokenIdentif), userInfo.email);
                    if (response) {
                        setTrajets(response);
                    }
                } catch (e) {
                    setError('Erreur lors du chargement des trajets');
                    setLoading(false);
                    return;
                }
            }
        };
        fetchTrajet();
        setLoading(false);
    }, [navigate, tokenIdentif, userInfo.email]);

    // @ts-ignore
    const handleSuppress = async (idTrajet: number) => {
        try {
            const response = await deleteTrajetById(String(tokenIdentif), userInfo.email, idTrajet);
            if (response) {
                setTrajets(trajets?.filter(trajet => trajet.id !== idTrajet));
            } else {
                throw new Error('Failed to delete the journey');
            }
        } catch (e) {
            console.error("Erreur lors de la suppression du trajet", e);
            setError('Erreur lors de la suppression du trajet');
        }
    };

    const handleUpdateJourney = (trajet: Trajet) => {
        navigate('/edit-journey', { state: { trajet: trajet } })
    }

    if (loading) {
        return (
            <div className="spinner-container">
                <CircularProgress variant="outlined" />
            </div>
        );
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <NavBar/>
            <Box className="fadeInUpAnimation" sx={{ flex: 1, width: '100%' }}>
                <Stack
                    spacing={4}
                    sx={{
                        display: 'flex',
                        maxWidth: '1000px',
                        mx: 'auto',
                        px: { xs: 2, md: 6 },
                        py: { xs: 2, md: 3 },
                    }}
                >
                    <Card>
                        <Box sx={{ mb: 1 }}>
                            <Typography level="h2">Mes Trajets</Typography>
                        </Box>
                        <Divider />
                        <Stack spacing={2} sx={{ my: 1 }}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="vehicule table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Départ</StyledTableCell>
                                            <StyledTableCell>Arrivé</StyledTableCell>
                                            <StyledTableCell>Date départ</StyledTableCell>
                                            <StyledTableCell>Nombres de places</StyledTableCell>
                                            <StyledTableCell>Prix</StyledTableCell>
                                            <StyledTableCell>Statut</StyledTableCell>
                                            <StyledTableCell>Actions</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Array.isArray(trajets) && trajets.map((trajet) => (
                                            <TableRow
                                                key={trajet.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {trajet.depart}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {trajet.arrivee}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {trajet.dateHeureDepart}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {trajet.nbPlaces}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {trajet.prix}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {trajet.statut}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    <Fab size="small" color="primary" aria-label="edit" onClick={() => handleUpdateJourney(trajet)}>
                                                        <EditIcon />
                                                    </Fab>
                                                    <Fab size="small" color="primary" aria-label="suppress" onClick={() => handleSuppress(trajet.id)}>
                                                        <TrashIcon />
                                                    </Fab>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Stack>
                    </Card>
                </Stack>
            </Box>
        </>
    );
}

export default JourneyPage;
