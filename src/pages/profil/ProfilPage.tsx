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
import { create as createVehicule } from '../../service/VehiculeService';
import { getAllByDriver } from "../../service/VehiculeService";
import {CircularProgress, Modal, ModalDialog} from "@mui/joy";
import {UpdateProfil} from "../../interface/ProfilInterface/UpdateProfil";
import Snackbar, { SnackbarProps } from '@mui/joy/Snackbar';
import {Add} from "@mui/icons-material";
import {
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
import {AddVehicule} from "../../interface/VehiculeInterface/AddVehicule";
import {blue} from "@mui/material/colors";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: blue["800"],
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


const ProfilPage: React.FC = () => {
    const [imageFile, setImageFile] = useState("");
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState<boolean>(false);
    const [variant, setVariant] = React.useState<SnackbarProps['variant']>('soft');
    const [color, setColor] = React.useState<SnackbarProps['color']>('success');
    const [error, setError] = useState('');
    const [profil, setProfil] = useState<Profil>();
    const [vehicules, setVehicules] = useState<Vehicule[]>([]);
    const [hasVehicule, setHasVehicule] = useState(false);
    const navigate = useNavigate();
    const userInfoString = localStorage.getItem('userInfo');
    const userInfo = userInfoString ? JSON.parse(userInfoString): null;
    const tokenIdentif = localStorage.getItem('token');

    let handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

    handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageFile(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmitVehicule = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const form: AddVehicule = {
            userDTO: {
                name: String(userInfo.name),
                firstName: String(userInfo.firstName),
                email: String(userInfo.email),
                phoneNumber: String(userInfo.phoneNumber),
                statut: String(userInfo.statut),
                id: Number(localStorage.getItem('idUser'))
            },
            marque: String(data.get('marque')),
            modele: String(data.get('modele')),
            couleur: String(data.get('couleur')),
            immatriculation: String(data.get('immatri')),
            annee: Number(data.get('annee')),
            used: 1
        };
        try {
            const response = await createVehicule(String(tokenIdentif), form);
            if (response) {
                window.location.reload();
            }
        } catch (e) {
            console.log('Error during adding...' + e);
        }
    }

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
                setOpen(true);
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
                    console.log("Error during fetching..." + e);
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
                    if (response) {
                        setVehicules(response);
                        setHasVehicule(true);
                    } else {
                        setHasVehicule(false);
                    }
                } catch (e) {
                    console.log("Error during fetching..." + e);
                }
            }
        }
        fetchVehicule();
        fetchProfil();
    }, [navigate, tokenIdentif, userInfo.email]);

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
            <div>
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
                                        <Button size="sm" type="reset" variant="soft" color="neutral">
                                            Cancel
                                        </Button>
                                        <Button size="sm" type="submit" variant="soft" color="primary">
                                            Save
                                        </Button>
                                        <Snackbar
                                            autoHideDuration={4000}
                                            open={open}
                                            size="lg"
                                            variant={variant}
                                            color={color}
                                            onClose={() => setOpen(false)}
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
                                        <Button size="sm" type="reset" variant="soft" color="neutral">
                                            Cancel
                                        </Button>
                                        <Button size="sm" type="submit" variant="soft" color="primary">
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
                                {hasVehicule ? (
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="vehicule table">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell>Marque</StyledTableCell>
                                                    <StyledTableCell>Modèle</StyledTableCell>
                                                    <StyledTableCell>Couleur</StyledTableCell>
                                                    <StyledTableCell>Immatriculation</StyledTableCell>
                                                    <StyledTableCell>Année</StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {Array.isArray(vehicules) && vehicules.map((vehicule) => (
                                                    <TableRow
                                                        key={vehicule.id}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {vehicule.marque}
                                                        </TableCell>
                                                        <TableCell component="th" scope="row">
                                                            {vehicule.modele}
                                                        </TableCell>
                                                        <TableCell component="th" scope="row">
                                                            {vehicule.couleur}
                                                        </TableCell>
                                                        <TableCell component="th" scope="row">
                                                            {vehicule.immatriculation}
                                                        </TableCell>
                                                        <TableCell component="th" scope="row">
                                                            {vehicule.annee}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                ) : <p>Aucun véhicule enregistré</p>}
                            </Stack>
                            <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                                <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                    <Button size="lg" variant="soft" color="primary" startDecorator={<Add />}
                                            onClick={() => setOpen2(true)}>
                                        Ajouter
                                    </Button>
                                    <Modal open={open2} onClose={() => setOpen2(false)}>
                                        <form onSubmit={handleSubmitVehicule}>
                                            <ModalDialog
                                                aria-labelledby="nested-modal-title"
                                                aria-describedby="nested-modal-description"
                                                sx={(theme) => ({
                                                    [theme.breakpoints.only('xs')]: {
                                                        top: 'unset',
                                                        bottom: 0,
                                                        left: 0,
                                                        right: 0,
                                                        borderRadius: 0,
                                                        transform: 'none',
                                                        maxWidth: 'unset',
                                                    },
                                                })}
                                            >
                                                <Typography id="nested-modal-title" level="h2">
                                                    Nouveau véhicule
                                                </Typography>
                                                <Typography id="nested-modal-description" textColor="text.tertiary">
                                                    Veuillez entrer les informations de votre nouveau véhicule pour vos trajets
                                                </Typography>
                                                <Stack spacing={2}>
                                                    <FormControl>
                                                        <FormLabel>Marque</FormLabel>
                                                        <Input id="marque" name="marque" autoFocus required />
                                                    </FormControl>
                                                    <FormControl>
                                                        <FormLabel>Modèle</FormLabel>
                                                        <Input id="modele" name="modele" required />
                                                    </FormControl>
                                                    <FormControl>
                                                        <FormLabel>Couleur</FormLabel>
                                                        <Input id="couleur" name="couleur" required />
                                                    </FormControl>
                                                    <FormControl>
                                                        <FormLabel>Immatriculation</FormLabel>
                                                        <Input id="immatri" name="immatri" required />
                                                    </FormControl>
                                                    <FormControl>
                                                        <FormLabel>Année</FormLabel>
                                                        <Input type="tel" id="annee" name="annee" required />
                                                    </FormControl>
                                                </Stack>
                                                <Box
                                                    sx={{
                                                        mt: 1,
                                                        display: 'flex',
                                                        gap: 1,
                                                        flexDirection: { xs: 'column', sm: 'row-reverse' },
                                                    }}
                                                >
                                                    <Button variant="soft" color="primary" type="submit">
                                                        Enregistrer
                                                    </Button>
                                                    <Button
                                                        variant="soft"
                                                        color="neutral"
                                                        onClick={() => setOpen2(false)}
                                                    >
                                                        Annuler
                                                    </Button>
                                                </Box>
                                            </ModalDialog>
                                        </form>
                                    </Modal>
                                </CardActions>
                            </CardOverflow>
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
