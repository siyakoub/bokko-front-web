import React from "react";
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

const CreateTrajetPage: React.FC = () => {

    return (
        <>
            <NavBar/>
            <div>
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
                                    <FormLabel>Marque</FormLabel>
                                    <FormControl
                                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                    >
                                        <Input size="sm" placeholder="" />
                                    </FormControl>
                                    <FormLabel>Modèle</FormLabel>
                                    <FormControl
                                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                    >
                                        <Input size="sm" placeholder="" />
                                    </FormControl>
                                    <FormLabel>Couleur</FormLabel>
                                    <FormControl
                                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                    >
                                        <Input size="sm" placeholder="" />
                                    </FormControl>
                                    <FormLabel>Immatriculation</FormLabel>
                                    <FormControl
                                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                    >
                                        <Input size="sm" placeholder="" />
                                    </FormControl>
                                    <FormLabel>Année</FormLabel>
                                    <FormControl
                                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                    >
                                        <Input size="sm" placeholder="" />
                                    </FormControl>
                                </Stack>
                            </Stack>
                            <CardOverflow sx={{borderTop: '1px solid', borderColor: 'divider'}}>
                                <CardActions sx={{alignSelf: 'flex-end', pt: 2}}>
                                    <Button size="sm" variant="outlined" color="neutral">
                                        Cancel
                                    </Button>
                                    <Button size="sm" variant="solid">
                                        Save
                                    </Button>
                                </CardActions>
                            </CardOverflow>
                        </Card>
                    </Stack>
                </Box>
            </div>
            <div className="footer-container">
                <Footer/>
            </div>
        </>
    );
}

export default CreateTrajetPage;
