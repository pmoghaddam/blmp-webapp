/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var TaskModel = Backbone.Model.extend({
        idAttribute: '_id',
        socketStorage: 'tasks',
        defaults: {
            title: null,
            deadlineAt: new Date(),
            status: 'notStarted',
            priority: 0,
            description: null,
            notes: null
        }
    });

    return TaskModel;
});
