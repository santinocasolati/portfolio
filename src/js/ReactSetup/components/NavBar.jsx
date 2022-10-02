import React from 'react';
import { gsap } from 'gsap';

export function NavBar() {
    window.inHome = true;

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

    return <>
        <nav>
            <div className="nav-left">
                <div className="sc-text" onClick={goHome}>SANTINO CASOLATI</div>
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