var keystone = require('keystone')
var gm = require('gm').subClass({ imageMagick: true })
var mkdirp = require('mkdirp')
var path = require('path')
var async = require('async')
var Types = keystone.Field.Types

var ProfilePage = new keystone.List('ProfilePage',
  {
    autokey: { path: 'slug', from: 'name', unique: true },
    sortable: true
  }
)

var savePath = path.join(__dirname,'..','public','images','profilepages','original')

mkdirp(savePath, function (er) {
  if (er) console.error('Failed to create image upload directory', savePath, er)
})

ProfilePage.add({
  name: {
    type: String,
    required: true,
    initial: true
  },
  image: {
    type: Types.LocalFile,
    dest: savePath,
    post: { move: resizeImage }
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

function resizeImage (update, request, fileData, next) {
  var srcPath = path.join(fileData.path, fileData.filename)
  var thumbDestPath = path.join(fileData.path, '..', 'thumb', fileData.filename)
  var largeDestPath = path.join(fileData.path, '..', 'large', fileData.filename)

  async.parallel([
    function (cb) {
      gm(srcPath)
      .resize(800)
      .write(largeDestPath, function (err) {
        cb(err)
      })
    },

    function (cb) {
      gm(srcPath)
      .resize(200)
      .crop(200, 150)
      .write(thumbDestPath, function (err) {
        cb(err)
      })
    }
  ], function (err) {
    if (err) console.error(err)
    next()
  })
}
