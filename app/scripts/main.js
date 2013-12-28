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
        }
    },
    paths: {
        q: '../bower_components/q/q',
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',

        // Bootstrap components
        'bootstrap.modal': '../bower_components/bootstrap/js/modal'
    }
});

require([
    'lib/dependencies', // Important to load (loads other properties)
    'controllers/application'
], function (config, ApplicationController) {
    new ApplicationController().start();
});
