import React, {useEffect, useState} from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Textarea from '@mui/joy/Textarea';
import Stack from '@mui/joy/Stack';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Typography from '@mui/joy/Typography';
import './css/spinner.css';
import './css/fadeUp.css';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import NavBar from "../../component/navBar/NavBar";
import Footer from "../../component/footer/Footer";
import {useNavigate} from "react-router-dom";
import { get as getProfil } from '../../service/ProfilService';
import { update as updateProfil } from '../../service/ProfilService';
import {Profil} from "../../interface/ProfilInterface/Profil";
import { Vehicule } from "../../interface/VehiculeInterface/Vehicule";
import { getAllByDriver } from "../../service/VehiculeService";
import {CircularProgress} from "@mui/joy";
import {User} from "../../interface/UserInterface/User";
import {AddUser} from "../../interface/UserInterface/AddUser";
import {UpdateProfil} from "../../interface/ProfilInterface/UpdateProfil";
import Snackbar, { SnackbarProps } from '@mui/joy/Snackbar';

const ProfilPage: React.FC = () => {
    const [imageFile, setImageFile] = useState("");
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = React.useState(false);
    const [variant, setVariant] = React.useState<SnackbarProps['variant']>('soft');
    const [color, setColor] = React.useState<SnackbarProps['color']>('success');
    const [error, setError] = useState('');
    const [profil, setProfil] = useState<Profil>();
    const [vehicules, setVehicules] = useState<Vehicule[]>();
    const navigate = useNavigate();
    const userInfoString = localStorage.getItem('userInfo');
    const userInfo = userInfoString ? JSON.parse(userInfoString): null;
    const tokenIdentif = localStorage.getItem('token');

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Met à jour l'image de profil temporairement affichée
                setImageFile(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const form: UpdateProfil = {
            userDTO: {
                name: String(data.get('lastName')) || data.get('lastNameMobile') || userInfo.name,
                firstName: String(data.get('firstName')) || data.get('firstNameMobile') || userInfo.firstName,
                email: String(data.get('email')) || data.get('emailMobile') || userInfo.email,
                phoneNumber: String(data.get('phoneNumber')) || data.get('phoneNumberMobile') || userInfo.phoneNumber
            },
            bio: String(profil?.bio),
            pictureProfil: imageFile || String(profil?.pictureProfil)
        };
        try {
            const response = await updateProfil(String(tokenIdentif), userInfo.email, form);
            if (response) {
                setTimeout(() => {
                    setOpen(true);
                }, 5000);
                setOpen(false);
                window.location.reload();
            } else {
                console.log("Une erreur est survenue...");
            }
        } catch (e) {
            console.log("Error during updating..." + e);
        }
    }


    useEffect(() => {
        const fetchProfil = async () => {
            if (tokenIdentif === '' || tokenIdentif === null || tokenIdentif === undefined) {
                navigate('/');
            } else {
                setLoading(true);
                try {
                    const response = await getProfil(tokenIdentif, userInfo.email);
                    setProfil(response);
                } catch (e) {
                    console.log("Une erreur est survenue lors de la récupération des données du profil...");
                } finally {
                    setLoading(false);
                }
            }
        }
        const fetchVehicule = async () => {
            if (tokenIdentif === '' || tokenIdentif === null || tokenIdentif === undefined) {
                console.log("Vous n'êtes pas connecté...");
                navigate('/');
            } else {
                setLoading(true);
                try{
                    const response = await getAllByDriver(tokenIdentif, userInfo.email);
                    setVehicules(response);
                } catch (e) {
                    console.log("Une erreur est survenue...");
                }
            }
        }
        fetchVehicule();
        fetchProfil();
    }, []);

    const handleSubmitBio = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const form: UpdateProfil = {
            userDTO: {
                name: String(userInfo.name),
                firstName: String(userInfo.firstName),
                email: String(userInfo.email),
                phoneNumber: String(userInfo.phoneNumber)
            },
            bio: String(data.get('bio')) || String(profil?.bio),
            pictureProfil: String(profil?.pictureProfil)
        };
        try {
            const response = await updateProfil(String(tokenIdentif), userInfo.email, form);
            if (response) {
                window.location.reload();
            } else {
                console.log("Une erreur est survenue...");
            }
        } catch (e) {
            console.log("Error during updating..." + e);
        }
    }

    if (loading) {
        return (
            <div className="spinner-container">
                <div className="loader"/>
            </div>
        );
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <NavBar/>
            <div>
                <Box className="fadeInUpAnimation" sx={{ flex: 1, width: '100%' }}>
                    <Stack
                        spacing={4}
                        sx={{
                            display: 'flex',
                            maxWidth: '800px',
                            mx: 'auto',
                            px: { xs: 2, md: 6 },
                            py: { xs: 2, md: 3 },
                        }}
                    >
                        <form onSubmit={handleSubmit}>
                            <Card>
                                <Box sx={{ mb: 1 }}>
                                    <Typography level="h2">Informations personnelles</Typography>
                                </Box>
                                <Divider />
                                <Stack direction="row" spacing={3} sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}>
                                    <Stack direction="column" spacing={1}>
                                        <AspectRatio ratio="1" maxHeight={200} sx={{ flex: 1, minWidth: 120, borderRadius: '100%' }}>
                                            <img src={imageFile || profil?.pictureProfil} alt="Photo de profil" id="pictureProfil" />
                                        </AspectRatio>
                                        <label htmlFor="file-input">
                                            <IconButton aria-label="upload new picture" component="span" size="sm" variant="outlined" color="neutral" sx={{
                                                bgcolor: 'background.body', position: 'absolute', zIndex: 2, borderRadius: '50%', left: 100, top: 170, boxShadow: 'sm',
                                            }}>
                                                <EditRoundedIcon />
                                            </IconButton>
                                        </label>
                                        <input type="file" id="file-input" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                                    </Stack>
                                    <Stack spacing={2} sx={{ flexGrow: 1 }}>
                                        <FormControl sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}>
                                            <Input size="sm" id="firstName" name="firstName" placeholder={profil?.userDTO.firstName} />
                                            <Input size="sm" id="lastName" name="lastName" placeholder={profil?.userDTO.name} sx={{ flexGrow: 1 }} />
                                        </FormControl>
                                        <FormControl>
                                            <Input size="sm" id="phoneNumber" name="phoneNumber" placeholder={profil?.userDTO.phoneNumber} />
                                        </FormControl>
                                        <FormControl sx={{ flexGrow: 1 }}>
                                            <Input size="sm" type="email" id="email" name="email" startDecorator={<EmailRoundedIcon />} placeholder={profil?.userDTO.email} sx={{ flexGrow: 1 }} />
                                        </FormControl>
                                    </Stack>
                                </Stack>
                                <Stack direction="column" spacing={2} sx={{ display: { xs: 'flex', md: 'none' }, my: 1 }}>
                                    <Stack direction="row" spacing={2}>
                                        <Stack direction="column" spacing={1}>
                                            <AspectRatio ratio="1" maxHeight={108} sx={{ flex: 1, minWidth: 108, borderRadius: '100%' }}>
                                                <img src={imageFile || profil?.pictureProfil} alt="Photo de profil" id="pictureProfilMobile" />
                                            </AspectRatio>
                                            <label htmlFor="mobile-file-input">
                                                <IconButton
                                                    aria-label="upload new picture"
                                                    component="span"
                                                    size="sm"
                                                    variant="outlined"
                                                    color="neutral"
                                                    sx={{
                                                        bgcolor: 'background.body',
                                                        position: 'absolute',
                                                        zIndex: 2,
                                                        borderRadius: '50%',
                                                        left: 85,
                                                        top: 180,
                                                        boxShadow: 'sm',
                                                    }}
                                                >
                                                    <EditRoundedIcon />
                                                </IconButton>
                                            </label>
                                            <input
                                                type="file"
                                                id="mobile-file-input"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                style={{ display: 'none' }}
                                            />
                                        </Stack>
                                        <Stack spacing={1} sx={{ flexGrow: 1 }}>
                                            <FormControl
                                                sx={{
                                                    display: {
                                                        sm: 'flex-column',
                                                        md: 'flex-row',
                                                    },
                                                    gap: 2,
                                                }}
                                            >
                                                <FormLabel>Nom complet</FormLabel>
                                                <Input size="sm" id="firstNameMobile" name="firstNameMobile" placeholder={profil?.userDTO.firstName} />
                                                <Input size="sm" id="lastNameMobile" name="lastNameMobile" placeholder={profil?.userDTO.name} />
                                            </FormControl>
                                        </Stack>
                                    </Stack>
                                    <FormControl>
                                        <FormLabel htmlFor="phoneNumberMobile">Numéro de téléphone</FormLabel>
                                        <Input size="sm" id="phoneNumberMobile" name="phoneNumberMobile" placeholder={profil?.userDTO.phoneNumber} />
                                    </FormControl>
                                    <FormControl sx={{ flexGrow: 1 }}>
                                        <FormLabel htmlFor="emailMobile">Email</FormLabel>
                                        <Input
                                            size="sm"
                                            type="email"
                                            id="emailMobile"
                                            name="emailMobile"
                                            startDecorator={<EmailRoundedIcon />}
                                            placeholder={profil?.userDTO.email}
                                            sx={{ flexGrow: 1 }}
                                        />
                                    </FormControl>
                                </Stack>
                                <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                                    <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                        <Button size="sm" type="reset" variant="outlined" color="neutral">
                                            Cancel
                                        </Button>
                                        <Button size="sm" type="submit" variant="solid">
                                            Save
                                        </Button>
                                        <Snackbar
                                            autoHideDuration={4000}
                                            open={open}
                                            size="lg"
                                            variant={variant}
                                            color={color}
                                        >
                                            Modification effectué avec succès !
                                        </Snackbar>
                                    </CardActions>
                                </CardOverflow>
                            </Card>
                        </form>
                        <form onSubmit={handleSubmitBio}>
                            <Card>
                                <Box sx={{ mb: 1 }}>
                                    <Typography level="h2">Bio</Typography>
                                </Box>
                                <Divider />
                                <Stack spacing={2} sx={{ my: 1 }}>
                                    <Textarea
                                        size="sm"
                                        minRows={4}
                                        id="bio"
                                        name="bio"
                                        sx={{ mt: 1.5 }}
                                        defaultValue={profil?.bio}
                                    />
                                    <FormHelperText sx={{ mt: 0.75, fontSize: 'xs' }}>
                                        275 characters left
                                    </FormHelperText>
                                </Stack>
                                <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                                    <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                        <Button size="sm" type="reset" variant="outlined" color="neutral">
                                            Cancel
                                        </Button>
                                        <Button size="sm" type="submit" variant="solid">
                                            Save
                                        </Button>
                                    </CardActions>
                                </CardOverflow>
                            </Card>
                        </form>
                        <Card>
                            <Box sx={{ mb: 1 }}>
                                <Typography level="h2">Véhicule</Typography>
                            </Box>
                            <Divider />
                            <Stack spacing={2} sx={{ my: 1 }}>

                            </Stack>
                        </Card>
                    </Stack>
                </Box>
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

export default ProfilPage;
