import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { gsap } from "gsap";

// Pages
import { Home } from "../pages/Home";
import { Technologies } from "../pages/Technologies";

export function AnimatedRoutes() {
    const location = useLocation();

    const routes = [
        { path: "/", name: "Home", Component: Home, scene: "home" },
        { path: "/technologies", name: "Technologies", Component: Technologies, scene: "techs" }
    ];

    const enterAnim = (e) => {
        const exitTarget = document.querySelectorAll('.page')[1];
        const enterTarget = e;

        const tl = gsap.timeline();
        tl.to(exitTarget, {
            opacity: 0, display: 'none', duration: 0.8, onComplete: () => {
                window.webgl.changeScenes(enterTarget.dataset.scene);
            }
        }, 0);
        tl.to(enterTarget, {
            opacity: 1, display: 'block', duration: 0.8, onStart: () => {
                if (enterTarget.dataset.scene === 'home') {
                    const target = window.innerWidth > 820 ? '.home-menu' : '.home-menu-mobile';

                    if (target === '.home-menu-mobile') {
                        window.webgl.home.changeLightColor("#890000");
                    } else {
                        window.webgl.home.changeLightColor("#062d89");
                    }
                }
            }
        }, 2);

        return tl;
    }

    return (
        <TransitionGroup component={null}>
            <CSSTransition
                key={location.pathname}
                timeout={2000}
                onEnter={enterAnim}
            >

                <Routes location={location} key={location.pathname}>
                    {
                        routes.map(({ path, Component, scene }) => {
                            return (
                                <Route key={path} exact path={path} element={
                                    <div className="page" data-scene={scene}>
                                        <Component />
                                    </div>
                                } />
                            )
                        })
                    }
                </Routes>

            </CSSTransition>
        </TransitionGroup>
    )
}