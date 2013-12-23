/*global define*/

define([
    'jquery',
    'backbone',
    'underscore',
    'routers/main'
], function ($, Backbone, _, MainRouter) {
    'use strict';

    var ApplicationController = Backbone.Controller.extend({
        start: function () {
            // Setup routers
            new MainRouter();

            // Start history once everything is ready
            Backbone.history.start();
        }
    });

    return ApplicationController;
});
