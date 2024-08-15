'use strict';

import addToSpaceModal from './add-panel-to-space.html';
import './add-panel-to-space.css';
import {createEntitysStateList, messages, sendToHA} from "../../loader";
import {elem} from "../../../index";
import {renderBackground} from "../../render";
import {addNewPanel} from "../../space-board/space-board";

let modalContainer;
export let entitys = {};

const closeModal = () => {
    elem.addPanelModal.remove();
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
        addNewPanel(id, value, friendly_name);
        closeModal();
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

    entitys = await createEntitysStateList();

    Object.keys(entitys).forEach(entity => {
        const option = document.createElement('option');
        option.value = entity;
        option.textContent = `${entity}   State: ${entitys[entity]}`;
        entityList.appendChild(option);
    })

}

