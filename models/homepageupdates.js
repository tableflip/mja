var keystone = require('keystone')
var Types = keystone.Field.Types

var HomepageUpdate = new keystone.List('HomepageUpdate',
  {
    autokey: { path: 'slug', from: 'title', unique: true },
    map: { name: 'title' },
    sortable: true
  }
)

HomepageUpdate.add({
  title: {
    type: String,
    required: true,
    initial: true
  },
  type: {
    type: String,
    initial: true
  },
  published: {
    type: Boolean,
    'default': false
  },
  publishedDate: {
    type: Date,
    'default': Date.now
  },
  image: {
    type: Types.CloudinaryImage
  },
  content: {
    type: Types.Html,
    wysiwyg: true,
    'images': true,
    height: 500
  },
  excerpt: {
    type: Types.Html,
    wysiwyg: true,
    height: 150,
    initial: true
  }
})

HomepageUpdate.register()
