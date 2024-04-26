import React, {useEffect, useState} from 'react';
import {Trajet} from "../../interface/TrajetInterface/Trajet";
import {useNavigate} from "react-router-dom";
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
import {blue} from "@mui/material/colors";
import Navbar from "../../component/navBar/NavBar";
import Stack from "@mui/joy/Stack";
import Card from "@mui/joy/Card";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import {deleteReservationById, getAllByUser} from "../../service/ReservationService";
import {Reservation} from "../../interface/ReservationInterface/Reservation";
import {CircularProgress} from "@mui/joy";
import './css/spinner.css';
import './css/fadeUp.css';
import {EditIcon, TrashIcon} from "evergreen-ui";
import Footer from "../../component/footer/Footer";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: blue["800"],
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const ListReservationPage: React.FC = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const userInfoString = localStorage.getItem('userInfo');
    const userInfo = userInfoString ? JSON.parse(userInfoString): null;
    const tokenIdentif = localStorage.getItem('token');
    const [reservations, setReservations] = useState<Reservation[]>();

    useEffect(() => {
        const fetchReservation = async () => {
            try {
                const response = await getAllByUser(String(tokenIdentif), userInfo.email);
                if (response || response != null) {
                    setReservations(response);
                    setLoading(false);
                } else {
                    setError("Vous n'avez aucune réservation pour le moment.");
                }
            } catch (e) {
                setError('Une erreur est survenue lors de la récupération des réservations');
            } finally {
                setLoading(false);
            }
        };
        fetchReservation();
    }, [tokenIdentif, userInfo]);

    const handleSuppress = async (idReservation: number) => {
        try {
            const response = await deleteReservationById(String(tokenIdentif), userInfo.email, idReservation);
            if (response) {
                setReservations(reservations?.filter(reservation => reservation.id !== idReservation));
            } else {
                throw new Error('Failed to delete the booking');
            }
        } catch (e) {
            console.error("Erreur lors de la suppression du trajet", e);
            setError('Erreur lors de la suppression du trajet');
        }
    }

    if (loading) {
        return (
            <div className="spinner-container">
                <CircularProgress variant="outlined" />
            </div>
        );
    }

    return(
        <>
            <Navbar/>
            <Box className="fadeInUpAnimation" sx={{flex: 1, width: '100%'}}>
                <Stack
                    spacing={4}
                    sx={{
                        display: 'flex',
                        maxWidth: '1000px',
                        mx: 'auto',
                        px: {xs: 2, md: 6},
                        py: {xs: 2, md: 3},
                    }}
                >
                    <Card>
                        <Box sx={{mb: 1}}>
                            <Typography level="h2">Mes Reservations</Typography>
                        </Box>
                        <Divider/>
                        <Stack spacing={2} sx={{my: 1}}>
                            {error ? (
                                <p>{error}</p>
                            ) : (
                                <TableContainer component={Paper}>
                                    <Table sx={{minWidth: 650}} aria-label="vehicule table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>Départ</StyledTableCell>
                                                <StyledTableCell>Arrivé</StyledTableCell>
                                                <StyledTableCell>Date départ</StyledTableCell>
                                                <StyledTableCell>Places réservés</StyledTableCell>
                                                <StyledTableCell>Date de réservation</StyledTableCell>
                                                <StyledTableCell>Statut</StyledTableCell>
                                                <StyledTableCell>Actions</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {Array.isArray(reservations) && reservations.map((reservation) => (
                                                <TableRow
                                                    key={reservation.id}
                                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {reservation.trajetDTO.depart}
                                                    </TableCell>
                                                    <TableCell component="th" scope="row">
                                                        {reservation.trajetDTO.arrivee}
                                                    </TableCell>
                                                    <TableCell component="th" scope="row">
                                                        {reservation.trajetDTO.dateHeureDepart}
                                                    </TableCell>
                                                    <TableCell component="th" scope="row">
                                                        {reservation.nbPlacesReserv}
                                                    </TableCell>
                                                    <TableCell component="th" scope="row">
                                                        {reservation.dateReservation}
                                                    </TableCell>
                                                    <TableCell component="th" scope="row">
                                                        {reservation.statut}
                                                    </TableCell>
                                                    <TableCell component="th" scope="row">
                                                        <Fab size="small" color="primary" aria-label="suppress"
                                                             onClick={() => {
                                                                 handleSuppress(reservation.id)
                                                             }}>
                                                            <TrashIcon/>
                                                        </Fab>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}
                        </Stack>
                    </Card>
                </Stack>
            </Box>
            <br/>
            <br/>
            <br/>
            <div className="footer-container">
                <Footer/>
            </div>
        </>
    );
};

export default ListReservationPage;
