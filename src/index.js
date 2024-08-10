'use strict';

import "./style.css";
import {render} from "./components/render";
import {addCardsEvents} from "./components/bottom-panel/bottom-panel";
import {callModal} from "./components/set-token-modal/set-token-modal";

'use strict';


export const elem = {};

const domMapping = () => {

}


const appendEventListeners = () => {
    addCardsEvents();
}

const init = () => {
    domMapping();
    callModal();
    // createConnection();

    render();
    appendEventListeners();

}



document.addEventListener("DOMContentLoaded", () => {
    init();
});