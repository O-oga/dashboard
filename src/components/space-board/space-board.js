'use strict';

import spaceBoardHtml from './space-board.html';
import './space-board.css';
import {elem} from "../../index";
import {addItemToSpaceModal, createEntityList} from "../modals/add-panel-to-space/add-panel-to-space";
import {messages, sendToHA} from "../loader";
import {createCardData} from "../bottom-panel-card/bottom-panel-card";


const addListenersToSpace = (id) => {
    const addButton = document.querySelector(`#add-item-to-${id}`);
    addButton.addEventListener('click', () => {
        addItemToSpaceModal(id).then(() => {
            createEntityList();
        });
    });
}

export const renderSpace = (id = 0, spaceData) => {
    elem.spaceBoardContainer = document.querySelector('#space-container')
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = spaceBoardHtml;
    const space = tempContainer.firstElementChild;
    space.id = `space${id}`;
    space.firstElementChild.id = `add-item-to-${id}`;
    // elem.spaceBoardContainer.innerHTML = '';
    elem.spaceBoardContainer.replaceChildren(space);

    addListenersToSpace(id);
}

export const addNewPanel = async (id, entity_id, friendly_name, type_of_bar = 'switch') => {
    const triggerMessage = {...messages.subscribe_trigger};
    triggerMessage.trigger.entity_id = entity_id;


    const key = 'board-data';
    let spaceData = JSON.parse(localStorage.getItem(key));
    const newCardData = createCardData();
    newCardData.attributes.friendly_name = friendly_name
    newCardData.type_of_bar = type_of_bar;
    newCardData.entity_id = entity_id;
    spaceData.boards[id].cardData.push(newCardData);

    // localStorage.setItem(key, JSON.stringify(spaceData));

}