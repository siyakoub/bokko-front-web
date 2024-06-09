import React, { useEffect, useRef } from 'react';
import Navbar from "../../component/navBar/NavBar";
import SearchBar from "../../component/searchBar/SearchBar";
import Footer from "../../component/footer/Footer";
import HeroLeft01 from "./component/hero1/HeroLeft1";
import HeroLeft02 from "./component/hero2/HeroLeft2";
import HeroLeft03 from "./component/hero3/HeroLeft3";
import {CssVarsProvider} from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import ColorSchemeToggle from "./component/ColorSchemeToggle/ColorSchemeToggle";

const HomePage: React.FC = () => {
    const sectionRef = useRef(null);
    const heroRef = useRef(null);

    useEffect(() => {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-downup');
                }
            });
        }, { threshold: 0.1 });

        const heroSection = heroRef.current;
        if (heroSection) {
            heroObserver.observe(heroSection);
        }

        return () => {
            if (heroSection) {
                heroObserver.unobserve(heroSection);
            }
        };
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, { threshold: 0.1 });

        const section = sectionRef.current;
        if (section) {
            observer.observe(section);
        }

        return () => {
            if (section) {
                observer.unobserve(section);
            }
        };
    }, []);

    return (
        <>
            <Navbar/>
            <div className="fadeInUpAnimation" ref={sectionRef}>
                <div className="app-header"></div>
                <div>
                    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
                        <CssBaseline />
                        <ColorSchemeToggle />
                        <HeroLeft01/>
                        <div className="con fadeInUpAnimation" ref={heroRef}>
                            <HeroLeft02/>
                        </div>
                        <HeroLeft03/>
                    </CssVarsProvider>
                </div>
            </div>
            <br/><br/><br/>
            <div className="footer-container">
                <Footer/>
            </div>
        </>
    );
}

export default HomePage;
