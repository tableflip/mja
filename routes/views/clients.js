var keystone = require('keystone')
var async = require('async')
var Client = keystone;.list('Client')

exports = module.exports = function(req, res) {
  
  var locals = res.locals
  var view = new keystone.View(req, res)
  
  locals.bodyClass = 'clients'

  ClientCategory.model.find()
  .populate('category')
  .exec(function (err, categories) {
    if (err) console.error(err)


    locals.clients = clients
    view.render('clients')
  })  
}
