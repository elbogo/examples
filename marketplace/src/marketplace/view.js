/**
 * @description View initialization to DOM
 */

import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';
import View from './components/View';
import './helpers/mockHelper';

document.addEventListener("DOMContentLoaded", function()  {
    ReactDOM.render(
        <View />,
        document.querySelector('#react-container')
    );
});
