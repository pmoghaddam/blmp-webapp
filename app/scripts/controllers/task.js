/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'lib/dispatcher',
    'lib/socket-io',
    'services/task',
    'collections/tasks',
    'views/layouts/taskLayout'
], function ($, _, Backbone, dispatcher, io, TaskService, Tasks, TaskLayout) {
    'use strict';

    var TaskController = Backbone.Controller.extend({
        className: 'task-controller',
        events: {
            'task:delete': 'onRemoveTask',
            'task:create': 'onAddTask',
            'task:hover': 'onHoverTask',
            'task:update': 'onUpdateTask'
        },

        initialize: function () {
            // Setup collection and models
            this.tasks = new Tasks();
        },

        createLayout: function () {
            return new TaskLayout({
                tasks: this.tasks
            });
        },

        // TODO: doLayout should be inside layout object
        list: function () {
            var me = this;

            me.tasks.fetch();
            me.tasks.once('sync', function () {
                me.doLayout();
            });
        },

        onHoverTask: function (e, task) {
            this.layout.showTask(task);
        },

        onAddTask: function (e, task) {
            this.tasks.create(task);
        },

        onUpdateTask: function (e, task, update) {
            var model = this.tasks.get(task.id);
            model.save(update);
        },

        onRemoveTask: function (e, task) {
            var model = this.tasks.get(task.id);
            this.tasks.remove(model);
            model.destroy();
        }

    });

    return TaskController;
});
