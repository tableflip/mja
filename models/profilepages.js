var keystone = require('keystone')
var Types = keystone.Field.Types

var ProfilePage = new keystone.List('ProfilePage',
  {
    autokey: { path: 'slug', from: 'name', unique: true },
    sortable: true
  }
)

ProfilePage.add({
  name: {
    type: String,
    required: true,
    initial: true
  },
  image: {
    type: Types.CloudinaryImage
  },
  content: {
    type: Types.Html,
    wysiwyg: true,
    height: 300,
    initial: true,
    required: true
  }
})

ProfilePage.register()
