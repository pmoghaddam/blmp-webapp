/*global mocha*/
'use strict';

require.config({
    baseUrl: '/scripts',
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery']
        },
        marionette: {
            deps: ['jquery', 'underscore', 'backbone'],
            exports: 'Marionette'
        }
    },
    paths: {
        q: '../bower_components/q/q',
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        marionette: '../bower_components/marionette/lib/backbone.marionette',

        // Bootstrap components
        'bootstrap.modal': '../bower_components/bootstrap/js/modal'
    }
});

/**
 * Due to how Grunt mounts the test folder, 'test' is actually
 * incorporated into the 'app' and '.tmp' folder. They operate
 * as one big application.
 */
var specFolder = '../../spec/';
require([
    'lib/blpm', // Important to load (loads other properties)
    specFolder + 'test'
], function () {
    mocha.run();
});