/*global define*/

define([
    'jquery',
    'backbone',
    'underscore',
    'q',
    'services/socket'
], function ($, Backbone, _, Q, SocketService) {
    'use strict';

    var TaskService = Backbone.Service.extend({
        getCollaborators: function (taskList) {
            var defer = Q.defer();

            var collaborators = taskList.get('collaborators');
            var users = _.map(collaborators, function (item) {
                return item.user;
            });

            var socket = new SocketService().getSocket();
            socket.emit('users:findAll', {users: users}, function (data) {
                defer.resolve(data);
            });

            return defer.promise;
        },

        addCollaborator: function (taskList, email) {
            var defer = Q.defer();

            var socket = new SocketService().getSocket();
            socket.once('collaborators:create', function (data) {
                defer.resolve(data.user);
            });
            socket.emit('collaborators:create', {id: taskList.id, email: email, access:'editor'});

            return defer.promise;
        },

        removeCollaborator: function (taskList, user) {
            var defer = Q.defer();

            var socket = new SocketService().getSocket();
            socket.once('collaborators:delete', function (data) {
                defer.resolve(data.user);
            });
            socket.emit('collaborators:delete', {id: taskList.id, user: user.id});

            return defer.promise;
        }
    });

    return TaskService;
});
