/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'lib/dispatcher',
    'lib/socket-io',
    'services/task',
    'collections/tasks',
    'views/taskList'
], function ($, _, Backbone, dispatcher, io, TaskService, Tasks, TasksView) {
    'use strict';

    var TaskController = Backbone.Controller.extend({
        start: function () {
            // Setup services
            this.taskService = new TaskService();

            // Setup collection and models
            this.tasks = new Tasks();

            // Internal listeners
            dispatcher.on('loggedIn', this.loadTasks, this);
        },

        onCreate: function (task) {
            this.tasks.add(task);
        },

        onDelete: function (data) {
            var task = this.tasks.get(data._id);
            this.tasks.remove(task);
        },

        loadTasks: function () {
            var me = this;

            this.taskService.loadTasks()
                .then(function (tasks) {
                    me.tasks.add(tasks);

                    // Socket listeners
                    // TODO: Refactor
                    io.socket.on('tasks:create', _.bind(me.onCreate, me));
                    io.socket.on('tasks:delete', _.bind(me.onDelete, me));

                    // Render tasks
                    var view = new TasksView({collection: me.tasks, el: '#app'});
                    view.render();

                    view.on('add', function (task) {
                        io.socket.emit('tasks:create', task);
                    });
                    view.on('remove', function (task) {
                        io.socket.emit('tasks:delete', {id:task.id});
                    });
                });
        }
    });

    return TaskController;
});
