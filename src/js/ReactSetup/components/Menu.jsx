import React, { useRef } from 'react';
import { gsap } from 'gsap';

export function Menu() {
    window.portalSelected = false;
    const ref = useRef(null);
    const selector = useRef(null);
    let texts = [];

    setTimeout(() => {
        texts = [...document.querySelectorAll('.text-container')];
        console.log(texts);
    }, 500);

    const onHover = (color, event) => {
        if (window.portalSelected == false) {
            window.webgl.home.changeLightColor(color);

            texts.forEach(tc => {
                tc.children[0].classList.remove("active");
            });

            event.target.classList.add("active");

            const y = texts.indexOf(event.target.parentElement) * 4.6;

            gsap.to(selector.current, { y: y + 'rem', opacity: 1, duration: 0.3, ease: 'power2.out' });
        }
    };

    const goTo = (site) => {
        window.portalSelected = true;

        gsap.to(ref.current, {
            opacity: 0, display: 'none', duration: 0.8, ease: 'power2.out', onComplete: () => {
                window.webgl.changeScenes(site);
            }
        });
    }

    return <>
        <div className="home-menu" ref={ref}>
            <div className="menu-content">
                <div className="selector" ref={selector}><div className="selector-line"></div></div>

                <div className="text-container"><span onMouseEnter={(e) => onHover('#890000', e)} onClick={() => { goTo('other') }}>WHO I AM</span></div>
                <div className="text-container"><span onMouseEnter={(e) => onHover('#00890d', e)} onClick={() => { goTo('other') }}>TECHNOLOGIES</span></div>
                <div className="text-container"><span onMouseEnter={(e) => onHover('#891800', e)} onClick={() => { goTo('other') }}>WORKS</span></div>
                <div className="text-container"><span onMouseEnter={(e) => onHover('#9600e2', e)} onClick={() => { goTo('other') }}>PROJECTS</span></div>
            </div>
        </div>
    </>;
}
