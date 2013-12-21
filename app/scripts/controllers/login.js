/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'lib/dispatcher',
    'services/authentication',
    'services/socket',
    'views/login'
], function ($, _, Backbone, dispatcher, AuthService, SocketService, LoginView) {
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
            var me = this;

            this.authService
                .login(credentials)
                .then(function() {
                    me.socketService.connect();
                })
                .then(function () {
                    dispatcher.trigger('loggedIn');
                });
        }
    });

    return LoginController;
});
