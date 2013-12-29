/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'lib/dispatcher',
    'services/authentication',
    'services/socket',
    'views/layouts/loginLayout'
], function ($, _, Backbone, dispatcher, AuthService, SocketService, LoginLayout) {
    'use strict';

    var LoginController = Backbone.Controller.extend({

        login: function () {
            var layout = new LoginLayout();
            this.showLayout(layout);

            layout.showLogin();
        },

        register: function () {
            var layout = new LoginLayout();
            this.showLayout(layout);

            layout.showRegistration();
        }
    });

    return LoginController;
});
