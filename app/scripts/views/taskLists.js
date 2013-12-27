/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/taskList'
], function ($, _, Backbone, JST, TaskListView) {
    'use strict';

    var View = Backbone.View.extend({
        className: 'task-lists',
        template: JST['app/scripts/templates/taskLists.ejs'],

        events: {
            'change #add-task-list-input': 'onAdd'
        },

        initialize: function () {
            this.collection.on('add', this.addOne, this);
            this.collection.on('remove', this.removeOne, this);
            this.collection.on('sync', this.render, this);

            this.views = {};
        },

        render: function () {
            this.$el.html(this.template({}));
            this.views = {};

            this.collection.forEach(this.addOne, this);
            return this;
        },

        onAdd: function () {
            var $input = this.$('#add-task-list-input');
            var data = {title: $input.val()};
            $input.val(''); // Clear it
            this.$el.trigger('taskList:create', [data]);
        },

        addOne: function (taskList) {
            var taskListView = new TaskListView({model: taskList});
            this.views[taskList.cid] = taskListView;

            var $area = this.$('#task-lists');
            $area.append(taskListView.render().el);
        },

        removeOne: function (task) {
            var itemView = this.views[task.cid];
            itemView.remove();
        }
    });

    return View;
});
