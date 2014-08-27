var keystone = require('keystone')
var Types = keystone.Field.Types

var ProjectCategory = new keystone.List('ProjectCategory',
  { 
    autokey: { path: 'slug', from: 'name', unique: true },
    sortable: true
  }
)

ProjectCategory.add({
  name: {
    type: String,
    required: true,
    initial: true
  },
  sidebarContent: {
    type: Types.Html,
    wysiwyg: true,
    height: 300,
    initial: true
  },
  image: {
    type: Types.CloudinaryImage
  }
})

ProjectCategory.register()
