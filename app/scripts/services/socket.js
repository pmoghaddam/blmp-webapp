/*global define*/

define([
    'jquery',
    'backbone',
    'q',
    'lib/config',
    'lib/socket-io'
], function ($, Backbone, Q, config, io) {
    'use strict';

    // For now assume single socket connection
    var socket;
    var connected;

    var SocketService = Backbone.Service.extend({
        connect: function () {
            var deferred = Q.defer();

            // Connect only once
            if (connected) {
                deferred.resolve(socket);
                return deferred.promise;
            }

            socket = this.socket = io.connect(config.url, {
                'force new connection': true
            });

            socket.once('error', function () {
                deferred.reject(new Error('Unable/error to connect'));
            });

            socket.once('connected', function () {
                connected = true;
                deferred.resolve(socket);
            });

            return deferred.promise;
        },

        disconnect: function () {
            var deferred = Q.defer();

            socket.disconnect();
            connected = false;
            deferred.resolve(true);

            return deferred.promise;
        },

        getSocket: function () {
            return socket;
        }
    });

    return SocketService;
});
