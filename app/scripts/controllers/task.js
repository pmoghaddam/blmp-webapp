/*global define*/

define([
    'jquery',
    'backbone',
    'lib/dispatcher',
    'lib/socket-io',
    'services/task',
    'collections/tasks',
    'views/taskList'
], function ($, Backbone, dispatcher, io, TaskService, Tasks, TasksView) {
    'use strict';

    var TaskController = Backbone.Controller.extend({
        start: function () {
            // Setup services
            this.taskService = new TaskService();

            // Setup collection and models
            this.tasks = new Tasks();

            dispatcher.on('loggedIn', this.loadTasks, this);
        },

        loadTasks: function () {
            var me = this;

            this.taskService.loadTasks()
                .then(function (tasks) {
                    me.tasks.add(tasks);

                    // Render tasks
                    var view = new TasksView({collection: me.tasks, el: '#app'});
                    view.render();
                });
        }
    });

    return TaskController;
});
