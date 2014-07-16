var keystone = require('keystone')
var gm = require('gm')
var path = require('path')
var async = require('async')
var Types = keystone.Field.Types

var Page = new keystone.List('Page',
  { autokey: { path: 'slug', from: 'title', unique: true } }
);

Page.add({
  title: {
    type: String,
    required: true,
    initial: true
  },
  blurb: {
    type: String,
    initial: true
  }
})

Page.register();
