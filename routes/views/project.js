var keystone = require('keystone')
var Project = keystone.list('Project')
var ProjectCategory = keystone.list('ProjectCategory')

exports = module.exports = function(req, res) {
  
  var locals = res.locals
  var view = new keystone.View(req, res)
  
  locals.bodyClass = 'project'

  var slug = req.params.slug

  Project.model.findOne()
  .where({'slug': slug})
  .populate('category')
  .exec(function (err, project) {
    if (err) console.error(err)

    locals.project = project

    view.render('project')
  })
}
