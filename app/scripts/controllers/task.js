/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'lib/dispatcher',
    'lib/socket-io',
    'services/task',
    'collections/tasks',
    'views/tasks',
    'views/taskLists',
    'views/taskDetail',
    'views/layouts/taskLayout'
], function ($, _, Backbone, dispatcher, io, TaskService, Tasks, TasksView, TaskListsView, TaskDetailView, TaskLayout) {
    'use strict';

    var TaskController = Backbone.Controller.extend({

        events: {
            'task:delete': 'onRemoveTask',
            'task:create': 'onAddTask',
            'task:hover': 'onHoverTask'
        },

        initialize: function () {
            // Setup collection and models
            this.tasks = new Tasks();

            // Internal listeners
            dispatcher.on('loggedIn', this.list, this);
        },

        onHoverTask: function (e, task) {
            this.layout.showTask(task);
        },

        onAddTask: function (e, task) {
            e.preventDefault();
            io.socket.emit('tasks:create', task);
        },

        onRemoveTask: function (e, task) {
            e.preventDefault();
            io.socket.emit('tasks:delete', {id: task.id});
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

            new TaskService().loadTasks()
                .then(function (tasks) {
                    me.tasks.add(tasks);

                    // Socket listeners
                    // TODO: Refactor
                    io.socket.on('tasks:create', _.bind(me.onCreate, me));
                    io.socket.on('tasks:delete', _.bind(me.onDelete, me));

                    // Render tasks
                    var tasksView = new TasksView({collection: me.tasks});
                    var taskListsView = new TaskListsView();
                    var taskDetail = new TaskDetailView({model: me.tasks.at(0)});
                    var layout = me.layout = new TaskLayout({
                        taskLists: taskListsView,
                        tasks: tasksView,
                        taskDetail: taskDetail
                    });
                    me.$el.append(layout.render().el);

                    var $app = $('#app');
                    $app.empty();
                    $app.append(me.el);
                });
        }
    });

    return TaskController;
});
