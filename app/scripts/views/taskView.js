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
        tagName: 'li',
        className: 'list-group-item task-list-item',
        template: JST['app/scripts/templates/taskView.ejs'],

        events: {
            'click .delete-task': 'onDeleteTask',
            'mouseover': 'onMouseOver'
        },

        modelEvents: {
            'change': 'render'
        },

        onDeleteTask: function (e) {
            e.preventDefault();
            this.$el.trigger('task:delete', [this.model]);
        },

        onMouseOver: function () {
            this.$el.trigger('task:hover', [this.model]);
        }
    });

    return View;
});
