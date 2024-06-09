import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import {ProfilRegister} from "../../interface/ProfilInterface/ProfilRegister";
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import { register } from '../../service/ProfilService';
import FormLabel from '@mui/joy/FormLabel';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import GoogleIcon from '../../element/GoogleIcon';
import LogoNaked from "../../assets/logo/LogoNaked";
import FullColorLogo from "../../assets/logo/FullColorLogo";
import {Textarea} from "@mui/joy";
import {useState} from "react";
import WhiteColorLogo from "../../assets/logo/WhiteColorLogo";
import AspectRatio from "@mui/joy/AspectRatio";
import {update as updateProfil} from "../../service/ProfilService";
import {useNavigate} from "react-router-dom";

interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
    password: HTMLInputElement;
    persistent: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

function ColorSchemeToggle(props: IconButtonProps) {
    const { onClick, ...other } = props;
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => setMounted(true), []);


    return (
        <IconButton
            aria-label="toggle light/dark mode"
            size="sm"
            variant="outlined"
            disabled={!mounted}
            onClick={(event) => {
                setMode(mode === 'light' ? 'dark' : 'light');
                onClick?.(event);
            }}
            {...other}
        >
            {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
        </IconButton>
    );
}

export default function SignUp() {

    const [imageFile, setImageFile] = useState("");

    const navigate = useNavigate();

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
        const registerForm: ProfilRegister = {
            name: String(data.get("name")),
            firstName: String(data.get("firstName")),
            email: String(data.get("email")),
            password: String(data.get("password")),
            telephone: String(data.get("phoneNumber")),
            statut: "A",
            bio: String(data.get("bio")),
            photo: String(imageFile)
        };
        try {
            const response = await register(registerForm);
            if (response) {
                navigate('/login');
            } else {
                console.log("Une erreur est survenue...");
            }
        } catch (e) {
            console.log("Error during updating..." + e);
        }
    }



    return (
        <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
            <CssBaseline />
            <GlobalStyles
                styles={{
                    ':root': {
                        '--Form-maxWidth': '800px',
                        '--Transition-duration': '0.4s', // set to `none` to disable transition
                    },
                }}
            />
            <Box
                sx={(theme) => ({
                    width: { xs: '100%', md: '50vw' },
                    transition: 'width var(--Transition-duration)',
                    transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    backdropFilter: 'blur(12px)',
                    backgroundColor: 'rgba(255 255 255 / 0.2)',
                    [theme.getColorSchemeSelector('dark')]: {
                        backgroundColor: 'rgba(19 19 24 / 0.4)',
                    },
                })}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '100dvh',
                        width: '100%',
                        px: 2,
                    }}
                >
                    <Box
                        component="header"
                        sx={{
                            py: 3,
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
                            <Link href="/" level="title-sm">
                                <FullColorLogo/>
                            </Link>
                        </Box>
                        <ColorSchemeToggle />
                    </Box>
                    <Box
                        component="main"
                        sx={{
                            my: 'auto',
                            py: 2,
                            pb: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            width: 400,
                            maxWidth: '100%',
                            mx: 'auto',
                            borderRadius: 'sm',
                            '& form': {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            },
                            [`& .MuiFormLabel-asterisk`]: {
                                visibility: 'hidden',
                            },
                        }}
                    >
                        <Stack gap={4} sx={{ mb: 2 }}>
                            <Stack gap={1}>
                                <Typography component="h1" level="h3">
                                    Inscription
                                </Typography>
                                <Typography level="body-sm">
                                    Vous possèdez déjà un compte ?{' '}
                                    <Link href="/login" level="title-sm">
                                        Connectez-vous !
                                    </Link>
                                </Typography>
                            </Stack>
                            <Button
                                variant="soft"
                                color="neutral"
                                fullWidth
                                startDecorator={<GoogleIcon />}
                            >
                                Continue with Google
                            </Button>
                        </Stack>
                        <Divider
                            sx={(theme) => ({
                                [theme.getColorSchemeSelector('light')]: {
                                    color: { xs: '#FFF', md: 'text.tertiary' },
                                },
                            })}
                        >
                            or
                        </Divider>
                        <Stack gap={4} sx={{ mt: 2 }}>
                            <form
                                onSubmit={handleSubmit}
                            >
                                <FormControl required>
                                    <FormLabel>Nom</FormLabel>
                                    <Input type="text" id="name" name="name" required />
                                </FormControl>
                                <FormControl required>
                                    <FormLabel>Prénom</FormLabel>
                                    <Input type="text" id="firstName" name="firstName" required/>
                                </FormControl>
                                <FormControl required>
                                    <FormLabel>E-mail</FormLabel>
                                    <Input type="email" id="email" name="email" required />
                                </FormControl>
                                <FormControl required>
                                    <FormLabel>Mot de passe</FormLabel>
                                    <Input type="password" id="password" name="password" required />
                                </FormControl>
                                <FormControl required>
                                    <FormLabel>Téléphone</FormLabel>
                                    <Input type="tel" id="phoneNumber" name="phoneNumber" required />
                                </FormControl>
                                <FormControl required>
                                    <FormLabel>Biographie (Facultatif)</FormLabel>
                                    <Textarea
                                        id="bio"
                                        name="bio"
                                        placeholder="Votre biographie ici"
                                        // Vous pouvez ajuster le nombre de lignes initiales affichées avec la prop `minRows`
                                        minRows={4}
                                    />
                                </FormControl>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    fullWidth
                                    sx={{ mt: 2 }}
                                >
                                    Upload Image
                                    <input
                                        type="file"
                                        hidden
                                        accept=".jpg, .jpeg, .png"
                                        onChange={handleImageChange}
                                        required
                                    />
                                </Button>
                                {imageFile && (
                                    <Stack direction="column" spacing={1}>
                                        <AspectRatio ratio="1" maxHeight={200} sx={{ flex: 1, minWidth: 50, maxWidth: 200, alignItems: "center", borderRadius: '100%' }}>
                                            <img src={imageFile} alt="Photo de profil" id="pictureProfil" />
                                        </AspectRatio>
                                    </Stack>
                                )}
                                <Stack gap={4} sx={{ mt: 2 }}>
                                    <Button type="submit" fullWidth>
                                        Inscription
                                    </Button>
                                </Stack>
                            </form>
                        </Stack>
                    </Box>
                    <Box component="footer" sx={{ py: 3 }}>
                        <Typography level="body-xs" textAlign="center">
                            © Bokko {new Date().getFullYear()}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={(theme) => ({
                    height: '100%',
                    position: 'fixed',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    left: { xs: 0, md: '50vw' },
                    transition:
                        'background-image var(--Transition-duration), left var(--Transition-duration) !important',
                    transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                    backgroundColor: 'background.level1',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage:
                        'url(https://i.ibb.co/HdbQNr7/DALL-E-2024-06-09-18-59-29-A-modern-eco-friendly-car-on-a-sunny-road-in-Africa-surrounded-by-typical.webp)',
                    [theme.getColorSchemeSelector('dark')]: {
                        backgroundImage:
                            'url(https://i.ibb.co/GHKRjXc/DALL-E-2024-06-09-18-59-10-A-modern-eco-friendly-car-on-a-road-in-Africa-at-night-surrounded-by-typi.webp)',
                    },
                })}
            />
        </CssVarsProvider>
    );
}
