/*global define*/

define([
    'jquery',
    'backbone',
    'lib/config',
    'q',
    'services/socket'
], function ($, Backbone, config, Q, SocketService) {
    'use strict';

    var q = Q;

    var AuthenticationService = Backbone.Service.extend({
        login: function (credentials) {
            var me = this;
            return q($.ajax({
                method: 'POST',
                url: config.url + '/v0/session',
                data: credentials,
                xhrFields: {
                    withCredentials: true
                }
            })).then(function () {
                    return me.connect();
                });
        },

        /**
         * Attempts to connect/login based on existing
         * session information.
         */
        connect: function () {
            var socketService = new SocketService();
            var deferred = Q.defer();

            var socket = socketService.getSocket();
            var connected = socket && socket.socket.connected;
            if (connected) {
                deferred.resolve(true);
            } else {
                socketService.connect().then(function () {
                    deferred.resolve(true);
                }, function () {
                    deferred.reject(new Error('Not logged in'));
                });
            }

            return deferred.promise;
        },

        /**
         * Important to use '_method' approach since we are doing
         * Cross-Origin requests. Otherwise, using 'DELETE' directly
         * will have jQuery make an additional OPTIONS call, with
         * each OPTIONS call creating a new unnecessary session.
         */
        logout: function () {
            return q($.ajax({
                method: 'POST',
                url: config.url + '/v0/session',
                data: {_method: 'DELETE'},
                xhrFields: {
                    withCredentials: true
                }
            }));
        },

        register: function (info) {
            return q($.ajax({
                method: 'POST',
                url: config.url + '/v0/registration',
                data: info
            }));
        }
    });

    return AuthenticationService;
});
