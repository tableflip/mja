var keystone = require('keystone')
var gm = require('gm').subClass({ imageMagick: true })
var mkdirp = require('mkdirp')
var path = require('path')
var async = require('async')
var Types = keystone.Field.Types

var HomepageUpdate = new keystone.List('HomepageUpdate',
  {
    autokey: { path: 'slug', from: 'title', unique: true },
    map: { name: 'title' },
    sortable: true
  }
)

var savePath = path.join(__dirname,'..','public','images','homepageupdates','original')

mkdirp(savePath, function (er) {
  if (er) console.error('Failed to create image upload directory', savePath, er)
})

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
    dest: savePath,
    post: { move: resizeImage }
  },
  content: {
    type: Types.Html,
    wysiwyg: true,
    height: 500,
    initial: true,
    required: true
  }
})

HomepageUpdate.register()

function resizeImage (update, request, fileData, next) {
  var srcPath = path.join(fileData.path, fileData.filename)
  var thumbDestPath = path.join(fileData.path, '..', 'thumb', fileData.filename)
  var largeDestPath = path.join(fileData.path, '..', 'large', fileData.filename)

  async.parallel([
    function (cb) {
      gm(srcPath)
      .resize(800)
      .write(largeDestPath, cb)
    },

    function (cb) {
      gm(srcPath)
      .resize(200)
      .crop(200, 150)
      .write(thumbDestPath, cb)
    }
  ], function (err) {
    if (err) console.error(err)
    next()
  })
}
