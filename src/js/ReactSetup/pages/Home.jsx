import React from 'react';

import { Intro } from "../components/Intro";
import { Menu } from '../components/Menu';
import { MenuMobile } from '../components/MenuMobile';

export function Home() {
    return <>
        <Intro />

        <main className="home">
            <Menu />
            <MenuMobile />
        </main>
    </>;
}