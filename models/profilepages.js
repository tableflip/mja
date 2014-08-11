var keystone = require('keystone')
var gm = require('gm')
var path = require('path')
var async = require('async')
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
    type: Types.LocalFile,
    dest: __dirname + '/../public/images/profilepages/original',
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
  var thumbDestPath = path.join(fileData.path, '../thumb/', fileData.filename)
  var largeDestPath = path.join(fileData.path, '../large/', fileData.filename)

  console.log(thumbDestPath, largeDestPath)

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
