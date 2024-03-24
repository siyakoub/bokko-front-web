import React from "react";
import logo from "./logo_naked.png";

const LogoNaked: React.FC = () => {
    const imageStyle = {
        width: "60px", // Largeur souhaitée
        height: "60px",  // Hauteur automatique pour maintenir les proportions
    };

    return (
        <>
            <img src={logo} alt="Logo" style={imageStyle} />
    </>
);
};

export default LogoNaked;
