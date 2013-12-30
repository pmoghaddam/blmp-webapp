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

        triggers: {
            'click .delete-task': 'delete',
            'change input.complete': 'complete',
            'mouseover': 'hover'
        },

        modelEvents: {
            'change:title': 'render'
        },

        onRender: function () {
            // Animate once
            if (this.isRendered) {
                return;
            }
            this.isRendered = true;

            this.$el.hide();
            _.defer(_.bind(this.transitionIn, this));
        },

        transitionIn: function () {
            this.$el.slideDown(200);
        },

        remove: function () {
            var remove = _.bind(function () {
                Backbone.View.prototype.remove.call(this);
            }, this);

            // Calls parent's `view` method after animation completes
            this.$el.slideUp(200, remove);
        }

    });

    return View;
});
