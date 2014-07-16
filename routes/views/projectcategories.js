var keystone = require('keystone')
var async = require('async')
var Page = keystone.list('Page')
var ProjectCategory = keystone.list('ProjectCategory')

exports = module.exports = function(req, res) {
  
  var locals = res.locals
  var view = new keystone.View(req, res)
  
  // Set locals
  locals.section = 'projectcategories'
  locals.bodyClass = 'projectcategories'

  var asyncTasks = [
    function (cb) {
      ProjectCategory.model.find()
      .exec(function (err, categories) {
        if (err) return cb(err)
        cb(null, categories)
      })
    },
    function (cb) {
      Page.model.findOne()
      .where({'title': 'Projects'})
      .exec(function (err, page) {
        if (err) return cb(err)
        cb(null, page)
      })
    }
  ]

  async.parallel(asyncTasks, function (err, results) {
    if (err) console.error(err)
    
    locals.categories = results[0]
    locals.page = results[1]
    view.render('projectcategories')
  })
  
}
