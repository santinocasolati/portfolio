import React, { useRef } from 'react';
import { gsap } from 'gsap';

import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export function NavBar() {
    window.inHome = true;
    const textToSplit = useRef(null);
    const charsShown = [];
    const charsHidden = [];

    const goHomeAnim = () => {
        const target = window.innerWidth > 820 ? '.home-menu' : '.home-menu-mobile';
        const display = window.innerWidth > 820 ? 'flex' : 'block';

        gsap.to(target, {
            opacity: 1, display: display, duration: 0.8, ease: 'power2.out', onStart: () => {
                setTimeout(() => {
                    window.portalSelected = false;

                    if (window.innerWidth > 820) {
                        window.webgl.home.changeLightColor('#062d89');
                    }
                }, 100);
            }
        })
    }

    const goHome = () => {
        if (window.inHome != true) {
            window.webgl.changeScenes('home', goHomeAnim);
        }
    }

    const hoverEnter = () => {
        const tl = gsap.timeline();
        tl.to(charsShown, { y: '-200%', duration: 0.5, stagger: 0.05, ease: 'power2.out' }, 0);
        tl.to(charsHidden, { y: '-200%', duration: 0.5, stagger: 0.05, ease: 'power2.out' }, 0);
    }

    const hoverLeave = () => {
        const tl = gsap.timeline();
        tl.to(charsShown, { y: '0%', duration: 0.5, stagger: 0.05, ease: 'power2.out' }, 0);
        tl.to(charsHidden, { y: '0%', duration: 0.5, stagger: 0.05, ease: 'power2.out' }, 0);
    }

    setTimeout(() => {
        const split = new SplitText(textToSplit.current);

        split.chars.forEach(char => {
            const text = char.innerHTML;
            char.innerHTML = '';

            char.classList.add("char-container")
            const elemShown = document.createElement('div');
            elemShown.classList.add("char-shown");
            elemShown.innerHTML = text;
            char.appendChild(elemShown);
            charsShown.push(elemShown);

            const elemHidden = document.createElement('div');
            elemHidden.classList.add("char-hidden");
            elemHidden.innerHTML = text;
            char.appendChild(elemHidden);
            charsHidden.push(elemHidden);
        });
    }, 500);

    return <>
        <nav>
            <div className="nav-left">
                <div className="sc-text" onClick={goHome} onMouseEnter={hoverEnter} onMouseLeave={hoverLeave} ref={textToSplit}>SANTINO CASOLATI</div>
            </div>

            <div className="nav-right">
                <div className="menu-btn" onClick={goHome}>
                    <div className='bar-up'></div>
                    <div className='bar-up hidden'></div>
                    <div className='bar-down'></div>
                    <div className='bar-down hidden'></div>
                </div>
            </div>
        </nav>
    </>
}