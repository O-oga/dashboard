'use strict';
import './add-card.css'
import {elem} from "../../../index";
import {renderBottomCards, renderBottomPanel} from "../../bottom-panel-card/bottom-panel-card";

const addNewPanel = () => {

    // cards[num] = {size: 1-2-3-4,
    //     name: attributes.friendly_name,
    //     data: [],
    //     id: 'id',
    //     svg: 'svg'
    //     }

    class NewPanel {
        name = '';
        svg = '';
        cardsData = [];

        constructor(props) {
            this.name = props.name;
            this.svg = props.svg;
            this.cardsData = props.cardsData;
        }
    }
}

const closeModal = () => {
    elem.modal.remove();
}
export const appendCloseModalEvent = () => {
    elem.modal = document.querySelector('#modal-window')
    elem.closeModal = document.querySelector('#btn-modal-close')
    elem.modalContent = document.querySelector('modal')
    elem.createCard = document.querySelector('#btn-create')

    elem.createCard.addEventListener('click', createCard)

    elem.modal.addEventListener('click', () => {
        closeModal()
    })
    elem.closeModal.addEventListener('click', () => {closeModal()})
    window.addEventListener('click', (event) => {
        if (event.target === elem.modal) {
            closeModal();
        }
    });
    elem.modalContent.addEventListener('click', (event) => {
        event.stopPropagation();
    });
}

const createCard = () => {
    elem.cardName = document.querySelector('#name')
    if (elem.cardName.value){
        elem.cardName.classList.remove('invalid-input')
        let name = elem.cardName.value;
        renderBottomCards('', name);
        closeModal();
    }
    else{
        elem.cardName.classList.add('invalid-input')
    }
}