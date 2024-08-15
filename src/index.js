'use strict';

import "./style.css";
import {render} from "./components/render";
import {addCardsEvents} from "./components/bottom-panel/bottom-panel";
import {callModal} from "./components/modals/set-token-modal/set-token-modal";

'use strict';


export const elem = {};

const domMapping = () => {

}


const appendEventListeners = () => {

}

const init = async () => {
    domMapping();
    await callModal();
    // createConnection();

    await render();
    appendEventListeners();

}



document.addEventListener("DOMContentLoaded", () => {
    init();
});