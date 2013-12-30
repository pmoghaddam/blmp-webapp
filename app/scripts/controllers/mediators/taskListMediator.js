/*global define*/

define([
    'jquery',
    'backbone',
    'lib/blpm'
], function ($, Backbone, BLPM) {
    'use strict';

    var Controller = BLPM.Mediator.extend({
        events: {
            'taskList:create': 'onAddTaskList',
            'taskList:select': 'onSelectTaskList',
            'taskList:delete': 'onRemoveTaskList',
            'taskList:collaborators': 'onCollaborators'
        },

        onSelectTaskList: function (view, data) {
            Backbone.trigger('taskList:select', data.model);
        },

        onAddTaskList: function (view, taskList) {
            this.collection.create(taskList);
        },

        onRemoveTaskList: function (view, data) {
            var model = this.collection.get(data.model.id);
            this.collection.remove(model);
            model.destroy();
        },

        onCollaborators: function (view, data) {
            Backbone.trigger('taskList:collaborators', data.model);
        }

    });

    return Controller;
});
