var keystone = require('keystone')
var Types = keystone.Field.Types

var Affiliation = new keystone.List('Affiliation',
  {
    autokey: { path: 'slug', from: 'name', unique: true },
    sortable: true
  }
)

Affiliation.add({
  name: {
    type: String,
    required: true,
    initial: true
  },
  link: {
    type: String,
    initial: true
  },
  description: {
    type: Types.Html,
    wysiwyg: true,
    height: 300,
    initial: true,
  },
  image: {
    type: Types.CloudinaryImage
  }
})

Affiliation.register()
