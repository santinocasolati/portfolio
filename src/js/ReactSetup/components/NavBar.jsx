import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { gsap } from 'gsap';

import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export function NavBar() {
    const textToSplit = useRef(null);
    const charsShown = [];
    const charsHidden = [];

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
                <NavLink to="/">
                    <div className="sc-text" onMouseEnter={hoverEnter} onMouseLeave={hoverLeave} ref={textToSplit}>SANTINO CASOLATI</div>
                </NavLink>
            </div>

            <div className="nav-right">
                <NavLink to="/">
                    <div className="menu-btn">
                        <div className='bar-up'></div>
                        <div className='bar-up hidden'></div>
                        <div className='bar-down'></div>
                        <div className='bar-down hidden'></div>
                    </div>
                </NavLink>
            </div>
        </nav>
    </>
}