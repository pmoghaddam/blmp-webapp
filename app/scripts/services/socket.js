/*global define*/

define([
    'jquery',
    'backbone',
    'lib/config',
    'io'
], function ($, Backbone, config, io) {
    'use strict';

    var SocketService = Backbone.Service.extend({
        connect: function () {
            var socket = this.socket = io.connect(config.url);

            socket.on('connected', function (data) {
                console.log(data);
            });

            socket.on('tasks:list', function (tasks) {
                console.log(tasks);
            });

            socket.emit('tasks:list');
        }
    });

    return SocketService;
});
