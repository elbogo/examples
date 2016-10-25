/**
 *   on 2016-10-03.
 */

import React from 'react';

import MaterialFont from '../MaterialFont'
import css from './Paging.css'

export default function Paging ({
    clickPrev,
    clickNext,
    count,
    startFrom,
    currentPageLength
}){
    return <div className={css.main}>
        <MaterialFont />
        
        <button disabled={startFrom == 0} onClick={() => clickPrev()}>
            <i className="material-icons">&#xE5CB;</i>
        </button>
        
        <button disabled={currentPageLength < count} onClick={() => clickNext()}>
            <i className="material-icons">&#xE5CC;</i>
        </button>
    </div>
}