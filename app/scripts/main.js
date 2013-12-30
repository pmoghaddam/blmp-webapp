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
        marionette: '../bower_components/marionette/lib/core/amd/backbone.marionette',
        'backbone.wreqr' : '../bower_components/marionette/public/javascripts/backbone.wreqr',
        'backbone.babysitter' : '../bower_components/marionette/public/javascripts/backbone.babysitter',

        // Bootstrap components
        'bootstrap.modal': '../bower_components/bootstrap/js/modal'
    }
});

require([
    'lib/blpm', // Important to load (loads other properties)
    'controllers/applicationController'
], function (config, ApplicationController) {
    new ApplicationController().start();
});
