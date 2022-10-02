import React from 'react';
import { gsap } from 'gsap';

export function Menu() {
    window.portalSelected = false;

    const onHover = (color) => {
        if (window.portalSelected == false) {
            window.webgl.home.changeLightColor(color);
        }
    };

    const onLeave = () => {
        if (window.portalSelected == false) {
            window.webgl.home.changeLightColor('#062d89');
        }
    };

    const goTo = (site) => {
        window.portalSelected = true;

        gsap.to('.home-menu', {
            opacity: 0, display: 'none', duration: 0.8, onComplete: () => {
                window.webgl.changeScenes(site);
            }
        });
    }

    return <>
        <div className="home-menu">
            <div className="text-container"><span onMouseEnter={() => onHover('#890000')} onMouseLeave={onLeave} onClick={() => { goTo('other') }}>WHO I AM</span></div>
            <div className="text-container"><span onMouseEnter={() => onHover('#00890d')} onMouseLeave={onLeave} onClick={() => { goTo('other') }}>TECHNOLOGIES</span></div>
            <div className="text-container"><span onMouseEnter={() => onHover('#891800')} onMouseLeave={onLeave} onClick={() => { goTo('other') }}>WORKS</span></div>
            <div className="text-container"><span onMouseEnter={() => onHover('#9600e2')} onMouseLeave={onLeave} onClick={() => { goTo('other') }}>PROJECTS</span></div>
        </div>
    </>;
}
