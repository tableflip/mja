var keystone = require('keystone')
var gm = require('gm')
var path = require('path')
var async = require('async')
var Types = keystone.Field.Types

var Project = new keystone.List('Project',
  { autokey: { path: 'slug', from: 'title', unique: true } }
)

Project.add({
  title: {
    type: String,
    required: true,
    initial: true
  },
  category: {
    type: Types.Relationship,
    ref: 'ProjectCategory',
  },
  published: {
    type: Boolean,
    'default': false
  },
  images: {
    type: Types.LocalFiles,
    dest: __dirname + '/../public/images/projects/original',
    post: { move: resizeImage }
  },
  description: {
    type: String,
    initial: true
  }
})

Project.register()

function resizeImage (project, request, fileData, next) {
  var srcPath = path.join(fileData.path, fileData.filename)
  var thumbDestPath = path.join(fileData.path, '../thumb/', fileData.filename)
  var largeDestPath = path.join(fileData.path, '../large/', fileData.filename)

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

    // Don't call next unless this is the last file to process
    var lastImage = project.images[project.images.length - 1]
    if (err || fileData.filename === lastImage.filename) next()
  })
}
