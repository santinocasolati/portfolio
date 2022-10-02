import React from 'react';

export function Menu() {
    const onHover = (color) => {
        window.webgl.home.changeLightColor(color);
    };

    const onLeave = () => {
        window.webgl.home.changeLightColor('#062d89');
    };

    return <>
        <div className="home-menu">
            <div className="text-container"><span onMouseEnter={() => onHover('#890000')} onMouseLeave={onLeave}>WHO I AM</span></div>
            <div className="text-container"><span onMouseEnter={() => onHover('#00890d')} onMouseLeave={onLeave}>TECHNOLOGIES</span></div>
            <div className="text-container"><span onMouseEnter={() => onHover('#891800')} onMouseLeave={onLeave}>WORKS</span></div>
            <div className="text-container"><span onMouseEnter={() => onHover('#9600e2')} onMouseLeave={onLeave}>PROJECTS</span></div>
        </div>
    </>;
}
