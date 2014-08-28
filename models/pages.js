var keystone = require('keystone')
var Types = keystone.Field.Types

var Page = new keystone.List('Page',
  { 
    autokey: { path: 'slug', from: 'name', unique: true },
    //nocreate: true
  }
)

Page.add({
  name: {
    type: String,
    required: true,
    initial: true
  },
  sidebarContent: {
    type: Types.Html,
    wysiwyg: true,
    height: 300
  }
})

Page.register()
