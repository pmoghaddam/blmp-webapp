/*global define*/

define([
    'jquery',
    'backbone',
    'underscore',
    'controllers/login',
    'controllers/task'
], function ($, Backbone, _, LoginController, TaskController) {
    'use strict';

    var ApplicationController = Backbone.Controller.extend({
        start: function () {
            // Setup controllers
            this.controllers = {
                login: new LoginController(),
                task: new TaskController()
            };

            // Start controllers
            _.each(this.controllers, function (controller) {
                controller.start();
            });

            // Start history once everything is ready
            Backbone.history.start();
        }
    });

    return ApplicationController;
});
