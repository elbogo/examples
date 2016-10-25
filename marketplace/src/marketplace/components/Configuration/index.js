/**
 * @description Main configuration component, which contain all additional components
 */
import React, {Component} from 'react';
import classNames         from 'classnames';
import update             from 'react-addons-update';

import './index.css';

//Helpers
import resizeIframe                     from '../../helpers/resizeIframe';
import {getCategories, searchPlaces}    from '../../helpers/apiHelper';
import createNodeId                     from './../../helpers/createNodeId';
import buildSelectData                  from './../../helpers/buildSelectData';

import Tree                             from 'react-ui-tree';

//components
import CategorySection          from './CategorySection';
import TagsSection              from './TagsSection';
import LinksSection             from './LinksSection';
import ColorThemeSection        from './ColorThemeSection';

export default class Configuration extends Component {
    constructor(){
        super();

        this.state = {
            //config version
            _example_marketplace_config_v: 0,
            showCategorySection: false,
            //interface for selection section
            categorySectionValue: {
                input: '',
                treeList: { },
                selectedNode: null
            },

            //interface for tags section
            tagsSectionValue: {
                input: '',
                tagsList: []
            },

            //interface for links section
            linksSectionValue: {
                faq: '',
                guidelines: '',
                visibleCount: {
                    selected: { value: '10', label: '10 items' },
                    available: [
                        { value: '10', label: '10 items' },
                        { value: '20', label: '20 items' },
                        { value: '30', label: '30 items' },
                        { value: '40', label: '40 items' },
                        { value: '50', label: '50 items' }
                    ]
                },
                places: {
                    selected: [],
                    available: []
                }
            },

            //interface for colorTheme section
            colorThemeSectionValue: {
                tab: '',
                textLinks: '',
                title: '',
                loadMore: '',
                submitButton: '',
                heading: ''
            }
        };
    }

    componentDidMount(){
        resizeIframe();

        jive.tile.onOpen( (config, options) => this.onConfig(config, options));
    }

    componentDidUpdate(){
      console.log('state: ', this.state)
        resizeIframe();
    }

    render(){

        const {
            showCategorySection,
            categorySectionValue,
            tagsSectionValue,
            linksSectionValue,
            colorThemeSectionValue,
            _example_marketplace_config_v
        } = this.state;

        return <div className="configuration-wrapper">
            <h3 className="text-center">Configure Marketplace</h3>

            <h4>Categories</h4>
            {   showCategorySection && <CategorySection value={categorySectionValue}
                                                      onChange={ e => this.setState({categorySectionValue: e.value, _example_marketplace_config_v: _example_marketplace_config_v+1 })} />
            }
            <h4>Tags</h4>
            {
                showCategorySection && <TagsSection value={tagsSectionValue}
                                                    onChange={ e => this.setState({ tagsSectionValue: e.value, _example_marketplace_config_v: _example_marketplace_config_v+1 }) }/>
            }
            <h4>Links</h4>
            {
                showCategorySection && <LinksSection value={ linksSectionValue }
                                                    onChange={ e => this.setState({ linksSectionValue: e.value }) }/>
            }
            <h4>Color Theme</h4>
            {
                showCategorySection && <ColorThemeSection value={ colorThemeSectionValue }
                                                     onChange={ e => this.setState({ colorThemeSectionValue: e.value }) }/>
            }

            <button className="btn btn-primary"
                    onClick={() => this.saveTile()}>
                SAVE ALL
            </button>
        </div>
    }



    /**
     * when tile onOpen get data from jive.tile.getContainer then get all place categories
     * @param config {Object} - all saved data
     * @param options { Object } - some options
     */
    onConfig(config, options){
        // make sure config has default value
        if (config === null || config === undefined) config = { };

        // set default velue
        if (!config["data"]) {

            jive.tile.getContainer(data => {
                getCategories(data.resources.categories.ref, response => {
                  console.log( response, this.createTreeList(response))
                    this.setState({
                        showCategorySection: true,
                        categorySectionValue: {
                            ...this.state.categorySectionValue,
                            treeList: this.createTreeList(response)
                        }
                    });
                })
            });

        } else {

            this.setState({
                _example_marketplace_config_v: config.data._example_marketplace_config_v ? config.data._example_marketplace_config_v : 0,
                categorySectionValue: config.data.categorySectionValue,
                tagsSectionValue: config.data.tagsSectionValue,
                linksSectionValue: config.data.linksSectionValue,
                colorThemeSectionValue: config.data.colorThemeSectionValue,
                showCategorySection: true
            });
        }

        this.search();

    }

    /**
     * Build tree interface for tree component
     * @param list - categories
     * @returns {Array} - tree data model
     */
    createTreeList(response) {
        return {
            id: createNodeId(),
            module: "Categories",
            edit: false,
            children: response.list ? response.list.map(
                value => ({
                    id: createNodeId(),
                    module: value.name,
                    children: [],
                    isDefault: true,
                    iconUrl: '',
                    priority: '',
                    active: false,
                    edit: true
                })
            ) : []
        }
    }

    /**
     * find default places for place-picker select
     */
    search(){
        const options = {
            search: '*',
            type: 'group, blog, carousel, project, space'
        };

        searchPlaces( options, (response) => {
            this.setState({
                linksSectionValue: {
                    ...this.state.linksSectionValue,
                    places: {
                        ...this.state.linksSectionValue.places,
                        available: buildSelectData(response.list)
                    }
                }
            });

        });
    }

    /**
     * on button 'save all' close tile and save state to config.data
     */
    saveTile(){
        const config = {};
        config.data = this.state;


        jive.tile.close(config, {} );
    }
}//export
