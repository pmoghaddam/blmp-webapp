/*global define*/

define([
    'jquery',
    'backbone',
    'q',
    'lib/config',
    'io'
], function ($, Backbone, q, config, io) {
    'use strict';

    var SocketService = Backbone.Service.extend({
        connect: function () {
            var socket = this.socket = io.connect(config.url);

            var deferred = q.defer();

            socket.once('error', function () {
                deferred.reject(new Error('Unable/error to connect'));
            });

            socket.once('connected', function () {
                deferred.resolve(socket);
            });

            return deferred.promise;
        }
    });

    return SocketService;
});
