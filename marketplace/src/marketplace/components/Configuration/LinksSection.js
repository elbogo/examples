/**
 * Created by t_t on 3/3/2016.
 */
import React, {Component}   from 'react';

import './LinksSection.css';

//Select
import Select               from 'react-select';
import 'react-select/dist/react-select.css';

//helpers
import {searchPlaces}            from '../../helpers/apiHelper';
import buildSelectData           from '../../helpers/buildSelectData';

export default function LinksSection(props){
    const {value, onChange} = props;

    return <div className="links-section">
        <div className="left_block">
            <div className="form-group">
                <label >Items added on "load more":</label>
                <Select
                    name="load-more"
                    value={ value.visibleCount.selected.value }
                    clearable={ false }
                    searchable={ false }
                    options={ value.visibleCount.available }
                    onChange={ onChangeLoadMore.bind(props) }
                />
            </div>
            <div className="form-group">
                <label >Submit asset link:</label>
                <input type="text"
                       className="form-control"
                       value={ value.submitAsset }
                       onChange={ e => onChange({
                            value: {
                                ...value,
                                submitAsset: e.target.value
                            }
                        }) }/>
            </div>
        </div>

        <div className="right_block">
            <div className="form-group">
                <label >Place Picker:</label>
                <Select
                    name="place-picker"
                    placeholder="Place Search"
                    value={ value.places.selected }
                    clearable={ false }
                    onInputChange={ search.bind(props) }
                    options={ value.places.available }
                    multi={true}
                    onChange={ onChangeSearchPlace.bind(props) }
                />
            </div>
        </div>

    </div>
}

/**
 * event, save to main state value from load-more select
 * @param val - new value
 */
function onChangeLoadMore(val){
    const {value, onChange} = this;

    const newValue = {
        ...value,
        visibleCount: {
            ...value.visibleCount,
            selected: val
        }
    };

    onChange({
        value: newValue
    })

}

/**
 * event, save to main state value from place-picker select
 * @param val - new value
 */
function onChangeSearchPlace(val) {
    const {value, onChange} = this;

    const newValue = {
        ...value,
        places: {
            ...value.places,
            selected: val
        }
    };

    onChange({
        value: newValue
    })
}
/**
 * on input change, find new places
 * @param input - input value
 */
function search(input) {
    const {value, onChange} = this;

    const options = {
        search: input + '*',
        type: 'group, blog, carousel, project, space'
    };

    searchPlaces(options, function(response) {
        const newVal = {
            ...value,
            places : {
                ...value.places,
                available: buildSelectData(response.list)
            }
        };

        onChange({
            value: newVal
        })
    })
}
