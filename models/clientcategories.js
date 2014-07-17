var keystone = require('keystone')
var gm = require('gm')
var path = require('path')
var async = require('async')
var Types = keystone.Field.Types

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

ClientCategory.register();
