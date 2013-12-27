/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var TaskModel = Backbone.Model.extend({
        idAttribute: '_id',
        socketStorage: 'tasks',
        socketParams: null, // Allows option to restrict further
        defaults: {
            title: null,
            deadlineAt: new Date(),
            status: 'notStarted',
            priority: 0,
            description: null,
            notes: null
        },

        initialize: function () {
            this.socketParams = {taskList: this.get('taskList')};
        }
    });

    return TaskModel;
});
