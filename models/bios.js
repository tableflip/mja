var keystone = require('keystone')
var Types = keystone.Field.Types

var Bio = new keystone.List('Bio',
  {
    autokey: { path: 'slug', from: 'name', unique: true },
    sortable: true
  }
)

Bio.add({
  name: {
    type: String,
    required: true,
    initial: true
  },
  content: {
    type: Types.Html,
    wysiwyg: true,
    height: 300,
    initial: true,
    required: true
  },
  image: {
    type: Types.CloudinaryImage
  }
})

Bio.register()
