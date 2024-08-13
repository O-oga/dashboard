'use strict';

import bottomPanelHtml from './bottom-panel.html';
import addCardHTML from '../add-card-modal/add-card.html';
import './bottom-panel.css';
import {elem} from "../../index";
import {appendCloseModalEvent} from "../add-card-modal/add-card";
import {renderBottomCards} from "../bottom-panel-card/bottom-panel-card";


export const setActiveSpace = (id) => {
    let spaceId = `#space${id}`
    let cardId = `#card${id}`
    elem.bottomPanel.querySelector('.active-card')?.classList.remove('active-card');
    elem.bottomPanel.querySelector(cardId).classList.add('active-card');

}

export const renderBottomPanel = () => {
    elem.bottomPanel = document.querySelector('#bottom-panel-component')
    elem.bottomPanel.innerHTML = bottomPanelHtml;
    elem.addBtn = document.querySelector('#add')
    elem.addBtn.addEventListener('click', openModal);
    renderBottomCards();

}

const openModal = () => {
    const modal = document.createElement('div');
    modal.id = 'modal-window';
    modal.innerHTML = addCardHTML;
    document.body.appendChild(modal);

    appendCloseModalEvent();

}


const setBottomPanelData = () => {
    let data = {}
}

