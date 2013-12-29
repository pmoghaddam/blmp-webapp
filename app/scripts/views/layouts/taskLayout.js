/*global define*/

define([
    'jquery',
    'marionette',
    'templates',
    'views/tasksView',
    'views/taskListsView',
    'views/taskDetailView'
], function ($, Marionette, JST, TasksView, TaskListsView, TaskDetailView) {
    'use strict';

    var Layout = Marionette.Layout.extend({
        template: JST['app/scripts/templates/layouts/taskLayout.ejs'],

        regions: {
            taskDetail: '#task-detail',
            taskLists: '#task-list-all',
            tasks: '#task-list'
        },

        initialize: function (options) {
            this.taskListsView = new TaskListsView({collection: options.taskLists});
            this.tasksView = new TasksView({collection: options.tasks});
        },

        showTask: function (task) {
            var taskDetailView = new TaskDetailView({model: task});
            this.taskDetail.show(taskDetailView);
        },

        // Automatically called by Marionette once the layout prepares itself
        onRender: function () {
            this.taskLists.show(this.taskListsView);
            this.tasks.show(this.tasksView);
        }

    });

    return Layout;
});