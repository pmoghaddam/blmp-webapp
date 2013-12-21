/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'services/authentication',
    'services/socket',
    'views/login'
], function ($, _, Backbone, AuthService, SocketService, LoginView) {
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
            var connectViaSocket = _.bind(this.socketService.connect, this.socketService);

            this.authService
                .login(credentials)
                .then(connectViaSocket)
                .then(function (socket) {
                    socket.on('tasks:list', function (tasks) {
                        console.log(tasks);
                    });

                    socket.emit('tasks:list');
                });
        }
    });

    return LoginController;
});
