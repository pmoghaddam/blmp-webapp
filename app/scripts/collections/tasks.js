/*global define*/

define([
    'underscore',
    'backbone',
    'models/task'
], function (_, Backbone, Task) {
    'use strict';

    var TasksCollection = Backbone.Collection.extend({
        model: Task,
        socketStorage: 'tasks',

        initialize: function (models, options) {
            if (options) {
                this.socketParams = {taskList: options.taskList};
                this.socketFilter = {taskList: options.taskList};
                this.taskList = options.taskList;
            }
        }
    });

    return TasksCollection;
});
