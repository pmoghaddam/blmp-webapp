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
        template: JST['app/scripts/templates/tasks.ejs'],

        events: {
            'change #add-task-input': 'onAddTask'
        },

        initialize: function () {
            this.collection.on('add', this.addOne, this);
            this.collection.on('remove', this.removeOne, this);

            this.views = {};
        },

        // OPTIMIZE: Utilize documentFragment to prevent reflows
        render: function () {
            this.$el.html(this.template({}));
            this.collection.forEach(this.addOne, this);
            return this;
        },

        onAddTask: function () {
            var $input = this.$('#add-task-input');
            var task = {title: $input.val()};
            $input.val(''); // Clear it
            this.$el.trigger('task:create', [task]);
        },

        addOne: function (task) {
            var taskView = new TaskView({model: task});
            this.views[task.cid] = taskView;

            var $listEl = this.$('.add-task-item');
            $listEl.after(taskView.render().el);
        },

        removeOne: function (task) {
            var taskView = this.views[task.cid];
            taskView.remove();
        },

        remove: function () {
            _.each(this.views, function (view) {
                view.remove();
            });
            return Backbone.View.prototype.remove.apply(this, arguments);
        }

    });

    return TasklistView;
});
