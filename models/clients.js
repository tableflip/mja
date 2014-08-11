var keystone = require('keystone')
var Types = keystone.Field.Types

var Client = new keystone.List('Client',
  {
    autokey: { path: 'slug', from: 'name', unique: true },
    sortable: true
  }
)

Client.add({
  name: {
    type: String,
    required: true,
    initial: true
  },
  category: {
    type: Types.Relationship,
    ref: 'ClientCategory'
  }
})

Client.register()
