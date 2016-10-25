/**
 * Created by t_t on 3/3/2016.
 */

import React, {Component} from 'react';

import './TagsSection.css';

export default class TagsSection extends Component {
    render() {
        const {input, tagsList} = this.props.value;

        return <div className="tags-section">
            <div className="input-group">
                <input
                    value={input}
                    type="text"
                    className="form-control"
                    onChange={ e => this.onInputChange(e) }
                    onKeyPress={ e => this.onKeyPress(e) }
                    placeholder=""/>

                        <span className="input-group-btn">
                            <button className="btn btn-default"
                                    type="button"
                                    onClick={ () => this.onAddButton() }>
                                Add
                            </button>
                        </span>
            </div>
            <div className="tags-list__wrapper">
                <p className="tags-list-title">Tags</p>
                <ul className="tags-list">
                    {
                        tagsList.map((value, index) => <li className="tag-item"
                                                           key={value + index}
                                                           onClick={ (e) => this.onDeleteTag(e) } >{value},</li>)
                    }
                </ul>
            </div>
            <p className="helper-delete">To delete tag, just click on it</p>
        </div>;
    }

    /**
     * on click on tag, delete it
     * @param e - event
     */
    onDeleteTag(e){

        const {tagsList} = this.props.value;
        const span = e.target;

        const newValue = {
            ...this.props.value,
            tagsList: removeTag(tagsList, span.innerHTML)
        };

        this.props.onChange({
            value: newValue
        })

    }
    /**
     * Change value of input
     * @param e - event
     */
    onInputChange(e) {

        const newValue = {
            ...this.props.value,
            input: e.target.value
        };

        this.props.onChange({
            value: newValue
        });
    }

    /**
     * on input typing watch 'enter' press and then add new tree node
     * @param e
     */
    onKeyPress(e){
        (e.key === 'Enter') && this.onAddButton()
    }

    /**
     * on button click, add new tree node
     */
    onAddButton(){
        const {input} = this.props.value;
        if(input.length > 0) {

            const newValue = {
                ...this.props.value,
                tagsList: [
                    ...this.props.value.tagsList,
                    input
                ],
                input: ''
            };

            this.props.onChange({
                value: newValue
            })
        }

    }
}

/**
 * find and remove tag from array
 * @param arr - array of tags
 * @returns {*} - new array
 */
function removeTag(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}


