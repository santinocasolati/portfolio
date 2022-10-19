import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from "react-transition-group";

// Pages
import { Home } from "../pages/Home";
import { Technologies } from "../pages/Technologies";

export function AnimatedRoutes() {
    const location = useLocation();

    const routes = [
        { path: "/", name: "Home", Component: Home },
        { path: "/technologies", name: "Technologies", Component: Technologies }
    ];

    return (
        <TransitionGroup component={null}>
            <CSSTransition
                key={location.pathname}
                timeout={1000}
            >

                <Routes location={location} key={location.pathname}>
                    {
                        routes.map(({ path, Component }) => {
                            return (
                                <Route key={path} exact path={path} element={
                                    <div className="page">
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