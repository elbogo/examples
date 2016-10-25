/**
 * Created by t_t on 3/7/2016.
 */
import React, {Component}   from 'react';
import RetinaImage          from 'react-retina-image';
import classNames           from 'classnames';

import moment               from 'moment';
import 'babel-polyfill'

import Select               from 'react-select';



import resizeIframe                     from '../../helpers/resizeIframe';
import msieversion                      from '../../helpers/checkIE';
import configTest                       from '../../helpers/configData';
import createNodeId                     from '../../helpers/createNodeId'
import {batchPlaces,
        getPlacesInformation,
        getOriginalDocuments}           from '../../helpers/apiHelper';

//components
import FiltersAsideSection  from './FiltersAsideSection';
import TabFiltersList       from './TabFiltersList';
import ThumbnailItem        from './ThumbnailItem';

import './index.css';
import './listView.css';
import './mobile.css';

const defaultIcon = require('../../images/fallback-category.png');

export default class View extends Component {
    constructor() {
        super();

        this.state = {
            _example_marketplace_config_v: 0,
            tileVisibility: false,
            submitAssetLink: '/',
            tabChanged: false,
            isLoading: false,
            waitingAdditionalCall: false,
            displayMode: 'thumbnail',
            colors: {},
            places: {},
            documentInterface: {
                subject: '',
                description: '',
                image: '',
                link: '',
                secretElement: '',
                likesCount: '',
                documentId: ''
            },
            documents: [],
            documentsVisible: [],
            filteredDocuments: [],
            visibleCount: '',
            loadMoreCount: '',
            filtersSection: {
                treeList: {},
                tagsList: {},
                tabList: [
                    {
                       name: 'All',
                       filter: '*',
                       value: 'Show All',
                       label: 'Show All'
                    },
                    // {
                    //     name: 'New',
                    //     filter: '*',
                    //     value: 'Show New',
                    //     label: 'Show New'
                    // },
                    // no document filed for featuredContent
                    // {
                    //     name: 'Featured',
                    //     filter: '*'
                    // },
                    {
                        name: 'By example',
                        filter: '*',
                        value: 'Show By example',
                        label: 'Show By example'
                    },
                    {
                        name: 'Partners',
                        filter: '*',
                        value: 'Show Partners',
                        label: 'Show Partners'
                    },
                    {
                        name: 'Popular',
                        filter: '*',
                        value: 'Show Popular',
                        label: 'Show Popular'
                    }
                ],
                selectedFilters: {
                    categories: [],
                    tags: [],
                    tab: {},
                    tagsList: [] // shoud not be here
                }
            }

        };
    }

    componentDidUpdate(){
        resizeIframe();
        this.state.tileVisibility && localStorage.setItem('filtersSection_'+this.state.tileInstanceId, JSON.stringify(this.state.filtersSection)); // drop localStorage after config change

        console.log('state updated: ', this.state);
        console.log('documents: ', this.state.documents, this.state.documents.length)
        console.log('documentsVisible: ', this.state.documentsVisible, this.state.documentsVisible.length)
    }

    componentDidMount(){
        resizeIframe();
        jive.tile.onOpen( (config, options) => this.onConfig(config, options));

        window.onresize = () => {
          this.setState({ isMobile: window.innerWidth <= 1020})
          resizeIframe;
        }
    }

    render(){
        const {
            tileVisibility,
            submitAssetLink,
            displayMode,
            isLoading,
            waitingAdditionalCall,
            loadMoreCount,
            visibleCount,
            filtersSection,
            colors,
            documents,
            documentsVisible,
            filteredDocuments,
            selectedFilters,
            isMobile
        } = this.state;



        const noDocuments = !isLoading && !documentsVisible.length;
        const thumbnailModeClassName = classNames('view-thumbnail', { selected: displayMode == 'thumbnail' || !displayMode });
        const listModeClassName = classNames('view-list', { selected: displayMode == 'list' });
        const sideBarRightClassName = classNames('sidebar-right--content', displayMode, { list: isMobile, loaded: !isLoading, nodocs: noDocuments  } );
        const loadMoreVisible = visibleCount <= filteredDocuments.length;
        const tabsListClassName = classNames('sidebar-right--filters-nav', { disabled: waitingAdditionalCall } );
        const tabsSelectClassName = classNames('tabs-select', { disabled: waitingAdditionalCall } );
        const marketplaceClassName = classNames('marketplace', { ie: msieversion() })

        return <div className={marketplaceClassName}>
            <div className="sidebar-left">
                <a href={submitAssetLink} style={{background: colors.submitButton}} className="submit-asset" target="_top">Submit Asset</a>
                {
                    filtersSection.tabList.length && <Select name="tabs-selection" className={tabsSelectClassName}
                                                placeholder="view..."
                                                clearable={ false }
                                                value={ filtersSection.selectedFilters.tab }
                                                searchable={ false }
                                                disabled={ waitingAdditionalCall }
                                                options={ filtersSection.tabList }
                                                onChange={ item => this.handleTabChange({
                                                                            ...filtersSection,
                                                                              selectedFilters: {
                                                                                ...filtersSection.selectedFilters,
                                                                                tab: item
                                                                            }
                                                                        })
                                                      }/>
                }
                {
                    tileVisibility  && <FiltersAsideSection value={filtersSection}
                                                                              isMobile={ this.state.isMobile }
                                                                              colors={colors}
                                                                              onChange={ e => this.handleFiltersChange(e.value) } />
                }
            </div>
            <div className="sidebar-right">
                <header className="sidebar-right--header">
                    <ul className={tabsListClassName}>
                        {
                            filtersSection.tabList.map(item => <TabFiltersList  key={createNodeId()}
                                                                                value={filtersSection}
                                                                                item={item}
                                                                                colors={colors}
                                                                                onChange={ e => this.handleTabChange(e.value) } />)
                        }
                    </ul>
                    <div className="right-navigation">
                        <nav className="sidebar-right--view-nav">
                            <button className={thumbnailModeClassName} onClick={ e => { this.changeDisplayMode('thumbnail'); } }/>
                            <button className={listModeClassName} onClick={ e => { this.changeDisplayMode('list'); } }>
                                <span/>
                                <span/>
                                <span/>
                            </button>
                        </nav>
                    </div>
                </header>
                <div className={sideBarRightClassName}>
                    { isLoading && <div className="loading"></div>}
                    { noDocuments && <div className="no-documents">Sorry, no assets found.</div>}
                    { !isLoading &&
                        documentsVisible.map( (value, index) => <ThumbnailItem data={value} displayMode={ this.state.displayMode } isMobile={ this.state.isMobile } getCategoryIcon={ ::this.getCategoryIcon } toggleLike={ ::this.toggleLike } index={ index } key={ createNodeId() }
                                                                               colors={colors} /> )
                    }

                    { !isLoading && loadMoreVisible && <button onClick={ e => this.onLoadMore(e) } className="load-more"> <img src={require('../../images/recurring_appointment@2x.png')} />
                            load {loadMoreCount} more
                            <p>total: {documents.length}</p>
                        </button>
                    }
                </div>

            </div>
        </div>
    }


    /**
     * On tile loaded save rewrite state
     * @param config - main data
     * @param options - some options
     */
    onConfig(config, options){
        //for development on localhost

        //console.log('config: ', config)

        //first we get Tile Instance object
        osapi.jive.corev3.tiles.getTileInstance({"id":options.tileInstanceId}).execute( tileInstance => {

          //console.log('tileInstance: ', tileInstance);

          const currentPlace = {
            placeID: tileInstance.parent.replace(/(.*?)\/api\/core\/v3\/places\//, ''),
            id: '',
            label: '',
            value: ''
          }

          if(__MOCK__) config = configTest;

          const localfiltersSection = JSON.parse(localStorage.getItem('filtersSection_'+options.tileInstanceId));

          const localConfigVersion = localStorage.getItem('_example_marketplace_config_v_'+options.tileInstanceId) !== "undefined" ? JSON.parse(localStorage.getItem('_example_marketplace_config_v_'+options.tileInstanceId)) : 0;

          let filtersSection = false;
          if ( (localConfigVersion && config._example_marketplace_config_v) && config._example_marketplace_config_v == localConfigVersion ){
            console.info('versions match')
            filtersSection = localfiltersSection;
          }else{
            console.info('versions NOT match')
            localStorage.setItem('_example_marketplace_config_v_'+options.tileInstanceId, config._example_marketplace_config_v );
          }

          const displayMode = JSON.parse(localStorage.getItem('displayMode_'+options.tileInstanceId));

          //parse config data, and save what we need to state
          this.setState({
              ...this.state,
              _example_marketplace_config_v: config._example_marketplace_config_v,
              tileInstanceId: options.tileInstanceId,
              submitAssetLink: config.linksSectionValue.submitAsset,
              isMobile: window.innerWidth <= 1020,
              displayMode: displayMode,
              places:  config.linksSectionValue.places.selected.length ? config.linksSectionValue.places.selected : [currentPlace],
              visibleCount: parseInt(config.linksSectionValue.visibleCount.selected.value),
              loadMoreCount: parseInt(config.linksSectionValue.visibleCount.selected.value),
              colors: config.colorThemeSectionValue,
              filtersSection: {
                  ...this.state.filtersSection,
                  treeList: ( filtersSection ) ? filtersSection.treeList : config.categorySectionValue.treeList,
                  tagsList: ( filtersSection ) ? filtersSection.tagsList : config.tagsSectionValue.tagsList,
                  selectedFilters: {
                      ...this.state.filtersSection.selectedFilters,
                      tab: ( localfiltersSection ) ? this.state.filtersSection.tabList[this.findTabIndex(localfiltersSection.selectedFilters.tab)]: this.state.filtersSection.tabList[0],
                      categories: ( filtersSection ) ? filtersSection.selectedFilters.categories : [],
                      tags:  (filtersSection ) ? filtersSection.selectedFilters.tags : []
                  }
              },
              tileVisibility: true

          }, () => {

              if(this.state.filtersSection.selectedFilters.tab.name == 'Popular' && !this.state.tabChanged){
                this.getAndStoreDocuments('popular-preselected');
              }
              else{
                this.getAndStoreDocuments('regular');
              }



          });

        })


    }

    /**
     * gets documents dependent on permissions and stores them to state
     */
    getAndStoreDocuments(apiEndpointIndicator){
      /**
       *  terning on throbber visibility
       */
      this.setState({isLoading:true, waitingAdditionalCall: true});
      /**
       * check if places are avaliable for user
       */
      batchPlaces(this.state.places).then( batchedPlaces => {
          /**
           * get documents from avaliable places
           */
          getPlacesInformation(batchedPlaces,apiEndpointIndicator).then( response => {
              // recursion on docs called here
              this.getMergedDocsPromise(response).then( mergedResponse => {


                let documents = this.applyRibons(mergedResponse);

                if (apiEndpointIndicator == 'regular'){

                  //clone on original response documents
                  let documentsClone = [ ...documents ];

                  let filteredDocuments = this.filterDocumentsFields(documentsClone);

                  this.setState({
                      ...this.state,
                      documents: documents,
                      filteredDocuments: filteredDocuments
                  }, () => {
                     this.setState({
                         ...this.state,
                         documentsVisible: this.state.filteredDocuments.slice(0, this.state.visibleCount)
                     }, () => {
                         /**
                          *  terning of throbber visibility
                          */
                          this.setState({isLoading:false, waitingAdditionalCall: false});
                      })
                  })
                }
                else if( apiEndpointIndicator == 'popular-preselected' ){

                  getOriginalDocuments(documents).then( originalDocuments => {

                    let filteredDocuments = this.filterDocumentsFields(originalDocuments, 'no-tab-filtering');

                    this.setState({
                        ...this.state,
                        popularDocuments: originalDocuments,
                        filteredDocuments: filteredDocuments ? filteredDocuments : []
                    }, () => {
                       this.setState({
                           ...this.state,
                           documentsVisible: this.state.filteredDocuments.length ? this.state.filteredDocuments.slice(0, this.state.visibleCount) : []
                       }, () => {
                             /**
                              *  terning of throbber visibility
                              */
                            this.setState({isLoading:false});

                            //console.log('additional call ')

                              getPlacesInformation(batchedPlaces,'regular').then( resp => {
                                    // recursion on docs called here
                                    this.getMergedDocsPromise(resp).then( mergedDocs => {

                                      let documents = this.applyRibons(mergedDocs);
                                      this.setState({
                                          ...this.state,
                                          documents,
                                      }, () => {

                                        this.setState({waitingAdditionalCall:false});

                                      })
                                    })
                              })
                          })
                      })


                  });


                }
                //popular switched
                else{
                  getOriginalDocuments(documents).then( originalDocuments => {

                  let filteredDocuments = this.filterDocumentsFields(originalDocuments, 'no-tab-filtering');

                  this.setState({
                      ...this.state,
                      popularDocuments: originalDocuments,
                      filteredDocuments: filteredDocuments
                  }, () => {
                     this.setState({
                         ...this.state,
                         documentsVisible: this.state.filteredDocuments.slice(0, this.state.visibleCount)
                     }, () => {
                           /**
                            *  terning of throbber visibility
                            */
                          this.setState({isLoading:false,waitingAdditionalCall:false});
                      })
                  })
                })
                }
              });
          });
      });
    }

    /**
     * @param documents - documents to add extra isCertified,byexample fields
     * @returns documents with extra isCertified,byexample fields
    */
    applyRibons(documents){

      if(documents.length){
        documents.map( (document,i) => {

          if (document.content){
            const isCertified = document.content.text.match(/<div class="certified">/) !== null;

            //set item className
            const byexample = document.content.text.match(/<div class="byexample">/) !== null;
            const isPartners = document.content.text.match(/<div class="partners">/) !== null;

            documents[i].isCertified = isCertified;
            documents[i].byexample = byexample;
            documents[i].isPartners = isPartners;
          }



        })
      }


      return documents;

    }

    // /**
    //  * sorts documents by publish date DESC
    //  * @returns sorted documents
    // */
    // sortByNewest(documents){
    //
    //   documents = documents.sort( (a,b) => {
    //     const firstTimestamp = parseInt(moment(a.published).format('x'));
    //     const secondTimestamp = parseInt(moment(b.published).format('x'));
    //
    //     return secondTimestamp - firstTimestamp;
    //   })
    //
    //   console.info('sorted by newest');
    //
    //   return documents;
    // }

    /**
     * sorts documents by publish date DESC
     * @returns sorted documents
    */
    filterByexample(documents){

      documents = documents.filter( document => {
        return document.byexample;
      })

      console.info('by example filtered only ');

      return documents;
    }


    filterPartners(documents){

      documents = documents.filter( document => {
        return document.isPartners;
      })

      console.info('by Partners filtered only ');

      return documents;
    }

    /**
     * drop filters to All tab
     * @returns sorted documents
    */
    dropFilterToAll(documents){
      console.info('filter dropped to all');
      return documents;
    }

    /**
     * gets popularDocuments
     * @returns false and stores popularDocuments if no Popular documents else popularDocuments
    */
    getPopular(){

      if (!this.state.popularDocuments){
        this.getAndStoreDocuments('popular');
        return false;
      }else{
        return this.state.popularDocuments
      }

    }

    /**
     * @param tabName - name of the selected Tab
     * calls sort functions by selected tabName
    */
    sortByTabName(tabName,documents){

      switch(tabName) {
        //   case 'New':
        //       return this.sortByNewest(documents);
        //       break;
          case 'By example':
              return this.filterByexample(documents);
              break;
          case 'Partners':
              return this.filterPartners(documents);
              break;
          case 'Popular':
              return this.getPopular();
              break;
          default:
              return this.dropFilterToAll(documents);
      }


    }

    handleFiltersChange(filtersValue){
      this.setState({filtersSection: filtersValue}, () => {
        //clone on original response documents
        const documentsClone = [ ...this.state.documents ];

        const filteredDocuments = this.filterDocumentsFields(documentsClone);
        const documentsVisible = filteredDocuments.slice(0, this.state.visibleCount);


        this.setState( {filteredDocuments: filteredDocuments , documentsVisible: documentsVisible } );
      });


    }

    /*
     * handles tabchange
     **/
    handleTabChange(tabValue){

      //console.log('tabValue" ', tabValue)

      if ( !this.state.waitingAdditionalCall){
        if (!this.state.tabChanged){
          this.setState({tabChanged: true});
        }

        const documents = [ ...this.state.documents ];

        let filteredDocuments = this.sortByTabName( tabValue.selectedFilters.tab.name, documents);
        if (filteredDocuments){
          filteredDocuments = this.sortByCategoriesAndTags(filteredDocuments);
          const documentsVisible = filteredDocuments.slice(0, this.state.visibleCount);

          //changing state with tab value
          this.setState({filtersSection: tabValue, filteredDocuments:filteredDocuments, documentsVisible:documentsVisible});
        }else{
          this.setState({filtersSection: tabValue});
        }
      }



    }

    /**
     * @param currentPage - current page containing document list for feather merge
    */
    getNextPageRecursively(currentPage){

      return new Promise( (resolve, reject) => {

        if (typeof currentPage.getNextPage === 'function'){
          currentPage.getNextPage().execute( nextPage => {

            // //console.log('tesing length on concat: ',currentPage.list.length,nextPage.list.length)
            nextPage.list = currentPage.list.concat(nextPage.list);
            // //console.log('nextPage:',nextPage);
            this.getNextPageRecursively(nextPage).then((result)=>{
              // //console.log('resuLT: ', result);
              resolve(result);
            });

          })
        }else{
          resolve(currentPage);
        }
      })
    }

    /**
     * @param response - batch response object with documents list
     * @callback - resolve function from getMergedDocsPromise Promise
    */
    waitAndMergeDocuments(response, callback){

      let resultObj = {};

      let mergedPlacesObjs = [];

      for (let prop in response) {
          if( response.hasOwnProperty(prop) ) {

              let mergedObjState = this.getNextPageRecursively(response[prop]);

              mergedPlacesObjs.push(mergedObjState);

          }
      }
      // callback(response);
      //console.log('mergedPlacesObjs: ', mergedPlacesObjs)

      Promise.all(mergedPlacesObjs).then( merged => {

        let documents = [];

        merged.map((item) => {
          documents = documents.concat(item.list);
        })

        callback(documents); //resolving all documents

      }).catch( error => { console.error('error on Promise.all: ', error)} );

    }

    /**
     * @param response - batch response object with documents list
     * @returns Promise with recursively merged lists of documents by next page
     */
    getMergedDocsPromise(response){

      return  new Promise( (resolve, reject) => {
            this.waitAndMergeDocuments(response, resolve);
      });
    }

    /**
     * find tab in tabList and return tab index
     * @param item - searchable tab
     * @returns {number} - tab index
     */
    findTabIndex(item) {
        let index = 0;
        const tabList = this.state.filtersSection.tabList;

        tabList.forEach((value, i) => {
            value.name === item.name ? index = i : false;
        });

        return index;
    }

    /**
     * collect all places.list into one array
     * @param obj - all places data
     * @returns {Array} - sticked data
     */
    stickTogetherContents(obj) {
        let documents = [];
        for (var prop in obj) {
            if( obj.hasOwnProperty(prop) && obj[prop].list.length > 0 ) {
                documents = [
                    ...documents,
                    ...obj[prop].list
                ]
            }
        }
        return documents
    }

    /**
     * add to documentsVisible new documents
     */
    onLoadMore() {
        let {visibleCount, loadMoreCount, filteredDocuments} = this.state;
        visibleCount = visibleCount + loadMoreCount;

        if(visibleCount > filteredDocuments.length ){
          //todo: hide loadMore button
        }

        this.setState({
            ...this.state,
            documentsVisible: filteredDocuments.slice(0, visibleCount ),
            visibleCount: visibleCount
        })
    }


    /**
     * @param e - event
     * @param contentID - contentID of a document
     * @param method - like\unlike function
    */
    toggleLike(e,contentID,method){
       e.preventDefault();

       method().execute(()=>{

          osapi.jive.corev3.contents.get({id:contentID})
              .execute( updatedDoc => {

                let documents =[...this.state.documents];
                let documentsVisible = [...this.state.documentsVisible];
                let filteredDocuments = [...this.state.filteredDocuments];

                documents = documents.map( (doc, i) => {

                     if(doc.contentID === updatedDoc.contentID ){
                       return {
                             // copying original tab object
                             ...doc,
                            likeCount: updatedDoc.likeCount,
                            like: updatedDoc.like,
                            unlike: updatedDoc.unlike
                          }
                     }else{
                       return doc;
                  }
              });
                documentsVisible = documentsVisible.map( (doc, i) => {

                     if(doc.contentID === updatedDoc.contentID ){
                       return {
                             // copying original tab object
                             ...doc,
                            likeCount: updatedDoc.likeCount,
                            like: updatedDoc.like,
                            unlike: updatedDoc.unlike
                          }
                     }else{
                       return doc;
                  }
              });
                filteredDocuments = filteredDocuments.map( (doc, i) => {

                     if(doc.contentID === updatedDoc.contentID ) {
                       return {
                             // copying original tab object
                             ...doc,
                            likeCount: updatedDoc.likeCount,
                            like: updatedDoc.like,
                            unlike: updatedDoc.unlike
                          }
                     }else{
                       return doc;
                  }
              });

                //console.log('documents: ', documents)

                 this.setState({documents});
                 this.setState({documentsVisible});
                 this.setState({filteredDocuments});

               })
       });

       return false;
    }
    /**
     * @param displayMode - string that indicates displayMode
     * changesDisplayMode
    */
    changeDisplayMode(displayMode){
        if (displayMode !== this.state.displayMode){
          //console.log('changing displayMode');
          this.setState({displayMode: displayMode}, () => {
            // store displayMode in localStorage after stateChanged
            this.state.displayMode && localStorage.setItem('displayMode_'+this.state.tileInstanceId, JSON.stringify(this.state.displayMode));
          } );

        }else{
          //not changed
          //console.log('displayMode not changed');
        }
    }

    /**
     * here will be you implementation of filtering document fields
     * @param documents
     * @returns {*}
     */
    filterDocumentsFields(documents,mode) {

      if( mode == 'no-tab-filtering'){
        const filteredByLeftPanel = this.sortByCategoriesAndTags(documents);

        return filteredByLeftPanel;

      }else{

        const filteredByTabs = this.sortByTabName(this.state.filtersSection.selectedFilters.tab.name, documents);
        const filteredByLeftPanel = this.sortByCategoriesAndTags(filteredByTabs);

        return filteredByLeftPanel;
      }

    }

    /**
     *
     * @param documents - original non sorted categories
     * @returns documents matched with left panel filters
    */
    sortByCategoriesAndTags(documents){

      //console.log('docs to sort: ' , documents)

      const categories = this.state.filtersSection.selectedFilters.categories.map( category => {
        return category.module;
      });

      const tags = this.state.filtersSection.selectedFilters.tags.map( tag => {
        return tag.value;
      });

      return documents.filter( document => {

        let matchedCategories = []
        let matchedTags = []

        if (document.categories && document.categories.length){
          matchedCategories = document.categories.filter( category => {
            return categories.indexOf(category) !== -1;
          })
        }

        if (document.tags && document.tags.length){
          matchedTags = document.tags.filter( tag => {
            return tags.indexOf(tag) !== -1;
          })
        }

        //return full match
        return (matchedCategories.length === categories.length && matchedTags.length === tags.length);

      })

    }

    /**
     *
     * @param treeList - original treeList for categories
     * @returns categories sorted by priority
    */
    getCategoriesSortedByPriority(treeList){

      let leftCategories = [];
      let sortedResult = [];

      if ( treeList.children && treeList.children.length){

        treeList.children.map( child => {

          // //console.log('pushing: ', child)
          // if ( !child.headline ){
          //   leftCategories.push(child);
          // }

          if (child.children && child.children.length){

            child.children.map( secondchild => {

              //console.log('pushing: ', secondchild)

              leftCategories.push(secondchild);
            });
          }
        });

        //console.log('!!!! leftCategories: ', leftCategories,this.sortByPriority(leftCategories))

        return this.sortByPriority(leftCategories);
      }
    }

    /**
     * @param categories - categories objects
     * @returns categories sorted by priority
    */
    sortByPriority(categories){
      return categories.sort( (a,b) => {

        const aPriority = parseInt(a.priority);
        const bPriority = parseInt(b.priority);

        if ( !isNaN(aPriority) && !isNaN(bPriority) ){
          return aPriority - bPriority;
        }else if( isNaN(aPriority) ){
            return +1;
        }else{
            return -1;
        }
      })
    }

    /**
     *
     * @param categories - thumbnail item categories
     * @returns category icon based on priority
    */
    getCategoryIcon(categories){

      if (categories.length){
        const treeList = { ...this.state.filtersSection.treeList };

        const leftCategories = this.getCategoriesSortedByPriority(treeList);

        const matchedCategories = categories.map( category => {
          const matched = leftCategories.filter( leftcat => { return leftcat.module == category });
          if(matched.length){
            return matched[0];
          }
        });

        const sortedMatchedCategories = this.sortByPriority(matchedCategories);

        //console.log('CHECK!:     ', sortedMatchedCategories, matchedCategories, leftCategories)

        if (sortedMatchedCategories.length){
          return sortedMatchedCategories[0] && sortedMatchedCategories[0].iconUrl !== "" ? sortedMatchedCategories[0].iconUrl : defaultIcon;
        }else{
          return defaultIcon;
        }

      }else{
        return defaultIcon;
      }

    }

}
