var keystone = require('keystone')
var async = require('async')
var Page = keystone.list('Page')
var ProjectCategory = keystone.list('ProjectCategory')

exports = module.exports = function(req, res) {
  
  var locals = res.locals
  var view = new keystone.View(req, res)
  
  locals.bodyClass = 'projectcategories'

  async.parallel(
    {
      categories: function (cb) {
        ProjectCategory.model.find()
        .sort({ 'sortOrder': 1 })
        .exec(function (err, categories) {
          cb(err, categories)
        })
      },

      page: function (cb) {
        Page.model.findOne()
        .where({ name: 'Projects' })
        .exec(function (err, page) {
          cb(err, page)
        })
      }
    },

    function (err, results) {
      if (err) {
        console.error(err)
        return view.render('500')
      }

      locals.page = results.page
      locals.categories = results.categories
      view.render('projectcategories')
    }
  )
}
