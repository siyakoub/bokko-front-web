/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import AvatarGroup from '@mui/joy/AvatarGroup';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import TwoSidedLayout from './twoSidedLayout/TwoSidedLayout';
import {useNavigate} from "react-router-dom";

export default function HeroLeft02() {

    const navigation = useNavigate();

    const handleRegister = () => {
        navigation("/register")
    };

    return (
        <TwoSidedLayout>
            <Typography color="primary" fontSize="lg" fontWeight="lg">
                Partagez plus qu'un trajet
            </Typography>
            <Typography
                level="h1"
                fontWeight="xl"
                fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
            >
                Transformez vos déplacements quotidiens avec BokYon
            </Typography>
            <Typography fontSize="lg" textColor="text.secondary" lineHeight="lg">
                Rejoignez notre communauté et découvrez une manière plus conviviale et économique de voyager. Notre application facilite la mise en relation entre conducteurs et passagers pour des trajets partagés, réduisant ainsi les coûts de transport et l'empreinte écologique. Parfait pour vos déplacements réguliers ou occasionnels.
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    my: 2,
                    '& > *': { flex: 'auto' },
                }}
            >
                <Button size="lg" onClick={handleRegister} endDecorator={<ArrowForward fontSize="large" />}>
                    Commencez maintenant
                </Button>
            </Box>
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
