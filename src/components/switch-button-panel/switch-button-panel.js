'use strict';

import switchButtonHtml from './switch-button-panel.html';
import './switch-button-panel.css';
import {elem} from "../../index";
import {entities} from "../modals/add-panel-to-space/add-panel-to-space";
import {changeDeviceState} from "../loader";

let switchState = '';

const switchEvent = (entity) => {
    console.log(`#button${entity}`)
    document.querySelector(`[id="button${entity}"]`).addEventListener('click', ()=>{
        switchBtn(entity);
    });
}

export const switchBtnStyles = (entity) => {
    const switchBtn = document.querySelector(`[id="button${entity}"]`)
    switchBtn.addEventListener('click', () => {
        //switch class...
        if (entities[entity] === 'on'){

        }else if (entities[entity] === 'off'){

        }
    })
}

const switchBtn = (entity) => {
    if (entities[entity] === 'on'){
        entities[entity] = 'off';
        changeDeviceState(entity, false, 'on').then(result =>console.log(result))
            .then(() => {
                switchBtnStyles(entity);
            });
    }else if (entities[entity] === 'off'){
        entities[entity] = 'on';
        changeDeviceState(entity, true, 'off').then(result =>console.log(result))
            .then(() => {
                switchBtnStyles(entity);
            });
    }
    else {
        console.log('Unknown state')
    }
}

export const addSwitchButtonPanel = (id, entity, friendly_name) => {
    let spacedId = `#space${id}`;
    console.log(spacedId)
    let container = document.createElement('div');
    container.innerHTML = switchButtonHtml;
    let newButton = container.firstChild;
    newButton.id = `button${entity}`;
    container.querySelector(`#btn-friendly-name`).innerText = friendly_name;
    document.querySelector(spacedId).prepend(newButton);

    switchEvent(entity)
}

