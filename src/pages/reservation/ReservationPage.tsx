import React, { useEffect, useState } from "react";
import Navbar from "../../component/navBar/NavBar";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from "@mui/material/Divider";
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Timeline from "@mui/lab/Timeline";
import Footer from "../../component/footer/Footer";
import Avatar from "@mui/joy/Avatar";
import { blue, green, red } from "@mui/material/colors";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import Button from "@mui/joy/Button";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { get } from '../../service/VehiculeService';
import { Vehicule } from "../../interface/VehiculeInterface/Vehicule";
import { AddReservation } from "../../interface/ReservationInterface/addReservation";
import { CircularProgress } from "@mui/joy";
import { create } from '../../service/ReservationService';
import confetti from 'canvas-confetti'; // Import the confetti library

const ReservationPage: React.FC = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const userInfoString = localStorage.getItem('userInfo');
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
    const tokenIdentif = localStorage.getItem('token');
    const navigate = useNavigate();
    const [reservationData, setReservationData] = useState({
        trajet: location.state?.trajet || {},
        profil: location.state?.profil || {}
    });
    const [vehicule, setVehicule] = useState<Vehicule>();

    useEffect(() => {
        if (!location.state?.trajet || !location.state?.profil) {
            navigate('/dashboard');
        } else {
            const fetchVehicule = async () => {
                try {
                    const response = await get(String(tokenIdentif), reservationData.profil.userDTO.email);
                    if (response) {
                        setVehicule(response);
                    } else {
                        console.log("Aucun vehicule trouvé...");
                    }
                } catch (e) {
                    console.log("Erreur survenue...");
                } finally {
                    setLoading(false);
                }
            };
            fetchVehicule();
        }
    }, [location, navigate, reservationData.profil.userDTO.email, tokenIdentif]);

    const handleSubmit = async () => {
        const date = new Date(Date.now());
        const padTo2Digits = (num: number) => num.toString().padStart(2, '0');
        const formattedDate = `${date.getFullYear()}-${padTo2Digits(date.getMonth() + 1)}-${padTo2Digits(date.getDate())} ${padTo2Digits(date.getHours())}:${padTo2Digits(date.getMinutes())}:${padTo2Digits(date.getSeconds())}`;

        const reserv: AddReservation = {
            trajetDTO: {
                userDTO: {
                    name: reservationData.profil.userDTO.name,
                    firstName: reservationData.profil.userDTO.firstName,
                    email: reservationData.profil.userDTO.email,
                    phoneNumber: reservationData.profil.userDTO.phoneNumber,
                    statut: reservationData.profil.userDTO.statut,
                    id: reservationData.profil.userDTO.id
                },
                depart: reservationData.trajet.depart,
                arrivee: reservationData.trajet.arrivee,
                dateHeureDepart: reservationData.trajet.dateHeureDepart,
                nbPlaces: reservationData.trajet.nbPlaces,
                prix: reservationData.trajet.prix,
                statut: reservationData.trajet.statut,
                id: reservationData.trajet.id
            },
            userDTO: {
                name: userInfo.name,
                firstName: userInfo.firstName,
                email: userInfo.email,
                phoneNumber: userInfo.phoneNumber,
                token: String(tokenIdentif),
                statut: userInfo.statut,
                id: Number(localStorage.getItem('idUser'))
            },
            nbPlacesReserv: 1,
            dateReservation: formattedDate,
            statut: "en attente"
        }

        try {
            const response = await create(String(tokenIdentif), reserv);
            if (response) {
                // Trigger confetti on successful reservation
                triggerConfetti();
                navigate('/dashboard');
            } else {
                console.log("Problème lors de la prise de réservation...");
            }
        } catch (e) {
            console.log("Une erreur est survenue lors de la réservation..." + e);
        }
    }

    const triggerConfetti = () => {
        const end = Date.now() + 3 * 1000; // 3 seconds
        const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

        (function frame() {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
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
            <Navbar />
            <Box className="fadeInUpAnimation" sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h4" component="h4" sx={{ fontWeight: 'bold', textAlign: 'center', width: '100%', maxWidth: '600px' }}>
                    Confirmation de réservation
                </Typography>
                <Divider sx={{ width: '90%', maxWidth: '600px', my: 2, borderWidth: '3px', borderRadius: '10px', borderStyle: 'solid', backgroundColor: '#DFEEFD' }} />
                {(reservationData.trajet.statut === "à venir") ? (
                    <Typography variant="subtitle2" gutterBottom sx={{ textAlign: 'center', width: '100%', maxWidth: '600px', color: green[200] }}>
                        Ce trajet n'a pas encore commencé.
                    </Typography>
                ) : (
                    <Typography variant="subtitle2" gutterBottom sx={{ textAlign: 'center', width: '100%', maxWidth: '600px', color: red[200] }}>
                        Ce trajet a déjà commencé.
                    </Typography>
                )}
                <Divider sx={{ width: '90%', maxWidth: '600px', my: 2, borderWidth: '3px', borderRadius: '10px', borderStyle: 'solid', backgroundColor: '#DFEEFD' }} />
                <Timeline position="alternate">
                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineDot />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Typography variant="h6" component="span">
                                17:30
                            </Typography>
                            <Typography>{reservationData.trajet.depart}</Typography>
                            <Typography variant="body2">
                                <DirectionsWalkIcon />
                                8 km de votre adresse de départ
                            </Typography>
                        </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineDot />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Typography variant="h6" component="span">
                                21:20
                            </Typography>
                            <Typography>{reservationData.trajet.arrivee}</Typography>
                            <Typography variant="body2">
                                <DirectionsWalkIcon />
                                5 km de votre adresse d'arrivée
                            </Typography>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
                <Divider sx={{
                    width: '90%',
                    maxWidth: '600px',
                    my: 2,
                    borderWidth: '3px',
                    borderRadius: '20px',
                    borderStyle: 'solid',
                    backgroundColor: '#DFEEFD', // Use the appropriate color
                }}/>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 2, // Adjust padding as needed
                        borderRadius: 1, // Optional: if you want rounded corners
                        width: '80%',
                        maxWidth: '600px'
                    }}
                >
                    <Typography variant="subtitle1">
                        Prix total pour 1 passager
                    </Typography>
                    <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                        {reservationData.trajet.prix} €
                    </Typography>
                </Box>
                <Divider sx={{
                    width: '90%',
                    maxWidth: '600px',
                    my: 2,
                    borderWidth: '3px',
                    borderRadius: '10px',
                    borderStyle: 'solid',
                    backgroundColor: '#DFEEFD'
                }}/>
                <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                    {/* Driver Name and Rating */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: 2, // Adjust padding as needed
                            borderRadius: 1, // Optional: if you want rounded corners
                            width: '90%',
                            maxWidth: '600px'
                        }}
                    >
                        <div>
                            <Typography variant="h6">{reservationData.profil.userDTO.firstName}</Typography>
                            <Box sx={{ display: 'flex' }}>
                                <Typography variant="body2" sx={{ ml: 0 }}>
                                    4,9/5 - 41 avis
                                </Typography>
                            </Box>
                        </div>
                        {/* Avatar with status badge */}
                        <Avatar
                            sx={{ width: 56, height: 56, mt: 0 }}
                            alt="Profil"
                            src={reservationData.profil.pictureProfil}
                        />
                    </Box>
                    {/* You can add a badge with status around the Avatar if needed */}

                    {/* Super Driver Status */}
                    <Box sx={{ display: 'flex', mt: 2, width: '80%',
                        maxWidth: '600px' , marginLeft: '10px'}}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <WorkspacePremiumIcon fontSize={"medium"} sx={{ color: blue[500] }}/>
                            <Typography variant="body2">{reservationData.profil.userDTO.firstName} a le statut de Super Driver</Typography>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', mt: 2, width: '80%',
                        maxWidth: '600px' , marginLeft: '10px'}}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <Typography variant="caption">
                                Les Super Drivers sont les conducteurs ayant un Profil Vérifié, une super fiabilité et des avis excellents.
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', mt: 2, width: '80%',
                        maxWidth: '600px' , marginLeft: '10px'}}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <DirectionsCarFilledIcon fontSize={"medium"} sx={{ color: blue[500] }}/>
                            <Typography variant="body2" sx={{ ml: 1 }}>
                                {vehicule?.marque} {vehicule?.modele}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Verified Profile */}
                    <Box sx={{ display: 'flex', mt: 2, width: '80%',
                        maxWidth: '600px' , marginLeft: '10px'}}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <VerifiedUserIcon fontSize={"medium"} sx={{ color: blue[500] }}/>
                            <Typography variant="body2" sx={{ ml: 1 }}>
                                Profil Vérifié
                            </Typography>
                        </Box>
                    </Box>

                    {/* Reliable - No Cancellations */}
                    <Box sx={{ display: 'flex', mt: 2, width: '80%',
                        maxWidth: '600px' , marginLeft: '10px'}}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <EventAvailableIcon fontSize={"medium"} sx={{ color: green[500] }} />
                            <Typography variant="body2" sx={{ ml: 1 }}>
                                N'annule jamais ses trajets
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Divider sx={{
                    width: '90%',
                    maxWidth: '600px',
                    my: 2,
                    borderWidth: '3px',
                    borderRadius: '10px',
                    borderStyle: 'solid',
                    backgroundColor: '#DFEEFD'
                }}/>
                <Button size="lg" variant="soft" onClick={handleSubmit} color="primary" startDecorator={<EventRepeatIcon />}>
                    Demande de réservation
                </Button>
            </Box>
            <br/>
            <br/>
            <br/>
            <br/>
            <div className="footer-container">
                <Footer/>
            </div>
        </>
    );
}

export default ReservationPage;
