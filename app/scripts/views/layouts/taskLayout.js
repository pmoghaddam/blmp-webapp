/*global define*/

define([
    'jquery',
    'marionette',
    'templates',
    'views/tasksView',
    'views/taskListsView',
    'views/taskDetailView',
    'controllers/mediators/taskListMediator',
    'controllers/mediators/taskMediator',
    'controllers/mediators/taskDetailMediator'
], function ($, Marionette, JST, TasksView, TaskListsView, TaskDetailView, TaskListMediator, TaskMediator, TaskDetailMediator) {
    'use strict';

    var Layout = Marionette.Layout.extend({
        template: JST['app/scripts/templates/layouts/taskLayout.ejs'],

        regions: {
            taskDetailRegion: '#task-detail',
            taskListsRegion: '#task-list-all',
            tasksRegion: '#task-list'
        },

        initialize: function (options) {
            this.taskLists = options.taskLists;
            this.tasks = options.tasks;
        },

        showTask: function (task) {
            var taskDetailView = this.createTaskDetailView(task);
            this.taskDetailRegion.show(taskDetailView);
        },

        // Automatically called by Marionette once the layout prepares itself
        onRender: function () {
            var taskListsView = this.createTaskListsView(this.taskLists);
            var tasksView = this.createTasksView(this.tasks);

            this.taskListsRegion.show(taskListsView);
            this.tasksRegion.show(tasksView);
        },

        createTaskDetailView: function (task) {
            var view = new TaskDetailView({model: task});
            var controller = new TaskDetailMediator({view: view, model: task});
            view.controller = controller;
            return view;
        },

        createTaskListsView: function (taskLists) {
            var view = new TaskListsView({collection: taskLists});
            var controller = new TaskListMediator({view: view, collection: taskLists});
            view.controllers = [controller];
            return view;
        },

        createTasksView: function (tasks) {
            var view = new TasksView({collection: tasks});
            var controller = new TaskMediator({view: view, collection: tasks});
            view.controllers = [controller];
            return view;
        }

    });

    return Layout;
});