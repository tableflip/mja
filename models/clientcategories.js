var keystone = require('keystone')

var ClientCategory = new keystone.List('ClientCategory',
  {
    autokey: { path: 'slug', from: 'name', unique: true },
    sortable: true
  }
);

ClientCategory.add({
  name: {
    type: String,
    required: true,
    initial: true
  }
})

ClientCategory.register()
