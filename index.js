'use strict'

var debug = require('debug')('pkg-config')
var path = require('path')
var find = require('find-root')
var extend = require('xtend')

module.exports = function (namespace, options, fallback) {
  var opts = extend({
    root: 'config',
    cwd: process.cwd()
  }, options || {})

  try {
    var root = find(opts.cwd)

    if (!root) {
      debug('could not find at %s', opts.cwd)

      return
    }

    debug('found root at %s', root)

    var pkg = require(path.join(root, 'package.json'))

    debug('found package.json at %s', root)

    // where should we look under?
    var parent = opts.root ? pkg[opts.root] : pkg

    // do we have a custom namespace?
    var config = namespace ? parent[namespace] : parent

    // return found result or default
    return config ? config : fallback
  } catch (e) {
    debug(e.message)
  }
}
