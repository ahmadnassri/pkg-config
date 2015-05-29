/* global beforeEach, describe, it */

'use strict'

var config = require('..')
var path = require('path')
var should = require('should')

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
})
