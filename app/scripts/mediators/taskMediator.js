/*global define*/

define([
    'jquery',
    'backbone'
], function ($, Backbone) {
    'use strict';

    var Controller = Backbone.Controller.extend({
        events: {
            'task:delete': 'onRemoveTask',
            'task:create': 'onAddTask',
            'task:hover': 'onSelectTask',
            'task:update': 'onUpdateTask'
        },

        initialize: function (options) {
            this.tasks = options.collection;
            var view = this.view = options.view;
            this.listenToView(view);
        },

        onAddTask: function (view, task) {
            // Append task list to task
            task.taskList = this.taskListId;

            this.tasks.create(task);
        },

        onRemoveTask: function (view, data) {
            var model = this.tasks.get(data.model.id);
            this.tasks.remove(model);
            model.destroy();
        },

        onSelectTask: function (view, data) {
            Backbone.trigger('task:select', data.model);
        }

    });

    return Controller;
});
