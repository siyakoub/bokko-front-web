import React, { useEffect, useState } from 'react';
import FullColorLogo from "../../assets/logo/FullColorLogo";
import './navbarStyle.css';
import { FaChevronDown } from "react-icons/fa"; // Corrected the import
import { get as getProfil } from '../../service/ProfilService';
import {logout} from "../../service/UserService";
import {useNavigate} from "react-router-dom";
import Avatar from "@mui/joy/Avatar";
import LogoUser from "../../assets/logo/LogoUser";
import {Dropdown, ListItemDecorator, Menu, MenuButton, MenuItem} from "@mui/joy";
import IconButton from "@mui/joy/IconButton";
import {Apps} from "@mui/icons-material";
import Button from "@mui/joy/Button";
import { styled, Box } from '@mui/system';
import { Badge as BaseBadge, badgeClasses } from '@mui/base/Badge';

const blue = {
    100: '#DAECFF',
    500: '#007FFF',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};



const Navbar: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profilInfo, setProfilInfo] = useState<{
        bio: string;
        pictureProfil: string;
        idProfil: number;
    }>();
    const navigate = useNavigate();

    const handleNewTrajet = () => {
        navigate('/new-journey');
    }

    function BadgeContent() {
        return (
            <Box
                component="span"
                sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '12px',
                    background: (theme) =>
                        theme.palette.mode === 'dark' ? grey[700] : grey[200],
                    display: 'inline-block',
                    verticalAlign: 'middle',

                }}
            >

            </Box>
        );
    }

    const Badge = styled(BaseBadge)(
        ({ theme }) => `
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-variant: tabular-nums;
  list-style: none;
  font-family: 'IBM Plex Sans', sans-serif;
  position: relative;
  display: inline-block;
  line-height: 1;

  & .${badgeClasses.badge} {
    z-index: auto;
    position: absolute;
    top: 0;
    right: 0;
    min-width: 22px;
    height: 22px;
    padding: 0 6px;
    color: #fff;
    font-weight: 600;
    font-size: 12px;
    line-height: 22px;
    white-space: nowrap;
    text-align: center;
    border-radius: 12px;
    background: ${blue[500]};
    box-shadow: 0px 2px 24px ${
            theme.palette.mode === 'dark' ? blue[900] : blue[100]
        };
    transform: translate(50%, -50%);
    transform-origin: 100% 0;
  }
  `,
    );

    const toggleExpand = () => setIsExpanded(!isExpanded);

    const userInfoString = localStorage.getItem('userInfo');
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

    const handleSubscribe = () => {
        navigate('/register');
    }

    const handleLoginLogout = async () => {
        setIsLoggedIn(!isLoggedIn);
        setIsExpanded(false); // Close the expandable menu after action
        try {
            const response = await logout(userInfo.token);
            if (response) {
                localStorage.removeItem('userInfo');
                localStorage.removeItem('profilInfo');
                localStorage.removeItem('token');
                localStorage.removeItem('idUser');
                navigate('/');
            }
        } catch (e) {
            console.log("Erreur lors de la déconnexion...")
        }
    };

    const handleMenu = () => {
        navigate('/dashboard');
    }

    useEffect(() => {
        const fetchProfil = async () => {
            if (userInfo && userInfo.token && userInfo.email) {
                setIsLoggedIn(!!userInfo);
                try {
                    const response = await getProfil(userInfo.token, userInfo.email);
                    if (response) {
                        const profilInfo = {
                            bio: response['bio'],
                            pictureProfil: response['pictureProfil'],
                            idProfil: response['id']
                        };
                        localStorage.setItem('profilInfo', JSON.stringify(profilInfo));
                        setProfilInfo(profilInfo);
                    } else {
                        console.log("Une erreur est survenue lors de la récupération du profil");
                    }
                } catch (e) {
                    console.log("Une erreur est survenue lors de l'appel d'API : ", e);
                }
            }
        };
        fetchProfil();
    }, []);

    const handleProfil = () => {
        navigate('/profil');
    }

    const handleLogin = () => {
        navigate('/login')
    }

    const handleDashboard = () => {
        navigate('/dashboard');
    }

    const handlejourneys = () => {
        navigate('/my-journeys');
    }

    const handleReviewPage = () => {
        navigate(
            '/reviews'
        )
    }

    const handleReservations = () => {
        navigate('/my-bookings');
    }

    const handleRequestReserv = () => {
        navigate('/my-booking-requests');
    }

    return (
        <nav className="navbar">
            <div onClick={handleMenu}>
                <FullColorLogo />
            </div>
            <div className="navbar-menu"></div>
            <div className="navbar-actions">
                {isLoggedIn ? (
                    <Button size="md" onClick={handleNewTrajet} variant="soft" color="primary">
                        Créer un trajet
                    </Button>
                ) : <div></div>}

                <div className="profilLogo">
                    {isLoggedIn ? (
                        <Avatar alt={userInfo.firstName} src={profilInfo?.pictureProfil} size="lg" />
                    ) : (
                        <Avatar variant="outlined" size="lg"/>
                    )}
                    {isLoggedIn ? (
                        <Dropdown>
                            <MenuButton
                                slots={{root: IconButton}}
                                slotProps={{root: {variant: 'plain', color: 'neutral'}}}
                                sx={{borderRadius: 40}}
                            >
                                <Apps/>
                            </MenuButton>
                            <Menu
                                variant="solid"
                                color="primary"
                                invertedColors
                                aria-labelledby="apps-menu-demo"
                                sx={{
                                    '--List-padding': '0.5rem',
                                    '--ListItemDecorator-size': '3rem',
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, 100px)',
                                    gridAutoRows: '100px',
                                    gap: 1,
                                }}
                            >
                                <MenuItem orientation="vertical" onClick={handleDashboard}>
                                    <ListItemDecorator>
                                        <Avatar>D</Avatar>
                                    </ListItemDecorator>
                                    Dashboard
                                </MenuItem>
                                <MenuItem orientation="vertical" onClick={handleReservations}>
                                    <ListItemDecorator>
                                        <Avatar>R</Avatar>
                                    </ListItemDecorator>
                                    Reservations
                                </MenuItem>
                                <MenuItem orientation="vertical" onClick={handlejourneys}>
                                    <ListItemDecorator>
                                        <Avatar>T</Avatar>
                                    </ListItemDecorator>
                                    Trajets
                                </MenuItem>
                                <MenuItem orientation="vertical" onClick={handleRequestReserv}>
                                    <ListItemDecorator>
                                        <Avatar>D</Avatar>
                                    </ListItemDecorator>
                                    Mes demandes
                                </MenuItem>
                                <MenuItem orientation="vertical" onClick={handleReviewPage}>
                                    <ListItemDecorator>
                                        <Avatar>R</Avatar>
                                    </ListItemDecorator>
                                    Review
                                </MenuItem>
                                <MenuItem orientation="vertical" onClick={handleProfil}>
                                    <ListItemDecorator>
                                        <Avatar>P</Avatar>
                                    </ListItemDecorator>
                                    Profil
                                </MenuItem>
                                <MenuItem orientation="vertical" onClick={handleLoginLogout}>
                                    <ListItemDecorator>
                                        <Avatar>D</Avatar>
                                    </ListItemDecorator>
                                    Déconnexion
                                </MenuItem>
                            </Menu>
                        </Dropdown>
                    ) : (
                        <Dropdown>
                            <MenuButton
                                slots={{root: IconButton}}
                                slotProps={{root: {variant: 'plain', color: 'neutral'}}}
                                sx={{borderRadius: 40}}
                            >
                                <Apps/>
                            </MenuButton>
                            <Menu
                                variant="soft"
                                color="primary"
                                invertedColors
                                aria-labelledby="apps-menu-demo"
                                sx={{
                                    '--List-padding': '0.5rem',
                                    '--ListItemDecorator-size': '3rem',
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, 100px)',
                                    gridAutoRows: '100px',
                                    gap: 1,
                                }}
                            >
                                <MenuItem orientation="vertical" onClick={handleLogin}>
                                    <ListItemDecorator>
                                        <Avatar>C</Avatar>
                                    </ListItemDecorator>
                                    Connexion
                                </MenuItem>
                                <MenuItem orientation="vertical" onClick={handleSubscribe}>
                                    <ListItemDecorator>
                                        <Avatar>I</Avatar>
                                    </ListItemDecorator>
                                    Inscription
                                </MenuItem>
                            </Menu>
                        </Dropdown>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
