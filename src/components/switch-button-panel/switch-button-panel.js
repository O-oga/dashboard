'use strict';

import switchButtonHtml from './switch-button-panel.html';
import './switch-button-panel.css';
import {elem} from "../../index";
import {entitys} from "../modals/add-panel-to-space/add-panel-to-space";
import {changeDeviceState} from "../loader";

let switchState = '';

const switchEvent = (entity) => {
    document.querySelector(`#button${entity}`).addEventListener('click', ()=>{
        changeDeviceState(entity);
    });
}

const switchBtn = (entity) => {
    if (switchState === 'on'){
        switchState = 'off';
        changeDeviceState(entity, switchState, 'on').then(result =>console.log(result));
    }else if (switchState === 'off'){
        switchState = 'on';
        changeDeviceState(entity, switchState, 'off').then(result =>console.log(result));
    }
}

export const addSwitchButtonPanel = (id, entity) => {
    let boardId = `board${id}`;
    let container = document.createElement('div');
    container.innerHTML = switchButtonHtml;
    let newButton = container.firstChild;
    newButton.id = `button${entity}`;
    document.querySelector(boardId).prepend(newButton);

    switchState = entitys[entity]
    switchEvent(entity)
}

