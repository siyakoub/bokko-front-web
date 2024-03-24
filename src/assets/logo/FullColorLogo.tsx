import React from "react";
import logo from "./fullColorLogo.png";

const FullColorLogo: React.FC = () => {
    const imageStyle = {
        width: "190px", // Largeur souhaitée
        height: "60px",  // Hauteur automatique pour maintenir les proportions
    };

    return (
        <>
            <img src={logo} alt="Logo" style={imageStyle} />
        </>
    );
};

export default FullColorLogo;
