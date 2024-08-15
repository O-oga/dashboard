'use strict';

import addToSpaceModal from './add-panel-to-space.html';
import './add-panel-to-space.css';
import {createEntitysStateList, messages, sendToHA} from "../../loader";
import {elem} from "../../../index";
import {renderBackground} from "../../render";
import {addNewPanel} from "../../space-board/space-board";

let modalContainer;
export let entities = {};

const closeModal = () => {
    elem.addPanelModal.remove();
}

const getBeforeDot = (str) => {
    const dotIndex = str.indexOf('.');
    return dotIndex === -1 ? str : str.substring(0, dotIndex);
}

const addEvents = (id) => {
    elem.closeaddPanelModal = elem.addPanelModal.querySelector('#btn-space-modal-close')
    elem.closeaddPanelModal.addEventListener('click', closeModal);
    modalContainer.addEventListener('click', (event) => {
        if (event.target === elem.addPanelModal) {
            closeModal();
        }
    });
    elem.btnAddPanel = elem.addPanelModal.querySelector('#btn-add-to-space');
    elem.btnAddPanel.addEventListener('click', () => {
        const value = modalContainer.querySelector('#entity-list').value;
        const friendly_name = modalContainer.querySelector('#friendly-name').value;
        const type_of_bar = getBeforeDot(value);
        addNewPanel(id, value, friendly_name, type_of_bar).then(closeModal);
    })

}

export const addItemToSpaceModal = async (id) => {
    modalContainer = document.createElement('div');
    modalContainer.innerHTML = addToSpaceModal;
    modalContainer.id = `add-item-to-space-modal`;
    modalContainer.querySelector('.header').innerText = `Add card to ${id} space`
    elem.addPanelModal = modalContainer
    document.body.appendChild(modalContainer);

    renderBackground('#preview-panel')
    addEvents(id);
}

export const createEntityList = async () => {
    const entityList = elem.addPanelModal.querySelector('#entity-list');

    entities = await createEntitysStateList();

    Object.keys(entities).forEach(entity => {
        const option = document.createElement('option');
        option.value = entity;
        option.textContent = `${entity}   State: ${entities[entity]}`;
        entityList.appendChild(option);
    })

}

