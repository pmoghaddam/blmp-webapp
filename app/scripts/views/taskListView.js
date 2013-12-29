/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'templates'
], function ($, _, Backbone, Marionette, JST) {
    'use strict';

    var View = Marionette.ItemView.extend({
        tagName: 'button',
        className: 'btn btn-default task-list-item',
        template: JST['app/scripts/templates/taskListView.ejs'],

        events: {
            'click': 'onClick',
            'click .delete-task': 'onDelete',
            'click .collaborators': 'onCollaborators'
        },

        modelEvents: {
            'change': 'render'
        },

        onClick: function () {
            this.$el.trigger('taskList:select', [this.model]);
        },

        onDelete: function (e) {
            e.preventDefault();
            this.$el.trigger('taskList:delete', [this.model]);
        },

        onCollaborators: function (e) {
            e.preventDefault();
            this.$el.trigger('taskList:collaborators', [this.model]);
        }
    });

    return View;
});
