'use strict';

import './set-token-modal.css'
import setTokenModalHtml from './set-token-modal.html';
import {elem} from "../../../index";
import {createConnection, getAuthData, pushAuthData} from "../../loader";

let tryInputData = (url, token) => {
    url = `wss://${url}/api/websocket`;
    elem.tokenError = document.querySelector('#token-error');
    elem.modalToken = document.querySelector('#set-token-modal');

    createConnection(url, token).then(() => {
        pushAuthData(url, token);
        elem.modalToken.remove();
    })
        .catch((error) => {
            console.error(`WebSocket error: ${JSON.stringify(error)}`);
            elem.tokenError.style.color = 'red';
        });

}



export const callModal = () => {
    if (!localStorage.getItem('HAAuth')) {
        const modal = document.createElement('div');
        modal.id = 'set-token-modal';
        modal.innerHTML = setTokenModalHtml;
        document.body.appendChild(modal);

        elem.linkInput = document.querySelector('#link')
        elem.tokenInput = document.querySelector('#token')
        document.querySelector('#btn-set-token').addEventListener('click', () => {
            tryInputData(elem.linkInput.value, elem.tokenInput.value);
        });
    }
    else {
        let auth = getAuthData();
        createConnection(auth.url, auth.token).then(() => {})
    }
}