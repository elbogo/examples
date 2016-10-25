const Realm = require('realm');

let realm = new Realm({
  schema: [{
    name: 'Task',
    properties: {
      name: 'string',
      description: 'string',
      dueTo: 'date',
      state: 'string',
      visible: 'bool'
    }
  }]
});

// make yourself some pleasure if don't have tasks
if (!realm.objects('Task').length){
  realm.write(() => {
    realm.create('Task', {
      name: 'Do work',
      description: 'few hours',
      dueTo: new Date(),
      state: 'in progress',
      visible: false
    });
  });
}


module.exports = realm;
