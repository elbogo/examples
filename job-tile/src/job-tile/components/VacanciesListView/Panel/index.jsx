/**
 *   on 2016-10-04.
 */

import React, {Component} from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import resizeMe from '../../../helpers/resizeMe';
import Search from '../Search'
import types from '../../../hardcodedData/positionType'

import css from './Panel.css'

export default class Panel extends Component {
    
    constructor(){
        super();

        this.state = {
            sortingOpen: false,
            filteringOpen: false
        }
    }
    
    componentDidUpdate(){
        resizeMe();
    }

    render() {

        const {sortingOpen, filteringOpen} = this.state;
        
        const {
            filterCountry,
            filterCity,
            filterType,
            countries,
            cities,
            sortOrder,
            sortField,

            setFilterCountry,
            setFilterCity,
            setFilterType,
            setSearchString,
            setSort
        } = this.props;
        
        const sort = sortField + '-' + sortOrder.toLowerCase();
        
        return <div className={css.main}>
            <div className="main-panel clearfix">

                <div className="sort-filter-panel">
                    <a
                        className="button"
                        style={{ textTransform: sortingOpen ? 'uppercase' : 'none' }}
                        onClick={::this.clickSorting}
                    >Sorting</a>

                    <a
                        className="button"
                        style={{ textTransform: filteringOpen ? 'uppercase' : 'none' }}
                        onClick={::this.clickFiltering}
                    >Filtering</a>
                </div>

                <div className="search-panel">
                    <Search doSearch={searchString => setSearchString(searchString)} />
                </div>

            </div>

            <div className="dropdown-panel" style={{ display: sortingOpen || filteringOpen  ? 'block' : 'none' }}>
                {sortingOpen && <div className="sorting-panel">

                    <div className="column w50">
                        <h3>DATE POSTED</h3>
                        {sort == 'createDate-asc' && <div className="active">Sort by latest</div>}
                        {sort != 'createDate-asc' && <a onClick={() => setSort('createDate', 'ASC')}>Sort by latest</a>}

                        {sort == 'createDate-desc' && <div className="active">Sort by newest</div>}
                        {sort != 'createDate-desc' && <a onClick={() => setSort('createDate', 'DESC')}>Sort by newest</a>}
                    </div>

                    <div className="column w50">
                        <h3>APPLICAION DEADLINE</h3>
                        {sort == 'deadline-asc' && <div className="active">Sort by latest</div>}
                        {sort != 'deadline-asc' && <a onClick={() => setSort('deadline', 'ASC')}>Sort by latest</a>}

                        {sort == 'deadline-desc' && <div className="active">Sort by newest</div>}
                        {sort != 'deadline-desc' && <a onClick={() => setSort('deadline', 'DESC')}>Sort by newest</a>}
                    </div>

                </div>}

                {filteringOpen && <div className="filtering-panel">

                    <div className={"column" + (filterCountry ? ' w33' : ' w66')}>
                        <h3>Country</h3>
                        <SelectField value={filterCountry} onChange={(e, i, value) => setFilterCountry(value)}>
                            <MenuItem value={false} primaryText="no filter"/>
                            {countries.map((country, i) =>
                                <MenuItem key={i} value={country} primaryText={country}/>
                            )}
                        </SelectField>
                    </div>

                    {filterCountry && <div className="column w33">
                        <h3>City</h3>
                        <SelectField value={filterCity} onChange={(e, i, value) => setFilterCity(value)}>
                            <MenuItem value={false} primaryText="no filter"/>
                            {cities.map((city, i) =>
                                <MenuItem key={i} value={city} primaryText={city}/>
                            )}
                        </SelectField>
                    </div>}

                    <div className="column w33">
                        <h3>Position type</h3>
                        <SelectField value={filterType} onChange={(e, i, value) => setFilterType(value)}>
                            <MenuItem value={false} primaryText="no filter"/>
                            {types.map((type, i) =>
                                <MenuItem key={i} value={i} primaryText={type.name}/>
                            )}
                        </SelectField>
                    </div>

                </div>}
            </div>
        </div>
    }

    closePanel() {
        this.setState({
            sortingOpen: false,
            filteringOpen: false
        })
    }

    clickSorting() {
        if (this.state.sortingOpen) {
            this.closePanel()
        } else {
            this.setState({
                sortingOpen: true,
                filteringOpen: false
            })
        }
    }

    clickFiltering() {
        if (this.state.filteringOpen) {
            this.closePanel()
        } else {
            this.setState({
                sortingOpen: false,
                filteringOpen: true
            })
        }
    }
}