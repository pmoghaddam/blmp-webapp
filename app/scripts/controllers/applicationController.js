/*global define*/

define([
    'jquery',
    'backbone',
    'lib/blpm',
    'underscore',
    'routers/router'
], function ($, Backbone, BLPM, _, Router) {
    'use strict';

    var ApplicationController = BLPM.Controller.extend({
        start: function () {
            // Setup routers
            new Router();

            // Start history once everything is ready
            Backbone.history.start();
        }
    });

    return ApplicationController;
});
