/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'lib/dispatcher',
    'lib/socket-io',
    'services/task',
    'collections/tasks',
    'views/taskList',
    'views/layouts/taskLayout'
], function ($, _, Backbone, dispatcher, io, TaskService, Tasks, TasksView, TaskLayout) {
    'use strict';

    var TaskController = Backbone.Controller.extend({
        start: function () {
            // Setup services
            this.taskService = new TaskService();

            // Setup layout
            this.layout = new TaskLayout();
            this.layout.render();

            // Setup collection and models
            this.tasks = new Tasks();

            // Internal listeners
            dispatcher.on('loggedIn', this.list, this);
        },

        onCreate: function (task) {
            this.tasks.add(task);
        },

        onDelete: function (data) {
            var task = this.tasks.get(data._id);
            this.tasks.remove(task);
        },

        list: function () {
            var me = this;

            this.taskService.loadTasks()
                .then(function (tasks) {
                    me.tasks.add(tasks);

                    // Socket listeners
                    // TODO: Refactor
                    io.socket.on('tasks:create', _.bind(me.onCreate, me));
                    io.socket.on('tasks:delete', _.bind(me.onDelete, me));

                    // Render tasks
                    var view = new TasksView({collection: me.tasks});
                    view.render();
                    me.layout.tasks.show(view);
                    $('#app').append(me.layout.el);

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
