var async = require('async')
var keystone = require('keystone')
var Project = keystone.list('Project')
var ProjectCategory = keystone.list('ProjectCategory')

exports = module.exports = function (req, res) {

  var locals = res.locals
  var view = new keystone.View(req, res)
  var slug = req.params.slug

  async.waterfall(
    [
      function project (cb) {
        findProjectBySlug(slug, cb)
      },
      function next (project, cb) {
        findNextProject(project, function (err, res) {
          cb(err, { project: project, next: res})
        })
      }
    ],
    function render (err, res) {
      if (err) {
        console.error(err)
        return view.render('500')
      }
      locals.bodyClass = 'project'
      locals.project = res.project
      locals.next = res.next
      view.render('project')
    }
  )
}

function findProjectBySlug (slug, cb) {
  Project.model.findOne()
    .where({'slug': slug})
    .populate('category')
    .exec(cb)
}

function findFirstCategory (cb) {
  ProjectCategory.model.findOne()
    .sort('sortOrder')
    .exec(cb)
}

function findNextCategory (category, cb) {
  ProjectCategory.model.findOne()
    .where({sortOrder: { $gt: category.sortOrder }})
    .sort('sortOrder')
    .exec(function (err, res) {
      if (res) {
        cb(err, res)
      } else {
        findFirstCategory(cb)
      }
    })
}

function findFirstProject (category, cb) {
  Project.model.findOne()
    .where({ category: category._id })
    .sort('sortOrder')
    .select('name slug sortOrder category')
    .populate('category')
    .exec(cb)
}

function findNextProject (project, cb) {
  Project.model.findOne()
    .where({
      category: project.category._id,
      sortOrder: { $gt: project.sortOrder }
    })
    .sort('+sortOrder')
    .select('name slug sortOrder category')
    .populate('category')
    .exec(function (err, res) {
      if (res) {
        cb(err, res)
      } else {
        findNextCategory(project.category, function (err, nextCategory) {
          if (err) return cb(err)
          findFirstProject(nextCategory, cb)
        })
      }
    })
}
