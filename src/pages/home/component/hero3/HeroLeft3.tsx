/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import TwoSidedLayout from './twoSidedLayout/TwoSidedLayout';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Card from "@mui/joy/Card";

export default function HeroLeft03() {
    return (
        <TwoSidedLayout>
            <Typography
                level="h1"
                fontWeight="xl"
                fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
            >
                Voyagez malin avec BokYon Mobile
            </Typography>
            <Typography fontSize="lg" textColor="text.secondary" lineHeight="lg">
                Découvrez comment notre application simplifie chaque étape de votre covoiturage. Grâce à BokYon, connectez-vous instantanément avec des conducteurs et des passagers de votre région, gérez vos trajets facilement et voyagez de manière plus économique et écologique.
            </Typography>
            <Card
                variant="outlined"
                color="neutral"
                orientation="horizontal"
                sx={{ gap: 2, my: 1, textAlign: 'left' }}
            >
                <AutoAwesomeIcon color="success" fontSize="large"/>
                <div>
                    <Typography fontSize="xl" fontWeight="lg" sx={{ mb: 1 }}>
                        La nouvelle version sera bientôt disponible !
                    </Typography>
                </div>
            </Card>
            <Button size="lg">Téléchargez l'App</Button>
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
