/**
 *   on 2016-10-03.
 */

import React from 'react';
import {tilePath} from '../../helpers/tileProps'
import './MaterialFont.css';

//importing fonts to place them in folder
import 'material-design-icons-iconfont/dist/fonts/MaterialIcons-Regular.eot';
import 'material-design-icons-iconfont/dist/fonts/MaterialIcons-Regular.woff2';
import 'material-design-icons-iconfont/dist/fonts/MaterialIcons-Regular.woff';
import 'material-design-icons-iconfont/dist/fonts/MaterialIcons-Regular.ttf';

export default function TileFontLoader (){
    return <style>{
        `@font-face {
          font-family: 'Material Icons';
          font-style: normal;
          font-weight: 400;
          src: url(${tilePath}/javascripts/fonts/MaterialIcons-Regular.eot); /* For IE6-8 */
          src: url(${tilePath}/javascripts/fonts/MaterialIcons-Regular.woff2) format('woff2'),
               url(${tilePath}/javascripts/fonts/MaterialIcons-Regular.woff) format('woff'),
               url(${tilePath}/javascripts/fonts/MaterialIcons-Regular.ttf) format('truetype');
        }`
    }</style>
}