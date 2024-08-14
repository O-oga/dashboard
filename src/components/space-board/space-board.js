'use strict';

import spaceBoardHtml from './space-board.html';
import './space-board.css';
import {elem} from "../../index";


    export const renderSpace = (id = 0, spaceData) => {
        elem.spaceBoardContainer = document.querySelector('#space-container')
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = spaceBoardHtml;
        const space = tempContainer.firstElementChild
        space.id = `space${id}`
        elem.spaceBoardContainer.innerHTML = '';
        elem.spaceBoardContainer.appendChild(space);

    }