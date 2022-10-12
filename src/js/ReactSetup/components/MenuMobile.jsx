import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export function MenuMobile() {
    let position = 0;
    const menu = useRef(null);
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

    const goTo = (site) => {
        window.portalSelected = true;

        gsap.to(menu.current, {
            opacity: 0, display: 'none', duration: 0.8, ease: 'power2.out', onComplete: () => {
                window.webgl.changeScenes(site);
            }
        });
    }

    return <>
        <div className="home-menu-mobile" ref={menu}>
            <div className="menu-arrows">
                <FontAwesomeIcon icon={faArrowLeft} inverse size='xl' onClick={prevSlide} ref={arrowL} />
                <FontAwesomeIcon icon={faArrowRight} inverse size='xl' onClick={nextSlide} ref={arrowR} />
            </div>

            <div className="menu-wrapper" ref={wrapper}>
                <div className="menu-mobile-slide">
                    <span>WHO I AM</span>

                    <div className="enter-btn main-btn" onClick={() => { goTo('other') }}>
                        ENTER
                    </div>
                </div>

                <div className="menu-mobile-slide">
                    <span>TECHNOLOGIES</span>

                    <div className="enter-btn main-btn" onClick={() => { goTo('other') }}>
                        ENTER
                    </div>
                </div>

                <div className="menu-mobile-slide">
                    <span>WORKS</span>

                    <div className="enter-btn main-btn" onClick={() => { goTo('other') }}>
                        ENTER
                    </div>
                </div>

                <div className="menu-mobile-slide">
                    <span>PROJECTS</span>

                    <div className="enter-btn main-btn" onClick={() => { goTo('other') }}>
                        ENTER
                    </div>
                </div>
            </div>
        </div>
    </>;
}