var keystone = require('keystone')
var async = require('async')
var ClientCategory = keystone.list('ClientCategory')
var Client = keystone.list('Client')
var ProfilePage = keystone.list('ProfilePage')

exports = module.exports = function(req, res) {
  
  var locals = res.locals
  var view = new keystone.View(req, res)
  
  locals.bodyClass = 'clients'

  async.parallel(
    {
      categories: function (cb) {
        ClientCategory.model.find()
        .exec(function (err, categories) {
          cb(err, categories)
        })
      },

      clients: function (cb) {
        Client.model.find()
        .exec(function (err, clients) {
          cb(err, clients)
        })
      },

      profilePage: function (cb) {
        ProfilePage.model.findOne()
        .where({ slug: 'clients' })
        .exec(function (err, profilePage) {
          cb(err, profilePage)
        })
      }
    },

    function (err, results) {
      if (err) {
        console.error(err)
        return view.render('500')
      }

      if (results.profilePage) locals.profilePage = results.profilePage
      locals.clients = results.clients
      locals.categories = results.categories
      view.render('clients')
    })
}
