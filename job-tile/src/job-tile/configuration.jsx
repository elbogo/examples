import 'babel-polyfill';

import resizeMe from './helpers/resizeMe.jsx';

import jive from "jive";
import React from 'react';
import { render } from 'react-dom';

jive.tile.onOpen(config => {
    try {

        resizeMe();

    } catch (err) {
        console.error('onOpen error', err);
    }
});
