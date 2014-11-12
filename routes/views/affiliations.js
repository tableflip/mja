var keystone = require('keystone')
var async = require('async')
var Affiliation = keystone.list('Affiliation')
var ProfilePage = keystone.list('ProfilePage')

exports = module.exports = function(req, res) {
  
  var locals = res.locals,
    view = new keystone.View(req, res)
  
  locals.bodyClass = 'affiliations'

  async.parallel({

    affiliations: function (cb) {
      Affiliation.model.find()
      .sort({'sortOrder': '1'})
      .exec(function (err, affiliations) {
        if (err) console.error(err)
        cb(null, affiliations)
      })
    },

    page: function (cb) {
      ProfilePage.model.findOne()
      .where({ 'slug': 'affiliations-and-memberships' })
      .populate('category')
      .exec(function (err, page) {
        if (err) console.error(err)
        cb(null, page)
      })
    }
  }, 

  function (err, results) {
    if (err) console.error(err)

    res.locals.page = results.page
    res.locals.affiliations = results.affiliations

    console.log(res.locals)

    view.render('affiliations')
  })
}
