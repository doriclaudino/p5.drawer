'use strict'

const jsdom = require('jsdom')
const StorageShim = require('node-storage-shim')

// Setup the jsdom environment
// @see https://github.com/facebook/react/issues/5046
var instance = new jsdom.JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost'
})
const { document } = instance.window
global.document = document
global.window = document.defaultView
global.navigator = {
  userAgent: 'node.js'
}

// JSDOM doesn't support localStorage by default, so we have to fake it...
if (!global.window.localStorage) {
  global.window.localStorage = new StorageShim()
  global.window.sessionStorage = new StorageShim()
}

// take all properties of the window object and also attach it to the
// mocha global object
// The reason that we want to attach all the window properties to the mocha
// global object is because developers often write code that is meant for the
// browser without explicitly using the global environment object. For
// instance, in React the developers write:
//      navigator.userAgent.indexOf('Chrome') > -1
//      instead of:
//      window.navigator.userAgent.indexOf('Chrome') > -1
// Withing taking window.navigator and putting it on global.navigator, you
// would get an error like this when running your tests:
//      ReferenceError: navigator is not defined
propagateToGlobal(global.window)

function propagateToGlobal(window) {
  for (let key in window) {
    if (!window.hasOwnProperty(key)) continue
    if (key in global) continue

    global[key] = window[key]
  }
}
