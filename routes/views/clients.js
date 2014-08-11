var keystone = require('keystone')
var async = require('async')
var ClientCategory = keystone.list('ClientCategory')
var Client = keystone.list('Client')

exports = module.exports = function(req, res) {
  
  var locals = res.locals
  var view = new keystone.View(req, res)
  
  locals.bodyClass = 'clients'

  async.parallel(
    {
      categories: function (cb) {
        ClientCategory.model.find()
        .populate('category')
        .exec(function (err, categories) {
          cb(err, categories)
        })
      },

      clients: function (cb) {
        Client.model.find()
        .populate('category')
        .exec(function (err, clients) {
          cb(err, clients)
        })
      }
    },

    function (err, results) {
      if (err) {
        console.error(err)
        return view.render('500')
      }
      locals.clients = results.clients
      locals.categories = results.categories
      view.render('clients')
    })
}
