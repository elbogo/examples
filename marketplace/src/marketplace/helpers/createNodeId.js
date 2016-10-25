let counter = 0;
/**
 * create some random and return it
 * @returns {string} - new id
 */
export default function createNodeId(){
    counter++;

    return Date.now() + '_' + (counter++) + '_' + Math.random();
}