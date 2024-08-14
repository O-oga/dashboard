'use strict';

import {renderBottomPanel, setActiveSpace} from "./bottom-panel/bottom-panel";

const renderBackground = () => {

    // let getRandomColor = () => {
    //     const hues = [0, 60, 120, 180, 240, 300]; // основные оттенки
    //     const h = hues[Math.floor(Math.random() * hues.length)];
    //     const s = 50; // полная насыщенность
    //     const l = Math.floor(Math.random() * 20) + 50; // яркость 50-70%
    //     return `hsl(${h}, ${s}%, ${l}%)`;
    // }

    let getRandomColor = () => {
        const h = Math.floor(Math.random() * 360);
        const rgb = hslToRgb(h, 100, 50);
        return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.7)`;
    }

    function hslToRgb(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;
        let r, g, b;
        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
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
    setActiveSpace()
}