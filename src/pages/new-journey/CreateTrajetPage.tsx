import React, {useState} from "react";
import NavBar from "../../component/navBar/NavBar";
import './css/fadeUp.css';
import './css/spinner.css';
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import AspectRatio from "@mui/joy/AspectRatio";
import IconButton from "@mui/joy/IconButton";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import FormLabel from "@mui/joy/FormLabel";
import FormControl from "@mui/joy/FormControl";
import Input from "@mui/joy/Input";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import CardOverflow from "@mui/joy/CardOverflow";
import CardActions from "@mui/joy/CardActions";
import Button from "@mui/joy/Button";
import Textarea from "@mui/joy/Textarea";
import FormHelperText from "@mui/joy/FormHelperText";
import Footer from "../../component/footer/Footer";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import { create as createTrajet } from '../../service/TrajetService';
import {Trajet} from "../../interface/TrajetInterface/Trajet";
import {AddVehicule} from "../../interface/VehiculeInterface/AddVehicule";
import {useNavigate} from "react-router-dom";
import {AddTrajet} from "../../interface/TrajetInterface/AddTrajet";

const CreateTrajetPage: React.FC = () => {

    const [trajet, setTrajet] = useState<Trajet>();
    const navigate = useNavigate();
    const userInfoString = localStorage.getItem('userInfo');
    const userInfo = userInfoString ? JSON.parse(userInfoString): null;
    const tokenIdentif = localStorage.getItem('token');

    const handleSubmit = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        // Convertir la chaîne en un objet Date
        const date = new Date(String(data.get("dateHeure")));
        const padTo2Digits = (num: { toString: () => string; }) => num.toString().padStart(2, '0');
        const formattedDate = `${date.getFullYear()}-${padTo2Digits(date.getMonth() + 1)}-${padTo2Digits(date.getDate())} ${padTo2Digits(date.getHours())}:${padTo2Digits(date.getMinutes())}:00`;
        const form : AddTrajet = {
            userDTO: {
                name: String(userInfo.name),
                firstName: String(userInfo.firstName),
                email: String(userInfo.email),
                phoneNumber: String(userInfo.phoneNumber),
                statut: String(userInfo.statut),
                id: Number(localStorage.getItem("idUser"))
            },
            depart: String(data.get("depart")),
            arrivee: String(data.get("arrivee")),
            dateHeureDepart: String(formattedDate),
            nbPlaces: Number(data.get("nbPlaces")),
            prix: Number(data.get("price")),
            statut: "à venir"

        };
        try {
            const response = await createTrajet(String(tokenIdentif), form);
            if (response) {
                navigate('/dashboard');
            } else {
                console.log("Erreur lors de la requête...")
            }
        } catch (e) {
            console.log('Error during adding...' + e)
        }
    }

    return (
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
                                    <Typography level="h2">Publier un nouveau trajet</Typography>
                                </Box>
                                <Divider/>
                                <Stack spacing={2} sx={{ flexGrow: 1 }}>
                                    <Stack spacing={1}>
                                        <FormLabel>Point de départ</FormLabel>
                                        <FormControl
                                            sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                        >
                                            <Input size="sm" id="depart" name="depart" placeholder="" required />
                                        </FormControl>
                                        <FormLabel>Point d'arrivé</FormLabel>
                                        <FormControl
                                            sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                        >
                                            <Input size="sm" id="arrivee" name="arrivee" placeholder="" required />
                                        </FormControl>
                                        <FormLabel>Date et Heure de départ</FormLabel>
                                        <FormControl
                                            sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                        >
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DateTimePicker name="dateHeure"/>
                                            </LocalizationProvider>
                                        </FormControl>
                                        <FormLabel>Nombre de places disponible</FormLabel>
                                        <FormControl
                                            sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                        >
                                            <Input size="sm" type="tel" id="nbPlaces" name="nbPlaces" placeholder="" required/>
                                        </FormControl>
                                        <FormLabel>Prix</FormLabel>
                                        <FormControl
                                            sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                        >
                                            <Input size="sm" type="tel" id="price" name="price" placeholder="" required />
                                        </FormControl>
                                    </Stack>
                                </Stack>
                                <CardOverflow sx={{borderTop: '1px solid', borderColor: 'divider'}}>
                                    <CardActions sx={{alignSelf: 'flex-end', pt: 2}}>
                                        <Button size="sm" variant="soft" color="neutral">
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

export default CreateTrajetPage;
