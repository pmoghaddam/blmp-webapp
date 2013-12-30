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
            'task:select': 'onSelectTask',
            'task:update': 'onUpdateTask',
            'task:complete': 'onComplete'
        },

        initialize: function(options) {
            var layout = options.layout;

            this.listenTo(layout, 'unshow:task', this.deselectTask, this);

            BLPM.Mediator.prototype.initialize.apply(this, arguments);
        },

        deselectTask: function () {
            if (this.selectedTaskView) {
                this.selectedTaskView.deselectVisually();
            }
            this.selectedTaskView = null;
        },

        onComplete: function(view, data) {
            var task = data.model;
            task.save({status: 'completed'});
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
            // Setup visual marker
            this.deselectTask();
            this.selectedTaskView = view;
            view.selectVisually();

            this.layout.showTask(data.model);
        }

    });

    return Controller;
});
