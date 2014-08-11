var keystone = require('keystone')

var ClientCategory = new keystone.List('ClientCategory',
  { autokey: { path: 'slug', from: 'title', unique: true } }
);

ClientCategory.add({
  name: {
    type: String,
    required: true,
    initial: true
  }
})

ClientCategory.register()
