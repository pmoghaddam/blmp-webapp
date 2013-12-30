/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'templates',
    'views/taskView',
], function ($, _, Backbone, Marionette, JST, TaskView) {
    'use strict';

    var View = Marionette.CompositeView.extend({
        template: JST['app/scripts/templates/tasksView.ejs'],
        itemView: TaskView,
        itemViewEventPrefix: 'task',
        itemViewContainer: '.task-list',

        events: {
            'focus #add-task-input': 'onFocus',
            'change #add-task-input': 'onAdd'
        },

        onFocus: function() {
            this.$('#add-task-input').val('');
        },

        onAdd: function () {
            var $input = this.$('#add-task-input');
            var task = {title: $input.val()};
            $input.val(''); // Clear it
            this.trigger('task:create', this, task);
        }
    });

    return View;
});
