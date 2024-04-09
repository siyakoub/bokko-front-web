import React from 'react';
import './Footer.css'; // Assurez-vous d'importer le fichier CSS correctement

const Footer: React.FC = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                {/* Contenu du footer ici, par exemple: */}
                <p>© 2024 Bokko. Tous droits réservés.</p>
            </div>
        </footer>
    );
};

export default Footer;
