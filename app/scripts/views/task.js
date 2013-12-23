/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var TaskView = Backbone.View.extend({
        tagName: 'li',
        className: 'list-group-item task-list-item',
        template: JST['app/scripts/templates/task.ejs'],

        events: {
            'click .delete-task': 'onDeleteTask',
            'mouseover': 'onHover'
        },

        render: function () {
            this.$el.html(this.template(this.model.attributes));
            return this;
        },

        onDeleteTask: function () {
            this.$el.trigger('task:delete', [this.model]);
        },

        onHover: function () {
            this.$el.trigger('task:hover', [this.model]);
        }
    });

    return TaskView;
});
