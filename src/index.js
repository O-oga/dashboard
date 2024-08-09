'use strict';

import "./style.css";
import {createConnection} from "./components/loader";
import {render} from "./components/render";
import {addCardsEvents} from "./components/bottom-panel/bottom-panel";

'use strict';


export const elem = {};

const domMapping = () => {

}


const appendEventListeners = () => {
    addCardsEvents();
}

const init = () => {
    domMapping();

    createConnection();

    render();
    appendEventListeners();

}



document.addEventListener("DOMContentLoaded", () => {
    init();
});