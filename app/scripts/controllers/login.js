/*global define*/

define([
    'jquery',
    'backbone',
    'services/authentication',
    'services/socket',
    'views/login'
], function ($, Backbone, AuthService, SocketService, LoginView) {
    'use strict';

    var LoginController = Backbone.Controller.extend({
        start: function () {
            // Setup services
            this.authService = new AuthService();
            this.socketService = new SocketService();

            // Setup view
            var loginView = new LoginView({el: '#app'});
            this.addListeners(loginView);
            loginView.render();
        },

        addListeners: function (view) {
            view.on('login', this.onLogin, this);
        },

        onLogin: function (credentials) {
            this.authService
                .login(credentials)
                .done(this.socketService.connect);
        }
    });

    return LoginController;
});
