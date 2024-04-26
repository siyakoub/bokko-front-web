import React, {useEffect, useState} from 'react';
import {Avis} from "../../interface/AvisInterface/Avis";
import {useNavigate} from "react-router-dom";
import {getAllAvisByUser} from "../../service/AvisService";
import Navbar from "../../component/navBar/NavBar";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import {
    Fab,
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
import {TrashIcon} from "evergreen-ui";
import {blue} from "@mui/material/colors";
import {CircularProgress, List, ListItem, ListItemContent, ListItemDecorator} from "@mui/joy";
import Avatar from "@mui/joy/Avatar";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: blue["800"],
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


const ReviewPage: React.FC = () => {
    const [avis, setAvis] = useState<Avis[]>();
    const [hasAvis, setHasAvis] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const userInfoString = localStorage.getItem('userInfo');
    const userInfo = userInfoString ? JSON.parse(userInfoString): null;
    const tokenIdentif = localStorage.getItem('token');

    useEffect(() => {
        const fetchAvis = async () => {
            if (!tokenIdentif) {
                navigate('/');
                return;
            }
            try {
                const response = await getAllAvisByUser(String(tokenIdentif), userInfo.email);
                if (response && response.length > 0) {
                    setHasAvis(true);
                    setAvis(response);
                } else {
                    setHasAvis(false);
                    setError("Vous n'avez pas encore d'avis...");
                }
            } catch (e) {
                console.log(e);
                setError("Une erreur est survenue lors de la récupération des avis...");
                setHasAvis(false);
            } finally {
                setLoading(false);
            }
        };
        fetchAvis();
    });

    if (loading) {
        return (
            <div className="spinner-container">
                <CircularProgress variant="outlined"/>
            </div>
        );
    }

    return(
        <>
            <Navbar/>
            <Box className="fadeInUpAnimation" sx={{flex: 1, width: '100%'}}>
                <Stack
                    spacing={4}
                    sx={{
                        display: 'flex',
                        maxWidth: '1000px',
                        mx: 'auto',
                        px: {xs: 2, md: 6},
                        py: {xs: 2, md: 3},
                    }}
                >
                    <Card>
                        <Box sx={{mb: 1}}>
                            <Typography level="h2">Mes Reservations</Typography>
                        </Box>
                        <Divider/>
                        <Stack spacing={2} sx={{my: 1}}>
                            {error ? (
                                <p>{error}</p>
                            ): (
                                <Box sx={{ width: 320 }}>
                                    <Typography
                                        id="ellipsis-list-demo"
                                        level="body-xs"
                                        textTransform="uppercase"
                                        sx={{ letterSpacing: '0.15rem' }}
                                    >
                                        Inbox
                                    </Typography>
                                    <List
                                        aria-labelledby="ellipsis-list-demo"
                                        sx={{ '--ListItemDecorator-size': '56px' }}
                                    >
                                        <ListItem>
                                            <ListItemDecorator>
                                                <Avatar src="/static/images/avatar/1.jpg" />
                                            </ListItemDecorator>
                                            <ListItemContent>
                                                <Typography level="title-sm">Brunch this weekend?</Typography>
                                                <Typography level="body-sm" noWrap>
                                                    I&apos;ll be in your neighborhood doing errands this Tuesday.
                                                </Typography>
                                            </ListItemContent>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemDecorator>
                                                <Avatar src="/static/images/avatar/2.jpg" />
                                            </ListItemDecorator>
                                            <ListItemContent>
                                                <Typography level="title-sm">Summer BBQ</Typography>
                                                <Typography level="body-sm" noWrap>
                                                    Wish I could come, but I&apos;m out of town this Friday.
                                                </Typography>
                                            </ListItemContent>
                                        </ListItem>
                                    </List>
                                </Box>
                            )}
                        </Stack>
                    </Card>
                </Stack>
            </Box>
        </>
    );
};

export default ReviewPage;
