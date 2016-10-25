/**
 *   on 2016-10-04.
 */

import React, {Component} from 'react';

import css from './Search.css'

export default class Search extends Component {
    constructor(){
        super();
        
        this.state = {
            searchString: ''
        }
    }
    
    render(){
        
        const {doSearch} = this.props;
        const {searchString} = this.state;
        
        return <div className={css.main}>
            <input 
                type="text"
                value={searchString}
                onChange={::this.onSearchStringChange}
                onKeyDown={::this.onKey}
            />
            <button onClick={() => doSearch(searchString)}>
                <i className="material-icons">&#xE8B6;</i>
            </button>
        </div>   
    }

    onSearchStringChange(reactEvent){
        
        this.setState({
            searchString: reactEvent.target.value
        }, () => {
            if (this.state.searchString == '') {
                this.props.doSearch('')
            }
        });
    }
    
    onKey(reactEvent){
        if (reactEvent.keyCode == 13){ //enter
            this.props.doSearch(this.state.searchString)
        }
    }
}