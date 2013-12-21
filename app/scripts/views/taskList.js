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

        events: {
            'click .add-task': 'onAddTask',
            'click .remove-task': 'onRemoveTask'
        },

        initialize: function () {
            this.collection.on('add', this.addOne, this);
            this.collection.on('remove', this.removeOne, this);
        },

        render: function () {
            this.$el.html(this.template({}));
            this.collection.forEach(this.addOne, this);
            return this;
        },

        addOne: function (task) {
            var taskView = new TaskView({model: task});
            var $listEl = this.$el.find('.task-list');
            $listEl.append(taskView.render().el);
        },

        removeOne: function (task) {
            var tag = this.$el.find('.task-list-item[data-id=' + task.id + ']');
            tag.remove();
        },

        onAddTask: function () {
            this.trigger('add', {title: 'New Task'}); // TODO: Remove hard code
        },

        onRemoveTask: function () {
            var id = this.$el.find('.task-list-item').data('id');
            var task = this.collection.get(id);
            this.trigger('remove', task); // TODO: Remove hard code
        }
    });

    return TasklistView;
});
