'use strict';

import bottomPanelHtml from './bottom-panel.html';
import addCardHTML from '../add-card-modal/add-card.html';
import './bottom-panel.css';
import {elem} from "../../index";
import {appendCloseModalEvent} from "../add-card-modal/add-card";
import {renderBottomCards} from "../bottom-panel-card/bottom-panel-card";
import {renderSpace} from "../space-board/space-board";

export const setActiveSpace = (id = 0) => {
    const cardId = `#card${id}`;

    const allData = JSON.parse(localStorage.getItem('board-data'));

    if (!allData) {
        return;
    }
    if (!id) {
        elem.bottomPanel.querySelector(`#card${allData.boardOrder[0]}`).classList.add('active-card');

        renderSpace(allData.boardOrder[0], allData);

    } else {
        elem.bottomPanel.querySelector('.active-card')?.classList.remove('active-card');
        elem.bottomPanel.querySelector(cardId).classList.add('active-card');

        renderSpace(id, allData)
    }
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

export const deleteSpace = (id) => {

    const cardId = `#card${id}`
    document.querySelector(cardId).remove();

    const cardData = JSON.parse(localStorage.getItem('board-data'));
    delete cardData.boards[id];
    cardData.boardOrder = cardData.boardOrder.filter(boardId => boardId !== id);
    localStorage.setItem('board-data', JSON.stringify(cardData));
    setActiveSpace();

}

