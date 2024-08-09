'use strict';

import bottomPanelHtml from './bottom-panel.html';
import addCardHTML from '../add-card-modal/add-card.html';
import './bottom-panel.css';
import {elem} from "../../index";
import {appendCloseModalEvent} from "../add-card-modal/add-card";


export const renderBottomPanel = () => {
    elem.bottomPanel = document.querySelector('#bottom-panel-component')
    elem.bottomPanel.innerHTML = bottomPanelHtml;
}

const openModal = () => {
    const modal = document.createElement('div');
    modal.id = 'add-card-modal';
    modal.innerHTML = addCardHTML;
    document.body.appendChild(modal);

    appendCloseModalEvent();

}

export const addCardsEvents = () => {
    elem.addBtn = document.querySelector('#add')
    elem.addBtn.addEventListener('click', openModal);
}


const getBottomPanelData = () => {

}

const setBottomPanelData = () => {
    let data = {}
}

