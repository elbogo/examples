export function hasEmptyFields(object) {

  let empty = [];

  for (let field in object) {
    if (field !== 'new' && (!object[field] || (object[field] && typeof object[field].trim == 'function' && !object[field].trim()) ) ) {
      console.log('empty field: ', field)
      empty.push(object[field]);
    }
  }

  return empty.length > 0;
}
