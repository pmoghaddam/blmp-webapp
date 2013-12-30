/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'templates',
    'views/taskListView'
], function ($, _, Backbone, Marionette, JST, TaskListView) {
    'use strict';

    var View = Marionette.CompositeView.extend({
        className: 'task-lists',
        template: JST['app/scripts/templates/taskListsView.ejs'],
        itemView: TaskListView,
        itemViewEventPrefix: 'taskList',
        itemViewContainer: '#task-lists',

        events: {
            'submit': 'onAdd'
        },

        onAdd: function (e) {
            e.preventDefault();

            var $input = this.$('#add-task-list-input');
            var data = {title: $input.val()};
            $input.val(''); // Clear it
            this.trigger('taskList:create', this, data);
        }

    });

    return View;
});
