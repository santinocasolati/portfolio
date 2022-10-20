import React from 'react';

export function Technologies() {
    const handleWheel = (e) => {
        if (e.nativeEvent.wheelDelta > 0) {
            window.webgl.techs.scrollUpAnim();
        } else {
            window.webgl.techs.scrollDownAnim();
        }
    };

    return <>
        <main className="technologies" onWheel={handleWheel}>
        </main>
    </>;
}