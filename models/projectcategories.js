var keystone = require('keystone')
var gm = require('gm').subClass({ imageMagick: true })
var mkdirp = require('mkdirp')
var path = require('path')
var async = require('async')
var Types = keystone.Field.Types

var ProjectCategory = new keystone.List('ProjectCategory',
  { 
    autokey: { path: 'slug', from: 'name', unique: true },
    sortable: true
  }
)

var savePath = path.join(__dirname,'..','public','images','projectcategories','original')

mkdirp(savePath, function (er) {
  if (er) console.error('Failed to create image upload directory', savePath, er)
})

ProjectCategory.add({
  name: {
    type: String,
    required: true,
    initial: true
  },
  sidebarContent: {
    type: Types.Html,
    wysiwyg: true,
    height: 300,
    initial: true
  },
  image: {
    type: Types.LocalFile,
    dest: savePath,
    post: { move: resizeImage }
  }
})

ProjectCategory.register()

function resizeImage (update, request, fileData, next) {
  var srcPath = path.join(fileData.path, fileData.filename)
  var thumbDestPath = path.join(fileData.path, '..', 'thumb', fileData.filename)
  var largeDestPath = path.join(fileData.path, '..', 'large', fileData.filename)

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
