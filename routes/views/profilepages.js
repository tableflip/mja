var keystone = require('keystone')
var async = require('async')
var Page = keystone.list('Page')
var ProfilePage = keystone.list('ProfilePage')

exports = module.exports = function(req, res) {
  
  var locals = res.locals
  var view = new keystone.View(req, res)
  
  locals.bodyClass = 'profilepages'

  async.parallel(
    {
      profilePages: function (cb) {
        ProfilePage.model.find()
        .exec(function (err, categories) {
          cb(err, categories)
        })
      },

      page: function (cb) {
        Page.model.findOne()
        .where({ name: 'Profile' })
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
      locals.profilePages = results.profilePages
      view.render('profilepages')
    })
}
