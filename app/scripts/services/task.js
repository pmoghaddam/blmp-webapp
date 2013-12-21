/*global define*/

define([
    'jquery',
    'backbone',
    'q',
    'lib/socket-io'
], function ($, Backbone, q, io) {
    'use strict';

    var TaskService = Backbone.Service.extend({
        // TODO: Temporary; should be in model's sync instead?
        loadTasks: function () {
            var socket = io.socket;

            var deferred = q.defer();

            socket.once('tasks:list', function (tasks) {
                // TODO: Merge into task model
                // TODO: On login success should be handled by a global event dispatcher

                deferred.resolve(tasks);
            });

            socket.emit('tasks:list');

            return deferred.promise;
        }
    });

    return TaskService;
});
