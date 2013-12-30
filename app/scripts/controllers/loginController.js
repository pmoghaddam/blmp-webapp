/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'lib/blpm',
    'services/authentication',
    'services/socket',
    'views/layouts/loginLayout'
], function ($, _, Backbone, BLPM, AuthService, SocketService, LoginLayout) {
    'use strict';

    var LoginController = BLPM.Controller.extend({

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
