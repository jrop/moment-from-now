'use strict'

const assert = require('assert')
const fromNow = require('./index')

describe('fromNow()', function() {
	it('now', () => assert.equal(fromNow(new Date()), 'now'))
	it('now (499ms)', () => assert.equal(fromNow(new Date().getTime() + 499), 'now'))
	it('now (-499ms)', () => assert.equal(fromNow(new Date().getTime() - 499), 'now'))
	it('1 second (501ms)', () => assert.equal(fromNow(new Date().getTime() + 501), '1 second'))
	it('1 second ago (501ms)', () => assert.equal(fromNow(new Date().getTime() - 501), '1 second ago'))
	it('30 seconds', () => assert.equal(fromNow(new Date().getTime() + 30 * 1000), '30 seconds'))
	it('30 seconds ago', () => assert.equal(fromNow(new Date().getTime() - 30 * 1000), '30 seconds ago'))
	it('1 minute', () => assert.equal(fromNow(new Date().getTime() + 50 * 1000), '1 minute'))
	it('1 hour', () => assert.equal(fromNow(new Date().getTime() + 46 * 60 * 1000), '1 hour'))
	it('1 day', () => assert.equal(fromNow(new Date().getTime() + 23 * 60 * 60 * 1000), '1 day'))
	it('1 month', () => assert.equal(fromNow(new Date().getTime() + 27 * 24 * 60 * 60 * 1000), '1 month'))
	it('1 year', () => assert.equal(fromNow(new Date().getTime() + 364 * 24 * 60 * 60 * 1000), '1 year'))
})
