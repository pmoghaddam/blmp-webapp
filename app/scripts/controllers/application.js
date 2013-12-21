/*global define*/

define([
    'jquery',
    'backbone',
    'underscore',
    'controllers/login'
], function ($, Backbone, _, LoginController) {
    'use strict';

    var ApplicationController = Backbone.Controller.extend({
        start: function () {
            Backbone.history.start();

            // Setup controllers
            this.controllers = {
                login: new LoginController()
            };

            // Start controllers
            _.each(this.controllers, function (controller) {
                controller.start();
            });

            // TODO: Add application view
        }
    });

    return ApplicationController;
});
