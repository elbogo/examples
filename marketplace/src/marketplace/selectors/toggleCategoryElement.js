/**
 * if categories has current item - remove from categories \ if not add it
 * @param categories - this.state.filtersAsideSection.selectedFilters.categories
 * @param item - clicked item
 * @returns {*} - new categories array
 */
export function toggleCategoryElement(array, item) {
    //if found in array, delete from them
    let matchedIndex = 0;
    const contains = array.filter( (el,index) => { if ( el.id  == item.id ){ matchedIndex = index; return true;} }).length !== 0;

    contains ?  array.splice( matchedIndex, 1) : array.push(item) ;

    return array;
}
