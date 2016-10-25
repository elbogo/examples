/**
 *   on 2016-09-22.
 */

export function parentHashAvailable(){
    var i = 0;
    for (var key in parent.location){i++}
    return !!i;
}

export function pushHistoryToParent (location) {
    if (parentHashAvailable()) {
        parent.location.hash = location.pathname
    }
}

export function getCurrentPath(defaultHash='/'){
    if (parentHashAvailable()) {

        const hash = parent.location.hash.replace('#', '')

        if (hash != '' && hash != defaultHash) {
            return hash
        }
        
        return false;
    }
    return false
}