import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export function MenuMobile() {
    let position = 0;
    const ref = useRef(null);
    const colors = ['#890000', '#00890d', '#891800', '#9600e2']

    const nextSlide = () => {
        if (position < 3) {
            position += 1;
            window.webgl.home.changeLightColor(colors[position]);
            gsap.to(ref.current, { x: (-100 * position) + 'vw', duration: 0.5 })
        }
    };

    const prevSlide = () => {
        if (position > 0) {
            position -= 1;
            window.webgl.home.changeLightColor(colors[position]);
            gsap.to(ref.current, { x: (-100 * position) + 'vw', duration: 0.5 })
        }
    };

    return <>
        <div className="home-menu-mobile">
            <div className="menu-arrows">
                <FontAwesomeIcon icon={faArrowLeft} inverse size='xl' onClick={prevSlide} />
                <FontAwesomeIcon icon={faArrowRight} inverse size='xl' onClick={nextSlide} />
            </div>

            <div className="menu-wrapper" ref={ref}>
                <div className="menu-mobile-slide">
                    <span>WHO I AM</span>

                    <div className="enter-btn">
                        ENTER
                    </div>
                </div>

                <div className="menu-mobile-slide">
                    <span>TECHNOLOGIES</span>

                    <div className="enter-btn">
                        ENTER
                    </div>
                </div>

                <div className="menu-mobile-slide">
                    <span>WORKS</span>

                    <div className="enter-btn">
                        ENTER
                    </div>
                </div>

                <div className="menu-mobile-slide">
                    <span>PROJECTS</span>

                    <div className="enter-btn">
                        ENTER
                    </div>
                </div>
            </div>
        </div>
    </>;
}