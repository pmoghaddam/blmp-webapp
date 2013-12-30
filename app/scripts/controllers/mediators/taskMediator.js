/*global define*/

define([
    'jquery',
    'backbone',
    'lib/blpm'
], function ($, Backbone, BLPM) {
    'use strict';

    var Controller = BLPM.Mediator.extend({
        events: {
            'task:delete': 'onRemoveTask',
            'task:create': 'onAddTask',
            'task:hover': 'onSelectTask',
            'task:update': 'onUpdateTask'
        },

        onAddTask: function (view, task) {
            // Append task list to task
            task.taskList = this.collection.taskList;

            this.collection.create(task);
        },

        onRemoveTask: function (view, data) {
            var model = this.collection.get(data.model.id);
            this.collection.remove(model);
            model.destroy();
        },

        onSelectTask: function (view, data) {
            Backbone.trigger('task:select', data.model);
        }

    });

    return Controller;
});
