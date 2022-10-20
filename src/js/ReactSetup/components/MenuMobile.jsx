import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export function MenuMobile() {
    let position = 0;
    const wrapper = useRef(null);
    const arrowL = useRef(null);
    const arrowR = useRef(null);
    const colors = ['#890000', '#00890d', '#891800', '#9600e2']

    const nextSlide = () => {
        if (position < 3) {
            position += 1;
            window.webgl.home.changeLightColor(colors[position]);

            if (position == 3) {
                gsap.to(arrowR.current, { opacity: 0.2, duration: 0.2 });
            }

            gsap.to(arrowL.current, { opacity: 1, duration: 0.2 });

            const tl = gsap.timeline();
            tl.to(wrapper.current.children[position - 1].children[0], { opacity: 0, duration: 0.2, ease: 'power2.out' }, 0);
            tl.to(wrapper.current.children[position].children[0], {
                opacity: 0, duration: 0.2, ease: 'power2.out', onComplete: () => {
                    gsap.set(wrapper.current, { x: (-100 * position) + 'vw' });
                }
            }, 0);
            tl.to(wrapper.current.children[position].children[0], { opacity: 1, duration: 0.2, ease: 'power2.out' }, 0.3)
        }
    };

    const prevSlide = () => {
        if (position > 0) {
            position -= 1;
            window.webgl.home.changeLightColor(colors[position]);

            if (position == 0) {
                gsap.to(arrowL.current, { opacity: 0.2, duration: 0.2 });
            }

            gsap.to(arrowR.current, { opacity: 1, duration: 0.2 });

            const tl = gsap.timeline();
            tl.to(wrapper.current.children[position + 1].children[0], { opacity: 0, duration: 0.2, ease: 'power2.out' }, 0);
            tl.to(wrapper.current.children[position].children[0], {
                opacity: 0, duration: 0.2, ease: 'power2.out', onComplete: () => {
                    gsap.set(wrapper.current, { x: (-100 * position) + 'vw' });
                }
            }, 0);
            tl.to(wrapper.current.children[position].children[0], { opacity: 1, duration: 0.2, ease: 'power2.out' }, 0.3)

        }
    };

    return <>
        <div className="home-menu-mobile">
            <div className="menu-arrows">
                <FontAwesomeIcon icon={faArrowLeft} inverse size='xl' onClick={prevSlide} ref={arrowL} />
                <FontAwesomeIcon icon={faArrowRight} inverse size='xl' onClick={nextSlide} ref={arrowR} />
            </div>

            <div className="menu-wrapper" ref={wrapper}>
                <div className="menu-mobile-slide">
                    <span>WHO I AM</span>

                    <NavLink className="menu-mobile-link">
                        <div className="enter-btn main-btn">
                            ENTER
                        </div>
                    </NavLink>
                </div>

                <div className="menu-mobile-slide">
                    <span>TECHNOLOGIES</span>

                    <NavLink className="menu-mobile-link" to="/technologies">
                        <div className="enter-btn main-btn">
                            ENTER
                        </div>
                    </NavLink>
                </div>

                <div className="menu-mobile-slide">
                    <span>WORKS</span>

                    <NavLink className="menu-mobile-link">
                        <div className="enter-btn main-btn">
                            ENTER
                        </div>
                    </NavLink>
                </div>

                <div className="menu-mobile-slide">
                    <span>PROJECTS</span>

                    <NavLink className="menu-mobile-link">
                        <div className="enter-btn main-btn">
                            ENTER
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>
    </>;
}