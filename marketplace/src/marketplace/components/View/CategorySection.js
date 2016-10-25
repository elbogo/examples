/**
 * Created by t_t on 3/7/2016.
 */
import React from 'react';
import classNames    from 'classnames';

import {toggleArrayElement} from '../../selectors/toggleArrayElement';
import {toggleCategoryElement} from '../../selectors/toggleCategoryElement';

export default function CategorySection(props) {
    const {value, onChange, colors, item} = props;

    return <div className="category-section">
        <h4 className="category-section__title" style={{color: colors.heading}}> {item.module} </h4>
        <ul>
            {
                item.children.length > 0 && item.children.map( item => <CategorySubElement   key={item.id}
                                                                                             value={value}
                                                                                             item={item}
                                                                                             colors={colors}
                                                                                             onChange={onChange}  /> )
            }
        </ul>

    </div>
}

/**
 * Create categories under category heading
 * @param value - data from state
 * @param onChange - event from state
 * @param item - current category
 * @returns {XML} - category li item
 */
function CategorySubElement({value, onChange, item, colors}) {
    const className = classNames('category-section--item', {
        active: item.active
    });

    return <li  className={className}
                onClick={ (e) => onItemClick(e, value, onChange, item) }>
        {item.module}
        {
            item.active && <i className="delete"/>
        }
    </li>
}
/**
 * trigger item click. if clicked remove active and remove from selectedFilters
 * @param e - event
 * @param value - data from state
 * @param onChange - event from state
 * @param item - category item
 */
function onItemClick(e, value, onChange, item) {

    //trigger active value
    item.active = !item.active;

    const newValue = {
        ...value,
        selectedFilters: {
            ...value.selectedFilters,
            categories: toggleCategoryElement(value.selectedFilters.categories, item)
        }
    };

    onChange({
        value: newValue
    })
}
