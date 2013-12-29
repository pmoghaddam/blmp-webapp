/*global define*/

define([
    'jquery',
    'backbone'
], function ($, Backbone) {
    'use strict';

    var Controller = Backbone.Mediator.extend({
        events: {
            'task:update': 'onUpdate'
        },

        onUpdate: function (view, task, update) {
            task.save(update);
        }
    });

    return Controller;
});
