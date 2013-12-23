'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
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
        marionette: '../bower_components/marionette/lib/backbone.marionette'
    }
});

require([
    'lib/dependencies', // Important to load (loads other properties)
    'controllers/application'
], function (config, ApplicationController) {
    new ApplicationController().start();
});
