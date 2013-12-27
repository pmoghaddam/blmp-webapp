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
            }

            // TODO: Anyway to make this automatic?
            this.initializeSocketStorage();
        }
    });

    return TasksCollection;
});
