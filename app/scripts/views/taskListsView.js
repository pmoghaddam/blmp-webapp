/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'templates',
    'views/taskListView',
    'controllers/mediators/taskListMediator'
], function ($, _, Backbone, Marionette, JST, TaskListView, TaskListMediator) {
    'use strict';

    var View = Marionette.CompositeView.extend({
        className: 'task-lists',
        template: JST['app/scripts/templates/taskListsView.ejs'],
        itemView: TaskListView,
        itemViewEventPrefix: 'taskList',
        itemViewContainer: '#task-lists',

        events: {
            'change #add-task-list-input': 'onAdd'
        },

        onAdd: function () {
            var $input = this.$('#add-task-list-input');
            var data = {title: $input.val()};
            $input.val(''); // Clear it
            this.trigger('taskList:create', this, data);
        },

        initialize: function(options) {
            new TaskListMediator({view: this, collection: options.collection});
        }
    });

    return View;
});
