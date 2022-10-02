import React from 'react';
import { gsap } from 'gsap';

export function NavBar() {
    window.inHome = true;

    const goHomeAnim = () => {
        gsap.to('.home-menu', {
            opacity: 1, display: 'flex', duration: 0.8, onStart: () => {
                window.portalSelected = false;
                window.webgl.home.changeLightColor('#062d89');
            }
        })
    }

    const goHome = () => {
        if (window.inHome != true) {
            window.webgl.changeScenes('home', goHomeAnim);
        }
    }

    return <>
        <nav>
            <div className="nav-left">
                <div className="sc-text">SANTINO CASOLATI</div>
            </div>

            <div className="nav-right">
                <div className="menu-btn" onClick={goHome}>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </nav>
    </>
}