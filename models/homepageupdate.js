var keystone = require('keystone'),
  Types = keystone.Field.Types;

var HomepageUpdate = new keystone.List('HomepageUpdate',
  { autokey: { path: 'slug', from: 'title', unique: true } }
);

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
    default: Date.now
  },
  showHeaderImage: {
    type: Boolean,
    'default': true
  },
  image: {
    type: Types.LocalFile,
    dest: __dirname + '/../public/images/homepageupdates/'
  },
  content: {
    type: Types.Html,
    wysiwyg: true,
    height: 500,
    initial: true,
    required: true
  }
});

HomepageUpdate.register();
