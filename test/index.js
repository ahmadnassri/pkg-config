/* global beforeEach, describe, it */

'use strict'

var config = require('..')
var path = require('path')
var should = require('should')
var fs = require('fs')
var Readable = require('stream').Readable

var options = {}

beforeEach(function (done) {
  options = {
    root: 'config',
    cwd: path.join(__dirname, 'fixtures')
  }

  done()
})

describe('pkg-config', function () {
  it('should get nothing', function (done) {
    should.not.exist(config())

    done()
  })

  it('should get fallback', function (done) {
    config(false, false, 'foo').should.equal('foo')

    done()
  })

  it('should fail at invalid directory', function (done) {
    should.not.exist(config(false, { cwd: 'foo' }))

    done()
  })

  describe('behave like npm.config', function () {
    it('should get the whole config object', function (done) {
      config(false, options).should.be.eql({ foo: { bar: 'baz' } })

      done()
    })

    it('should get custom namespace inside npm.config', function (done) {
      config('foo', options).should.be.eql({ bar: 'baz' })

      done()
    })
  })

  describe('custom root', function () {
    it('should find config', function (done) {
      options.root = 'custom'

      config('foo', options).should.be.equal('bar')

      done()
    })
  })

  describe('no root', function () {
    it('should get custom namespace with no root', function (done) {
      options.root = false

      config('custom', options).should.be.eql({ foo: 'bar' })

      done()
    })
  })

  describe('set cache to false', function () {
    var opt = { cwd: path.resolve('./tmp') }
    var pkgData = ''

    it('should write/create a mock of fixtures/package.json in tmp directory', function (done) {
      var r = fs.createReadStream(path.resolve('./test/fixtures/package.json'))

      r.on('error', function (err) {
        return done(err)
      })

      r.on('data', function (data) {
        if (data) {
          pkgData += data
        }
      })

      return fs.mkdir(path.resolve('./tmp'), function (err) {
        if (err && err.code !== 'EEXIST') {
          return done(err)
        }
        var w = fs.createWriteStream(path.resolve('./tmp/package.json'))

        r.pipe(w)

        w.on('finish', function () {
          return done()
        })

        w.on('error', function (err) {
          return done(err)
        })
      })
    })

    it('should cache tmp/package.json with requre', function (done) {
      config(false, opt).should.be.eql({ foo: { bar: 'baz' } })

      done()
    })

    it('should modify the tmp/package.json', function (done) {
      pkgData = JSON.parse(pkgData)
      pkgData.config.foo.bar = 'noop'

      var w = fs.createWriteStream(path.resolve('./tmp/package.json'))

      var rs = new Readable()
      rs.push(JSON.stringify(pkgData))
      rs.push(null)

      rs.pipe(w)

      w.on('finish', function () {
        return done()
      })

      w.on('error', function (err) {
        return done(err)
      })
    })

    it('should throw an error because cache is set to true by default', function (done) {
      try {
        config(false, opt).should.be.eql({ foo: { bar: 'noop' } })
      } catch (e) {
        return done()
      }

      done(new Error('cache options is not set to true by default'))
    })

    it('should bypass require cache', function (done) {
      opt.cache = false
      config(false, opt).should.be.eql({ foo: { bar: 'noop' } })

      done()
    })
  })
})
