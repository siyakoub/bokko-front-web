import React, {useState} from 'react';
import NavBar from "../../../component/navBar/NavBar";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import FormLabel from "@mui/joy/FormLabel";
import FormControl from "@mui/joy/FormControl";
import Input from "@mui/joy/Input";
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CardOverflow from "@mui/joy/CardOverflow";
import CardActions from "@mui/joy/CardActions";
import Button from "@mui/joy/Button";
import Footer from "../../../component/footer/Footer";
import {Trajet} from "../../../interface/TrajetInterface/Trajet";
import {useLocation, useNavigate} from "react-router-dom";
import {UpdateTrajet} from "../../../interface/TrajetInterface/UpdateTrajet";
import { update } from '../../../service/TrajetService';
import dayjs, {Dayjs} from "dayjs";


const EditJourneyPage: React.FC = () => {
    const location = useLocation();
    const [trajet, setTrajet] = useState<Trajet>(
        location.state?.trajet || {}
    );
    const userInfoString = localStorage.getItem('userInfo');
    const userInfo = userInfoString ? JSON.parse(userInfoString): null;
    const tokenIdentif = localStorage.getItem('token');
    const navigate = useNavigate();
    const [dateHeureDepart, setDateHeureDepart] = useState<Dayjs | null>(trajet.dateHeureDepart ? dayjs(trajet.dateHeureDepart) : dayjs());

    const handleCancel = () => {
        navigate('/my-journeys');
    }

    const handleSubmit = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const date = new Date(String(data.get("dateHeure")));
        const padTo2Digits = (num: { toString: () => string; }) => num.toString().padStart(2, '0');
        const formattedDate = `${date.getFullYear()}-${padTo2Digits(date.getMonth() + 1)}-${padTo2Digits(date.getDate())} ${padTo2Digits(date.getHours())}:${padTo2Digits(date.getMinutes())}:00`;
        const isValidDate = async (dateStr: string) => {
            return !isNaN(new Date(dateStr).getTime());
        };
        let dateToUse = await isValidDate(formattedDate) ? String(formattedDate) : String(trajet?.dateHeureDepart);
        const form: UpdateTrajet = {
            userDTO: {
                name: String(userInfo.name),
                firstName: String(userInfo.firstName),
                email: String(userInfo.email),
                phoneNumber: String(userInfo.phoneNumber),
                statut: String(userInfo.statut),
                id: Number(localStorage.getItem("idUser"))
            },
            depart: String(data.get("depart")) || String(trajet?.depart),
            arrivee: String(data.get("arrivee")) || String(trajet?.arrivee),
            dateHeureDepart: String(dateToUse),
            nbPlaces: Number(data.get("nbPlaces")) || Number(trajet?.nbPlaces),
            prix: Number(data.get("price")) || Number(trajet?.prix),
            statut: trajet?.statut || String(trajet?.statut),
            id: Number(trajet?.id)
        };
        try {
            const response = await update(String(tokenIdentif), String(userInfo.email), form);
            if (response) {
                navigate('/my-journeys');
            } else {
                console.log("Problème survenue lors de la mise à jour...");
            }
        } catch (e) {
            console.log("Une erreur est survenue lors de la mise à jour du trajet...");
        }
    }


    return(
        <>
            <NavBar/>
            <div>
                <form onSubmit={handleSubmit}>
                    <Box className="fadeInUpAnimation" sx={{flex: 1, width: '100%'}}>
                        <Stack
                            spacing={4}
                            sx={{
                                display: 'flex',
                                maxWidth: '800px',
                                mx: 'auto',
                                px: {xs: 2, md: 6},
                                py: {xs: 2, md: 3},
                            }}
                        >
                            <Card>
                                <Box sx={{mb: 1}}>
                                    <Typography level="h2">Modifier un trajet</Typography>
                                </Box>
                                <Divider/>
                                <Stack spacing={2} sx={{ flexGrow: 1 }}>
                                    <Stack spacing={1}>
                                        <FormLabel>Point de départ</FormLabel>
                                        <FormControl
                                            sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                        >
                                            <Input size="sm" id="depart" name="depart" placeholder={trajet?.depart} />
                                        </FormControl>
                                        <FormLabel>Point d'arrivé</FormLabel>
                                        <FormControl
                                            sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                        >
                                            <Input size="sm" id="arrivee" name="arrivee" placeholder={String(trajet?.arrivee)} />
                                        </FormControl>
                                        <FormLabel>Date et Heure de départ</FormLabel>
                                        <FormControl
                                            sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                        >
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DateTimePicker
                                                    value={dateHeureDepart}
                                                    onChange={(newValue: Dayjs | null) => setDateHeureDepart(newValue)}
                                                    name="dateHeure"
                                                />
                                            </LocalizationProvider>
                                        </FormControl>
                                        <FormLabel>Nombre de places disponible</FormLabel>
                                        <FormControl
                                            sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                        >
                                            <Input size="sm" type="tel" id="nbPlaces" name="nbPlaces" placeholder={String(trajet?.nbPlaces)}/>
                                        </FormControl>
                                        <FormLabel>Prix</FormLabel>
                                        <FormControl
                                            sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                        >
                                            <Input size="sm" type="tel" id="price" name="price" placeholder={String(trajet?.prix)} />
                                        </FormControl>
                                    </Stack>
                                </Stack>
                                <CardOverflow sx={{borderTop: '1px solid', borderColor: 'divider'}}>
                                    <CardActions sx={{alignSelf: 'flex-end', pt: 2}}>
                                        <Button size="sm" variant="soft" color="neutral" onClick={handleCancel}>
                                            Cancel
                                        </Button>
                                        <Button size="sm" type="submit" variant="soft" color="primary">
                                            Save
                                        </Button>
                                    </CardActions>
                                </CardOverflow>
                            </Card>
                        </Stack>
                    </Box>
                </form>
            </div>
            <br/>
            <br/>
            <br/>
            <div className="footer-container">
                <Footer/>
            </div>
        </>
    );

}


export default EditJourneyPage;
