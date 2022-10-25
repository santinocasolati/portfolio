import React, { useState } from 'react';

export function Technologies() {
    const [touchPos, setTouchPos] = useState(0);

    const handleWheel = (e) => {
        if (e.nativeEvent.wheelDelta > 0) {
            window.webgl.techs.scrollUpAnim();
        } else {
            window.webgl.techs.scrollDownAnim();
        }
    };

    const handleTouchStart = (e) => {
        setTouchPos(e.touches[0].clientY);
    };

    const handleTouchMove = (e) => {

        if (touchPos - e.touches[0].clientY > 20) {
            window.webgl.techs.scrollDownAnim();
        } else if (touchPos - e.touches[0].clientY < -20) {
            window.webgl.techs.scrollUpAnim();
        }

        setTouchPos(e.touches[0].clientY);
    };

    return <>
        <main className="technologies" onWheel={handleWheel} onTouchMove={handleTouchMove} onTouchStart={handleTouchStart}>
        </main>
    </>;
}