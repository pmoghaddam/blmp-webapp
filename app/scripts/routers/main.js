/*global define*/

define([
    'jquery',
    'backbone',
    'q',
    'services/socket'
], function ($, Backbone, Q, SocketService) {
    'use strict';

    var LoginRouter = Backbone.Router.extend({
        routes: {
            '': 'tasks',
            'login': 'login',
            'logout': 'logout',
            'tasks': 'tasks'
        },

        initialize: function (options) {
            this.controllers = options.controllers;

            this.socketService = new SocketService();
        },

        authenticate: function () {
            var me = this;
            var deferred = Q.defer();

            var socket = this.socketService.getSocket();
            var connected = socket && socket.socket.connected;
            if (connected) {
                deferred.resolve(true);
            } else {
                this.socketService.connect().then(function () {
                    deferred.resolve(true);
                }, function () {
                    me.navigate('login', {trigger: true});
                    deferred.reject(new Error('Not logged in'));
                });
            }

            return deferred.promise;
        },

        index: function () {
            var me = this;

            this.authenticate().then(function () {
                me.controllers.login.login();
            });
        },

        login: function () {
            this.controllers.login.login();
        },

        tasks: function () {
            var me = this;

            this.authenticate().then(function () {
                me.controllers.task.list();
            });
        },

        logout: function () {
            // TODO: Implement logout logic
        }


    });

    return LoginRouter;
});
