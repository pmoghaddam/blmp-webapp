/*global define*/

define([
    'underscore',
    'backbone',
    'models/taskList'
], function (_, Backbone, TaskList) {
    'use strict';

    var Collection = Backbone.Collection.extend({
        model: TaskList,
        socketStorage: 'taskLists',

        initialize: function () {
            // TODO: Anyway to make this automatic?
            this.initializeSocketStorage();
        }
    });

    return Collection;
});
