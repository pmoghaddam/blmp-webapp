/*global define*/

define([
    'jquery',
    'backbone'
], function ($, Backbone) {
    'use strict';

    var Controller = Backbone.Controller.extend({
        events: {
            'taskList:create': 'onAddTaskList',
            'taskList:select': 'onSelectTaskList',
            'taskList:delete': 'onRemoveTaskList',
            'taskList:collaborators': 'onCollaborators'
        },

        initialize: function (options) {
            this.taskLists = options.collection;
            var view = this.view = options.view;
            this.listenToView(view);
        },

        onSelectTaskList: function (view, data) {
            Backbone.trigger('taskList:select', data.model);
        },

        onAddTaskList: function (view, taskList) {
            this.taskLists.create(taskList);
        },

        onRemoveTaskList: function (view, data) {
            var model = this.taskLists.get(data.model.id);
            this.taskLists.remove(model);
            model.destroy();
        },

        onCollaborators: function (view, data) {
            Backbone.trigger('taskList:collaborators', data.model);
        }

    });

    return Controller;
});
