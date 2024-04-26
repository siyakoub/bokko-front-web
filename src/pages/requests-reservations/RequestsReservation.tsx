import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Trajet} from "../../interface/TrajetInterface/Trajet";
import {Reservation} from "../../interface/ReservationInterface/Reservation";
import {CircularProgress} from "@mui/joy";
import {getAllTrajetByDriver} from "../../service/TrajetService";
import {getAllByTrajet, getAllByTrajetInProgress} from "../../service/ReservationService";
import Navbar from "../../component/navBar/NavBar";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import Stack from "@mui/joy/Stack";
import Card from "@mui/joy/Card";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import CheckIcon from '@mui/icons-material/Check';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from "@mui/joy/Avatar";
import {getAprofil} from '../../service/ProfilService';
import {Profil} from "../../interface/ProfilInterface/Profil";
import {TrashIcon} from "evergreen-ui";
import {Fab} from "@mui/material";
import {UpdateReservation} from "../../interface/ReservationInterface/updateReservation";
import {update} from '../../service/ReservationService';
import Footer from "../../component/footer/Footer";


const RequestsReservation: React.FC = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const userInfoString = localStorage.getItem('userInfo');
    const userInfo = userInfoString ? JSON.parse(userInfoString): null;
    const tokenIdentif = localStorage.getItem('token');
    const [trajets, setTrajets] = useState<Trajet[]>();
    const [hasTrajet, setHasTrajet] = useState(false);
    const [hasReservation, setHasReservation] = useState(false);
    const [reservationsByTrajet, setReservationsByTrajet] = useState<Map<number, Reservation[]>>(new Map());
    const [profilByReservation, setProfilByReservation] = useState<Map<any, Profil>>(new Map());
    const [profiles, setProfiles] = useState<Map<number, any>>(new Map());

    useEffect(() => {
        const fetchTrajetsAndReservations = async () => {
            if (!tokenIdentif) {
                navigate('/');
                return;
            }
            try {
                setLoading(true);
                const trajetResponse = await getAllTrajetByDriver(tokenIdentif, userInfo.email);
                if (trajetResponse && trajetResponse.length > 0) {
                    setTrajets(trajetResponse);
                    setHasTrajet(true);
                    const allReservations = new Map();
                    const allProfiles = new Map();
                    for (const trajet of trajetResponse) {
                        const reservations = await getAllByTrajetInProgress(String(tokenIdentif), userInfo.email, trajet.id);
                        if (reservations && reservations.length > 0) {
                            setHasReservation(true);
                            allReservations.set(trajet.id, reservations);
                            for (const reservation of reservations) {
                                if (!allProfiles.has(reservation.userDTO.email)) {
                                    const profile = await getAprofil(tokenIdentif, reservation.userDTO.email);
                                    allProfiles.set(reservation.userDTO.email, profile);
                                }
                            }
                        }
                    }
                    setReservationsByTrajet(allReservations);
                    setProfilByReservation(allProfiles);
                } else {
                    setError("Aucun trajet trouvé.");
                }
            } catch (e) {
                setError("Une erreur est survenue lors de la récupération des trajets et réservations.");
                console.log(e);
            } finally {
                setLoading(false);
            }
        };

        fetchTrajetsAndReservations();
    }, [tokenIdentif, userInfo.email, navigate]);


    const handleSubmit = async (reserv : Reservation) => {
        const data: UpdateReservation = {
            trajetDTO: {
                userDTO: {
                    name: reserv.trajetDTO.userDTO.name,
                    firstName: reserv.trajetDTO.userDTO.firstName,
                    email: reserv.trajetDTO.userDTO.email,
                    phoneNumber: reserv.trajetDTO.userDTO.phoneNumber,
                    statut: reserv.trajetDTO.userDTO.statut,
                    id: reserv.trajetDTO.userDTO.id
                },
                depart: reserv.trajetDTO.depart,
                arrivee: reserv.trajetDTO.arrivee,
                dateHeureDepart: reserv.trajetDTO.dateHeureDepart,
                nbPlaces: reserv.trajetDTO.nbPlaces,
                prix: reserv.trajetDTO.prix,
                statut: reserv.trajetDTO.statut,
                id: reserv.trajetDTO.id
            },
            userDTO: {
                name: reserv.userDTO.name,
                firstName: reserv.userDTO.firstName,
                email: reserv.userDTO.email,
                phoneNumber: reserv.userDTO.phoneNumber,
                statut: reserv.userDTO.statut,
                id: reserv.userDTO.id
            },
            nbPlacesReserv: reserv.nbPlacesReserv,
            dateReservation: reserv.dateReservation,
            statut: "confirmé",
            id: reserv.id
        };
        try {
            const response = await update(String(tokenIdentif), userInfo.email, data);
            if (response || response != null) {
                window.location.reload();
            } else {
                setError("Réservation introuvable");
            }
        } catch (e) {
            setError("Une erreur est survenue lors de la mise à jour de la réservation.");
            console.log(e);
        }
    };

    const handleCancel = async (reserv: Reservation) => {
        const data: UpdateReservation = {
            trajetDTO: {
                userDTO: {
                    name: reserv.trajetDTO.userDTO.name,
                    firstName: reserv.trajetDTO.userDTO.firstName,
                    email: reserv.trajetDTO.userDTO.email,
                    phoneNumber: reserv.trajetDTO.userDTO.phoneNumber,
                    statut: reserv.trajetDTO.userDTO.statut,
                    id: reserv.trajetDTO.userDTO.id
                },
                depart: reserv.trajetDTO.depart,
                arrivee: reserv.trajetDTO.arrivee,
                dateHeureDepart: reserv.trajetDTO.dateHeureDepart,
                nbPlaces: reserv.trajetDTO.nbPlaces,
                prix: reserv.trajetDTO.prix,
                statut: reserv.trajetDTO.statut,
                id: reserv.trajetDTO.id
            },
            userDTO: {
                name: reserv.userDTO.name,
                firstName: reserv.userDTO.firstName,
                email: reserv.userDTO.email,
                phoneNumber: reserv.userDTO.phoneNumber,
                statut: reserv.userDTO.statut,
                id: reserv.userDTO.id
            },
            nbPlacesReserv: reserv.nbPlacesReserv,
            dateReservation: reserv.dateReservation,
            statut: "Annulé",
            id: reserv.id
        };
        try {
            const response = await update(String(tokenIdentif), userInfo.email, data);
            if (response || response != null) {
                window.location.reload();
            } else {
                setError("Réservation introuvable");
            }
        } catch (e) {
            setError("Une erreur est survenue lors de la mise à jour de la réservation.");
            console.log(e);
        }
    };


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
                            <Typography level="h2">Mes demandes de réservations</Typography>
                        </Box>
                        <Divider/>
                        {hasTrajet ? (
                            <Stack spacing={2} sx={{my: 1}}>
                                {trajets?.map(trajet => (
                                    <Accordion key={trajet.id}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon/>}
                                            aria-controls="panel1a-content"
                                            id={`panel1a-header-${trajet.id}`}
                                        >
                                            <Typography>{`Trajet ${trajet.depart} - ${trajet.arrivee}`}</Typography>
                                        </AccordionSummary>
                                        {hasReservation ? (
                                            <AccordionDetails>
                                                {/* Here you could list out reservation requests */}
                                                {reservationsByTrajet.get(trajet.id)?.map(reservation => (
                                                    <React.Fragment key={reservation.id}>
                                                        <Divider/>
                                                        <Typography component="div">
                                                            <Box sx={{
                                                                display: 'flex',
                                                                width: '100%',
                                                                justifyContent: 'space-between',
                                                                alignItems: 'center'
                                                            }}>
                                                                {/* Display reservation details */}
                                                                <div>
                                                                    <br/>
                                                                    <Avatar
                                                                        sx={{width: 56, height: 56, mt: 0}}
                                                                        alt="Profil"
                                                                        src={profilByReservation.get(reservation.userDTO.email)?.pictureProfil}
                                                                    />
                                                                    <p>{reservation.userDTO.name} {reservation.userDTO.firstName}</p>
                                                                </div>
                                                                {/* Additional reservation details can be placed here */}
                                                                <Box sx={{
                                                                    display: 'flex',
                                                                    width: '50%',
                                                                    justifyContent: 'space-between'
                                                                }}>
                                                                    <div>
                                                                        <br/>
                                                                        <Fab size="large" color="error"
                                                                             aria-label="suppress" onClick={() => {
                                                                                 handleCancel(reservation)
                                                                        }}>
                                                                            <TrashIcon/>
                                                                        </Fab>
                                                                        <h5>Refuser</h5>
                                                                    </div>
                                                                    <div>
                                                                        <br/>
                                                                        <Fab size="large" color="primary"
                                                                             aria-label="suppress" onClick={() => {
                                                                            handleSubmit(reservation)
                                                                        }}>
                                                                            <CheckIcon/>
                                                                        </Fab>
                                                                        <h5>Accepter</h5>
                                                                    </div>
                                                                </Box>
                                                            </Box>
                                                        </Typography>
                                                    </React.Fragment>
                                                ))}
                                            </AccordionDetails>
                                        ) : (
                                            <AccordionDetails>
                                                <div>
                                                    <p>Vous n'avez aucune réservation pour ce trajet.</p>
                                                </div>
                                            </AccordionDetails>
                                        )}
                                    </Accordion>
                                ))}
                            </Stack>
                        ) : (
                            <Stack spacing={2} sx={{my: 1}}>
                                {error}
                            </Stack>
                        )}
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


export default RequestsReservation;
