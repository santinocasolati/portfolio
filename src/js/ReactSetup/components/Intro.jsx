import React from 'react';
import { gsap } from 'gsap';

export function Intro() {
    const exploreClick = () => {
        const tl = gsap.timeline();

        tl.to('.introduction', { opacity: 0, duration: 0.8, onComplete: () => gsap.set('.introduction', { display: 'none' }) }, 0);
        tl.to('.home-menu', {
            opacity: 1, duration: 0.8, onStart: () => {
                document.querySelector('.home').style.pointerEvents = 'all';

                if (window.innerWidth < 820) {
                    setTimeout(() => {
                        window.webgl.home.changeLightColor('#890000');
                    }, 400);
                }
            }
        }, 0.8);
        tl.to('.home-menu-mobile', { opacity: 1, duration: 0.8 }, 0.8);
    };

    return <>
        <div className="introduction">

            <div className="intro-content">
                <div className="intro-text">
                    <div className='intro-title'>MORE THAN A WEBSITE</div>
                    <div className='intro-subtitle'>Using modern technologies, telling a story on the web is now possible</div>

                    <div className="intro-btn main-btn" onClick={exploreClick}>
                        EXPLORE
                    </div>
                </div>
            </div>

        </div>
    </>
}