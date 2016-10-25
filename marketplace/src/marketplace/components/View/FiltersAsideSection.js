/**
 * Created by t_t on 3/7/2016.
 */
import React        from 'react';
import RetinaImage  from 'react-retina-image';

//components
import CategorySection      from './CategorySection';
import Select               from 'react-select';

import {toggleArrayElement} from '../../selectors/toggleArrayElement'

import createNodeId         from '../../helpers/createNodeId';
import {toggleCategoryElement} from '../../selectors/toggleCategoryElement';

//styles
import './FiltersAsideSection.css'
import 'react-select/dist/react-select.css';




export default function FiltersAsideSection(props) {

    const {value, onChange, colors,isMobile} = props;
    const selectData =  buildDataForSelect(value.tagsList);
    const categories = value.treeList.children;

    return <div className="filters-aside">
        <h2 className="title title--underscored">Filter by category</h2>

        {
            categories.map(item => <CategorySection key={item.id}
                                                    value={value}
                                                    item={item}
                                                    onChange={ onChange }
                                                    colors={colors}/>)
        }

        { categories.length > 0 &&<Select name="categories-selection" className="categories-select"
                                        placeholder="select categories..."
                                        value={ value.selectedFilters.categories }
                                        clearable={ false }
                                        searchable={ false }
                                        multi={ true }
                                        options={  buildDataForCategorySelect(categories,colors) }
                                        onChange={ selectedItems => onChangeCategories(selectedItems, onChange, value) } />
        }

        <h2 className="title title--underscored">Add tag filter</h2>
        {
            selectData.length > 0 &&<Select name="tags-selection" className="tags-select"
                                            placeholder="select tag..."
                                            clearable={ false }
                                            value={ value.selectedFilters.tags }
                                            searchable={ false }
                                            multi={ true }
                                            options={ selectData }
                                            onChange={ selectedItems => onChangeTags(selectedItems, props) }/>
        }

        {
          isMobile && <div className="applied-filters"> <span className="filters-title">Applied filters</span>
                            <Select name="mobile-filers-selection" className="mobile-filers-selection"
                                            clearable={ false }
                                            placeholder=""
                                            value={ value.selectedFilters.categories.concat(value.selectedFilters.tags) }
                                            searchable={ false }
                                            multi={ true }
                                            onChange={ selectedItems => onChangeMobFilters(selectedItems, props) }/>
                      </div>
        }

        <ul className="selected-tags">
            {
                value.selectedFilters.tags.map(item => <li key={createNodeId()}>{item.value}
                    <span className="delete" onClick={e => deleteTag(e, item, props)}/>
                </li>)
            }
        </ul>
    </div>
}
/**
 * delete tag, and return tag to selection
 * @param e - event
 * @param item - clicked tag
 * @param value - data from root
 * @param onChange - event from root
 */
function deleteTag(e, item, {value, onChange}){

    const newValue = {
        ...value,
        selectedFilters: {
            ...value.selectedFilters,
            tags: toggleArrayElement(value.selectedFilters.tags, item),
            tagsList: toggleArrayElement(value.tagsList, item.value)
        }
    };

    onChange({
        value: newValue
    })
}

function onChangeMobFilters(items,props){

  console.log('check mob filters: ', items, props)

  let tags = [];
  const categories = items.filter( (item) => {

    if(item.hasOwnProperty('active')){
      return true;
    }else{
      tags.push(item);
      return false;
    }

  })

    console.log('categories: ', categories);
    console.log('tags: ', tags);

    if(props.value.selectedFilters.tags.length !== tags.length){
      onChangeTags(tags,props);
    }

    if(props.value.selectedFilters.categories.length !== categories.length){
      onChangeCategories(categories,props.onChange,props.value);
    }



}
/**
 * On select tag
 * @param selectedItem - selected tag
 * @param value - data from root
 * @param onChange - event from root
 */
function onChangeTags (selectedItems, {value, onChange}) {


  //adding tag
  if(selectedItems.length && selectedItems.length > value.selectedFilters.tags.length){
    const lastItem = selectedItems[selectedItems.length - 1];


      const newValue = {
          ...value,
          selectedFilters: {
              ...value.selectedFilters,
              tags: toggleArrayElement(value.selectedFilters.tags, lastItem),
              tagsList: toggleArrayElement(value.tagsList, lastItem.value)
          }
      };

      onChange({
          value: newValue
      })
  }
  //removing tag
  else if(selectedItems.length && selectedItems.length < value.selectedFilters.tags.length ){

    onChange({
        value:  {
            ...value,
            selectedFilters: {
                ...value.selectedFilters,
                tags: selectedItems
            }
          }
        })
  }
  // clearing tags
  else{
    onChange({
        value: {
            ...value,
            selectedFilters: {
                ...value.selectedFilters,
                tags: []
            }
        }
    })
  }


}
/**
 * build model for select
 * @param array - list of tags
 * @returns {*} - [{ label: value, value: value }, ....]
 */
function buildDataForSelect(array) {

    return array.map( value => {
        return {
            label: value,
            value: value
        }
    });

}


/**
 * build model for select
 * @param array - list of tags
 * @returns {*} - [{ label: value, value: value }, ....]
 */
function buildDataForCategorySelect(array,colors) {

    let resultArr = [];

    console.log('colors: ', colors)

    array.map( item => {

        //push heading
        resultArr.push({
            id: item.id,
            label: item.module,
            value: item.module,
            style: {color: colors.heading},
            disabled: true
        });
        //devider line
        resultArr.push({
            label: '--------------------',
            value: '--------------------',
            disabled: true
        });

        //push selectable category item
        if (item.children && item.children.length){
            item.children.map( child => {

              let {module} = child;

              child.value = module;
              child.label = module

              resultArr.push(child);
            })
        }

    });

    return resultArr;


}

/**
 * trigger item click. if clicked remove active and remove from selectedFilters
 * @param e - event
 * @param value - data from state
 * @param onChange - event from state
 * @param item - category item
 */
function onChangeCategories(items, onChange, value) {

  console.log('test: ', items, value);

  //adding category
  if(items.length && items.length > value.selectedFilters.categories.length){

    const lastItem = items[items.length - 1];

    lastItem.active = !lastItem.active;

    onChange({
        value: {
            ...value,
            selectedFilters: {
                ...value.selectedFilters,
                categories: toggleCategoryElement(value.selectedFilters.categories, lastItem)
            }
        }
    })

  }
  //removing category
  else if(items.length && items.length < value.selectedFilters.categories.length){

    //disable removed active state
     value.treeList.children = value.treeList.children.map( category => {

       if(category.children.length){

         category.children = category.children.map( child => {
           child.active = false;

           items.map( selected => {
              if(child.id == selected.id){
                child.active = true;
              }
            });

            return child;
         });
       }

       return category;
     });

    onChange({
        value: {
            ...value,
            selectedFilters: {
                ...value.selectedFilters,
                categories: items,
                treeList: value.treeList

            }
        }
    })

  }
  //clearing categories
  else{

    if (value.treeList.children.length){
      const inactive = value.treeList.children.map( child => {

        if (child.children.length){
          child.children = child.children.map( category => { category.active = false;  return category; })
        }
        return child;
      });
    }


    onChange({
        value: {
            ...value,
            selectedFilters: {
                ...value.selectedFilters,
                categories: []
            },
            treeList: typeof inactive !== 'undefined' ? inactive : value.treeList

        }
    })
  }
}
