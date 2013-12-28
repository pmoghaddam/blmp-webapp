/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var View = Backbone.View.extend({
        tagName: 'button',
        className: 'btn btn-default task-list-item',
        template: JST['app/scripts/templates/taskList.ejs'],

        events: {
            'click': 'onClick',
            'click .delete-task': 'onDelete',
            'click .collaborators': 'onCollaborators'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.attributes));
            return this;
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
