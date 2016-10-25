/**
 *
 * Created by t_t on 3/4/2016.
 */

import React from 'react';

import './ColorThemeSection.css';

export default function ColorThemeSection(props) {
    const {value} = props;

    return <div className="color-theme__section">
        <div className="left_block">
            <div className="form-group">
                <label style={{color: value.tab}} >Active tab color:</label>
                <input type="text"
                       style={{ borderColor: value.tab }}
                       className="form-control"
                       value={ value.tab }
                       onChange={ e => changeValue(e, props, 'tab') } />
            </div>
            <div className="form-group">
                <label style={{color: value.title}}>Title:</label>
                <input type="text"
                       style={{ borderColor: value.title }}
                       className="form-control"
                       value={ value.title }
                       onChange={ e => changeValue(e, props, 'title') }/>
            </div>
            <div className="form-group">
                <label style={{color: value.submitButton}}>Submit button:</label>
                <input type="text"
                       style={{ borderColor: value.submitButton }}
                       className="form-control"
                       value={ value.submitButton}
                       onChange={ e => changeValue(e, props, 'submitButton') }/>
            </div>
        </div>
        <div className="right_block">
            <div className="form-group">
                <label style={{color: value.textLinks}}>Text links:</label>
                <input type="text"
                       style={{borderColor: value.textLinks}}
                       className="form-control"
                       value={ value.textLinks }
                       onChange={ e => changeValue(e, props, 'textLinks') }/>
            </div>
            <div className="form-group">
                <label style={{color: value.loadMore}}>Load more button:</label>
                <input type="text"
                       style={{borderColor: value.loadMore}}
                       className="form-control"
                       value={ value.loadMore }
                       onChange={ e => changeValue(e, props, 'loadMore') }/>
            </div>
            <div className="form-group">
                <label style={{color: value.heading}}>Heading:</label>
                <input type="text"
                       style={{borderColor: value.heading}}
                       className="form-control"
                       value={ value.heading }
                       onChange={ e => changeValue(e, props, 'heading') }/>
            </div>
        </div>
    </div>
}
/**
 * on input change, change main state
 * @param e - event
 * @param props - data from root
 * @param key - which input changing
 */
function changeValue(e, props, key) {
    const {value, onChange} = props;

    const newValue = {
        ...value,
        [key]: e.target.value
    };

    onChange({
        value: newValue
    });
}