/**
 * @description Initialization of Configuration to DOM
 */

import React        from 'react';
import ReactDOM     from 'react-dom';

import './helpers/mockHelper';

//styles
import '../../public/stylesheets/bootstrap.min.css';
import './css/main.css';

//component
import Configuration from './components/Configuration';

document.addEventListener("DOMContentLoaded", function()  {
    ReactDOM.render(
        <Configuration />,
        document.querySelector('#react-container')
    );
});
