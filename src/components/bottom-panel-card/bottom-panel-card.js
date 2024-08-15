'use strict';

import bottomPanelCardHtml from './bottom-panel-card.html';
import './bottom-panel-card.css';
import {elem} from "../../index";
import {deleteSpace, setActiveSpace} from "../bottom-panel/bottom-panel";

let pressTimer;
let hideDeleteButtons = true;

const addCardListener = (id) => {
    const card = document.querySelector(`#card${id}`);
    const closeBtn = document.querySelector(`#delete${id}`);
    card.addEventListener('click', () => {
        console.log('card clicked' + id)
        setActiveSpace(id)
    });


    closeBtn.addEventListener('click', () => {
        console.log('delete ' + id);
        deleteSpace(id);
    });
    closeBtn.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    card.addEventListener('mousedown', () => {
        pressTimer = setTimeout(() => {
            hideDeleteButtons = !hideDeleteButtons;
            // hideEvent = document.querySelector('body').addEventListener('mousedown', () => {updateDeleteButtonsVisibility(true)})
            updateDeleteButtonsVisibility();
        }, 1000)
    });
    card.addEventListener('mouseup', () => {
        clearTimeout(pressTimer);
    });

    card.addEventListener('mouseleave', () => {
        clearTimeout(pressTimer);
    });
}

const updateDeleteButtonsVisibility = (hide = false) => {
    const deleteButtons = document.querySelectorAll('.delete');
    hide ? deleteButtons.forEach(button => {
        button.style.display = hideDeleteButtons = 'none';
    }) : deleteButtons.forEach(button => {
        if (hideDeleteButtons) {
            button.classList.remove('visible');
            button.classList.add('hidden');
        } else {
            button.classList.add('visible');
            button.classList.remove('hidden');
        }
    });
}


const pushCardBefore = (svg = '', name, boardId) => {
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = bottomPanelCardHtml;

    const bottomCard = tempContainer.firstChild;
    bottomCard.id = `card${boardId}`;
    bottomCard.querySelector('.delete').id = `delete${boardId}`;

    // bottomCard.querySelector('.card-svg').innerHTML = svg;
    bottomCard.querySelector('.name-on-card').innerText = name;
    elem.addBtn.before(bottomCard);
    addCardListener(boardId)
}

const createCard = () => {
    return {
        name: '',
        svg: '',
        boardId: '',
        cardData: [

        ]
    }
}

export const createCardData = () => {
    return {
        type_of_bar: '',
        entity_id: '',
        state: '',
        position_x: '',
        position_y: '',
        attributes: {
            raw_state: '',
            friendly_name: ''
        }
    }
}

export const renderBottomCards = (svg = '', name = '') => {
    let storedData = JSON.parse(localStorage.getItem('board-data')) || {boards: {}, boardOrder: []};
    if (name) {
        let newCard = createCard()
        newCard.svg = svg;
        newCard.name = name;
        const newId = Date.now().toString();
        storedData.boards[newId] = newCard;
        storedData.boardOrder.push(newId);

        localStorage.setItem('board-data', JSON.stringify(storedData));
        pushCardBefore(svg, name, newId);

    } else {
        storedData.boardOrder.forEach(id => {
            const card = storedData.boards[id];
            pushCardBefore(card.svg, card.name, id)
        });
    }
}
