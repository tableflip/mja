var keystone = require('keystone')
var Types = keystone.Field.Types

var Project = new keystone.List('Project',
  {
    autokey: { path: 'slug', from: 'name', unique: true },
    sortable: true
  }
)

Project.add({
  name: {
    type: String,
    required: true,
    initial: true
  },
  category: {
    type: Types.Relationship,
    ref: 'ProjectCategory',
    initial: true
  },
  video: {
    type: String,
    label: 'Youtube/Vimeo URL'
  },
  images: {
    type: Types.CloudinaryImages
  },
  description: {
    type: Types.Html,
    wysiwyg: true,
    height: 300,
    initial: true,
    required: true
  }
})

Project.register()
