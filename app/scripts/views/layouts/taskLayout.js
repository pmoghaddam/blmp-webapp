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
        className: 'task-layout',
        template: JST['app/scripts/templates/layouts/taskLayout.ejs'],

        regions: {
            taskDetailRegion: '#task-detail',
            taskListsRegion: '#task-list-all',
            tasksRegion: '#task-list'
        },

        events: {
            'click [data-toggle=offcanvas]': 'onShowTaskLists'
        },

        initialize: function (options) {
            this.taskLists = options.taskLists;
            this.tasks = options.tasks;
        },

        unshowTask: function() {
            this.trigger('unshow:task');
            this.taskDetailRegion.reset();
            this.$('#task-list, #task-detail').toggleClass('col-xs-12 col-xs-0');
        },

        onShowTaskLists: function () {
            this.trigger('show:taskLists');
            this.$('.row-offcanvas').toggleClass('active');
        },

        showTask: function (task) {
            this.trigger('show:task');
            this.$('#task-list, #task-detail').toggleClass('col-xs-12 col-xs-0');

            var taskDetailView = this.createTaskDetailView(task);
            this.taskDetailRegion.show(taskDetailView);
        },

        show: function () {
            var taskListsView = this.createTaskListsView(this.taskLists);
            this.taskListsRegion.show(taskListsView);

            // Do not show empty
            if (this.tasks.taskList) {
                var tasksView = this.createTasksView(this.tasks);
                this.tasksRegion.show(tasksView);
            } else {
                // TODO: Clean up in the future
                var emptyView = new Marionette.ItemView({template: '<h1>Select a task list first</h1>'});
                this.tasksRegion.show(emptyView);
            }
        },

        createTaskDetailView: function (task) {
            var view = new TaskDetailView({model: task});
            var controller = new TaskDetailMediator({view: view, model: task, layout: this});
            view.controller = controller;
            return view;
        },

        createTaskListsView: function (taskLists) {
            var view = new TaskListsView({collection: taskLists});
            var controller = new TaskListMediator({view: view, collection: taskLists, layout: this});
            view.controllers = [controller];
            return view;
        },

        createTasksView: function (tasks) {
            var view = new TasksView({collection: tasks});
            var controller = new TaskMediator({view: view, collection: tasks, layout: this});
            view.controllers = [controller];
            return view;
        }

    });

    return Layout;
});