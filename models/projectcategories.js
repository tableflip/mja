var keystone = require('keystone')
var gm = require('gm')
var path = require('path')
var async = require('async')
var Types = keystone.Field.Types

var ProjectCategory = new keystone.List('ProjectCategory',
  { autokey: { path: 'slug', from: 'title', unique: true } }
)

ProjectCategory.add({
  title: {
    type: String,
    required: true,
    initial: true
  },
  description: {
    type: String,
    initial: true
  },
  published: {
    type: Boolean,
    'default': false
  },
  image: {
    type: Types.LocalFile,
    dest: __dirname + '/../public/images/projectcategories/original',
    post: { move: resizeImage }
  }
})

ProjectCategory.register()

function resizeImage (update, request, fileData, next) {
  var srcPath = path.join(fileData.path, fileData.filename)
  var thumbDestPath = path.join(fileData.path, '../thumb/', fileData.filename)
  var largeDestPath = path.join(fileData.path, '../large/', fileData.filename)

  console.log(thumbDestPath, largeDestPath)

  async.parallel([
    function (cb) {
      gm(srcPath)
      .resize(800)
      .write(largeDestPath, function (err) {
        if (err) {
          console.error(err)
          return next()
        }
        cb(null)
      })
    },

    function (cb) {
      gm(srcPath)
      .resize(200)
      .crop(200, 150)
      .write(thumbDestPath, function (err) {
        if (err) {
          console.error(err)
          return next()
        } cb(null)
      })
    }
  ], function (err) {
    if (err) console.error(err)
    next()
  })
}
