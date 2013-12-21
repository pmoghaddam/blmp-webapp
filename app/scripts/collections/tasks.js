/*global define*/

define([
    'underscore',
    'backbone',
    'models/task'
], function (_, Backbone, Task) {
    'use strict';

    var TasksCollection = Backbone.Collection.extend({
        model: Task
    });

    return TasksCollection;
});
