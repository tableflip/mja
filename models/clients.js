var keystone = require('keystone')
var gm = require('gm')
var path = require('path')
var async = require('async')
var Types = keystone.Field.Types

var Client = new keystone.List('Client',
  { autokey: { path: 'slug', from: 'title', unique: true } }
);

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

Client.register();
