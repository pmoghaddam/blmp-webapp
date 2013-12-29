/*global define*/

define([
    'underscore',
    'backbone',
    'models/taskList'
], function (_, Backbone, TaskList) {
    'use strict';

    var Collection = Backbone.Collection.extend({
        model: TaskList,
        socketStorage: 'taskLists'
    });

    return Collection;
});
