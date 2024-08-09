'use strict';
import './add-card.css'
import {elem} from "../../index";

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

const closeModal = (modal) => {

    elem.modal.remove();
}
export const appendCloseModalEvent = () => {
    elem.modal = document.querySelector('#add-card-modal')
    elem.closeModal = document.querySelector('#btn-modal-close')
    elem.modalContent = document.querySelector('modal')
    elem.modal.addEventListener('click', () => {
        closeModal('#btn-modal-close')
    })
    window.addEventListener('click', (event) => {
        if (event.target === elem.modal) {
            closeModal();
        }
    });
    elem.modalContent.addEventListener('click', (event) => {
        event.stopPropagation();
    });
}