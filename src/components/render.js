'use strict';

import {renderBottomPanel} from "./bottom-panel/bottom-panel";

const renderBackground = () => {
    function getRandomColor() {
        const r = Math.floor(Math.random() * 200);
        const g = Math.floor(Math.random() * 200);
        const b = Math.floor(Math.random() * 200);
        return `rgb(${r},${g},${b})`;
    }

    const colors = [
        getRandomColor(),
        getRandomColor(),
        getRandomColor(),
        getRandomColor()
    ];

    document.querySelector('body').style.background = `
        linear-gradient(45deg,
            ${colors[0]} 0% 25%,
            ${colors[1]} 25% 50%,
            ${colors[2]} 50% 75%,
            ${colors[3]} 75% 100%)
    `;
}

export const render = () => {
    renderBackground();
    renderBottomPanel();
}