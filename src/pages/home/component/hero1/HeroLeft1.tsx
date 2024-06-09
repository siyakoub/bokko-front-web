/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import TwoSidedLayout from './twoSidedLayout/TwoSidedLayout';
import {useNavigate} from "react-router-dom";

export default function HeroLeft01() {

    const navigation = useNavigate();

    const handleRegister = () => {
        navigation("/register")
    };

    return (
        <TwoSidedLayout>
            <Typography color="primary" fontSize="lg" fontWeight="lg">
                Partagez plus que votre trajet
            </Typography>
            <Typography
                level="h1"
                fontWeight="xl"
                fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
            >
                Découvrez une nouvelle manière de voyager
            </Typography>
            <Typography fontSize="lg" textColor="text.secondary" lineHeight="lg">
                Rejoignez notre communauté de covoiturage et explorez une façon plus économique, écologique et conviviale de vous déplacer. Que vous soyez conducteur ou passager, chaque trajet est une occasion de faire des rencontres et de partager bien plus qu'un simple trajet.
            </Typography>
            <Button size="lg" onClick={handleRegister} endDecorator={<ArrowForward fontSize="large" />}>
                Commencez votre voyage
            </Button>
            <Typography>
                Déjà membre ? <Link href={"/login"} fontWeight="lg">Connectez-vous</Link>
            </Typography>
            <Typography
                level="body-xs"
                sx={{
                    position: 'absolute',
                    top: '2rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                }}
            >
            </Typography>
        </TwoSidedLayout>
    );
}
