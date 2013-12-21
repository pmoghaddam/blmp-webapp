/*global define*/

define([
    'jquery',
    'backbone',
    'views/login'
], function ($, Backbone, LoginView) {
    'use strict';

    var ApplicationController = Backbone.Controller.extend({
        start: function () {
            Backbone.history.start();

            // TODO: Add application view
            var loginView = new LoginView({el: '#app'});
            loginView.render();
        }
    });

    return ApplicationController;
});
