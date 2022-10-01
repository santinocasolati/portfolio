import React from "react";

// Components
import { AnimatedRoutes } from "./components/AnimatedRoutes";
import { NavBar } from "./components/NavBar";
import { Intro } from "./components/Intro";

export function App() {

    return (
        <>
            <NavBar />
            <Intro />
            <AnimatedRoutes />
        </>
    )
}