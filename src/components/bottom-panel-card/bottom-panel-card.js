'use strict';

import bottomPanelCardHtml from './bottom-panel-card.html';
import './bottom-panel-card.css';
import {elem} from "../../index";
import {setActiveSpace} from "../bottom-panel/bottom-panel";


const addCardListener = (id) => {
    const card = document.querySelector(`#card${id}`);
    card.addEventListener('click', () => {
        console.log('card clicked' + id)
        setActiveSpace(id)
    });

    card.addEventListener('keydown', () => {
        let timeout = setTimeout(() => {

        })
    });
}



const pushCardBefore = (svg = '', name, boardId) => {
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = bottomPanelCardHtml;

    const bottomCard = tempContainer.firstChild;
    bottomCard.id = `card${boardId}`;

    bottomCard.querySelector('.card-svg').innerHTML = svg;
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
            {}
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
    let cardData = JSON.parse(localStorage.getItem('card-data')) || [];
    if (name) {
        let newCard = createCard()
        newCard.svg = svg;
        newCard.name = name;
        newCard.boardId = cardData.length.toString();
        cardData.push(newCard);

        localStorage.setItem('card-data', JSON.stringify(cardData));
        pushCardBefore(svg, name, newCard.boardId);

    } else {
        cardData.forEach(card => {
            pushCardBefore(card.svg, card.name, card.boardId)
        });
    }
}
