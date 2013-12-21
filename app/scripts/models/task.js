/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var TaskModel = Backbone.Model.extend({
        idAttribute: '_id',
        defaults: {
            title: 'New Task' // TODO: Localize
        }
    });

    return TaskModel;
});
