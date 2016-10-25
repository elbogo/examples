/**
 * Created by t_t on 3/7/2016.
 */
/**
 * if categories has current item - remove from categories \ if not add it
 * @param categories - this.state.filtersAsideSection.selectedFilters.categories
 * @param item - clicked item
 * @returns {*} - new categories array
 */
export function toggleArrayElement(array, item) {
    //if found in array, delete from them

    console.log('array: ', array, item)
    var ifContains = array.indexOf(item);

    (ifContains == -1) ? array.push(item) : array.splice(ifContains, 1);

    return array;
}
