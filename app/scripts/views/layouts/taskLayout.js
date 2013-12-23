/*global define*/

define([
    'jquery',
    'backbone',
    'templates'
], function ($, Backbone, JST) {
    'use strict';

    var Layout = Backbone.View.extend({
        template: JST['app/scripts/templates/layouts/taskLayout.ejs'],

        initialize: function (options) {
            this.taskLists = options.taskLists;
            this.tasks = options.tasks;
            this.taskDetail = options.taskDetail;
        },

        showTask: function(task) {
            this.taskDetail.model = task;
            this.taskDetail.render();
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

            this.$el.find(selector).append(view.render().el);
        }

    });

    return Layout;
});