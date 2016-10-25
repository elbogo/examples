/**
 * buildData for Select in Links Section
 * @param list - array of places
 * @returns {*} - new structure
 */
export default function buildSelectData(list) {
    return list.map(
        value => ({
            value: value.name,
            label: value.name,
            id: value.id,
            placeID: value.placeID
        })
    );
}
