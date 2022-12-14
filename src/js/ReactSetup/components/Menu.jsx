import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { gsap } from 'gsap';

export function Menu() {
    window.portalSelected = false;
    const selector = useRef(null);
    let texts = [];

    setTimeout(() => {
        texts = [...document.querySelectorAll('.text-container')];
    }, 500);

    const onHover = (color, event) => {
        if (window.portalSelected == false) {
            window.webgl.home.changeRecordedText(color);

            texts.forEach(tc => {
                tc.children[0].classList.remove("active");
            });

            event.target.classList.add("active");

            const y = texts.indexOf(event.target.parentElement) * 4.6;

            gsap.to(selector.current, { y: y + 'rem', opacity: 1, duration: 0.3, ease: 'power2.out' });
        }
    };

    return <>
        <div className="home-menu">
            <div className="menu-content">
                <div className="selector" ref={selector}><div className="selector-line"></div></div>

                <NavLink className="menu-link">
                    <div className="text-container"><span onMouseEnter={(e) => onHover('red', e)}>WHO I AM</span></div>
                </NavLink>

                <NavLink className="menu-link" to="/technologies">
                    <div className="text-container"><span onMouseEnter={(e) => onHover('green', e)}>TECHNOLOGIES</span></div>
                </NavLink>

                <NavLink className="menu-link">
                    <div className="text-container"><span onMouseEnter={(e) => onHover('orange', e)}>WORKS</span></div>
                </NavLink>

                <NavLink className="menu-link">
                    <div className="text-container"><span onMouseEnter={(e) => onHover('purple', e)}>PROJECTS</span></div>
                </NavLink>
            </div>
        </div>
    </>;
}
