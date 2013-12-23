/*global define*/

define([
    'jquery',
    'backbone',
    'templates',
    'views/tasks',
    'views/taskLists',
    'views/taskDetail'
], function ($, Backbone, JST, TasksView, TaskListsView, TaskDetailView) {
    'use strict';

    var Layout = Backbone.View.extend({
        template: JST['app/scripts/templates/layouts/taskLayout.ejs'],

        initialize: function (options) {
            this.taskLists = new TaskListsView();
            this.tasks = new TasksView({collection: options.tasks});
            this.taskDetail = new TaskDetailView({model: options.tasks.at(0)});
        },

        showTask: function (task) {
            this.taskDetail.remove();

            this.taskDetail = new TaskDetailView({model: task});
            this.renderItem('#task-detail', this.taskDetail);
        },

        render: function () {
            this.$el.html(this.template());

            // Add children
            this.renderItem('#task-list-all', this.taskLists);
            this.renderItem('#task-list', this.tasks);
            this.renderItem('#task-detail', this.taskDetail);

            return this;
        },

        renderItem: function (selector, view) {
            if (!view || !view.render) {
                return;
            }

            var $area = this.$(selector);
            $area.append(view.render().el);
        }
    });

    return Layout;
});