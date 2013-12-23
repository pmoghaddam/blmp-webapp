/*global define*/

define([
    'jquery',
    'backbone',
    'underscore',
    'controllers/login',
    'controllers/task',
    'routers/main'
], function ($, Backbone, _, LoginController, TaskController, MainRouter) {
    'use strict';

    var ApplicationController = Backbone.Controller.extend({
        start: function () {
            // Setup controllers
            this.controllers = {
                application: this,
                login: new LoginController(),
                task: new TaskController()
            };

            // Setup routers
            new MainRouter({controllers: this.controllers});

            // Start history once everything is ready
            Backbone.history.start();
        }
    });

    return ApplicationController;
});
