/*global define*/

define([
    'jquery',
    'backbone',
    'services/authentication',
    'views/login'
], function ($, Backbone, AuthService, LoginView) {
    'use strict';

    var LoginController = Backbone.Controller.extend({
        start: function () {
            // Setup services
            this.authService = new AuthService();

            // Setup view
            var loginView = new LoginView({el: '#app'});
            this.addListeners(loginView);
            loginView.render();
        },

        addListeners: function (view) {
            view.on('login', this.onLogin, this);
        },

        onLogin: function (credentials) {
            this.authService.login(credentials).then(function (data) {
                console.log(data);
            });
        }
    });

    return LoginController;
});
