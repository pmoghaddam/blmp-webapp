/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/task'
], function ($, _, Backbone, JST, TaskView) {
    'use strict';

    var TasklistView = Backbone.View.extend({
        template: JST['app/scripts/templates/taskList.ejs'],

        render: function () {
            this.$el.html(this.template({}));
            this.collection.forEach(this.renderTask, this);
            return this;
        },

        renderTask: function (task) {
            var taskView = new TaskView({model: task});
            var $listEl = this.$el.find('.task-list');
            $listEl.append(taskView.render().el);
        }
    });

    return TasklistView;
});
