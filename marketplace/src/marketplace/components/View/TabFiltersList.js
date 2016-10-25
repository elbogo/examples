/**
 * Created by t_t on 3/9/2016.
 */
import React        from 'react'
import classNames   from 'classnames';

export default function TabFiltersList(props) {

    const { item, value, colors } = props;

    const className = classNames('radio-inline header-nav--item', {
        active: item === value.selectedFilters.tab
    });

    return  <label  className={className}
                    style={{
                        color: item === value.selectedFilters.tab && colors.tab,
                        borderBottom: item === value.selectedFilters.tab && '6px solid ' + colors.tab,
                        fontWeight:  item === value.selectedFilters.tab && 'bold'
                    }}>

            <input type="radio"
                   checked={item === value.selectedFilters.tab}
                   onChange={ e => onItemClick(e, props, item) }
                   name="optradio"/>
        {item.name}
    </label>
}
/**
 * in nav item click, set it to active
 * @param e - event
 * @param props - data from root
 * @param item - current item
 */
function onItemClick(e, props, item) {
    const {value, onChange} = props;

    const newValue = {
        ...value,
        selectedFilters: {
            ...value.selectedFilters,
            tab: item
        }
    };

    onChange({
        value: newValue
    });
}