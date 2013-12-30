/*global define*/

define([
    'jquery',
    'backbone',
    'lib/blpm'
], function ($, Backbone, BLPM) {
    'use strict';

    var Controller = BLPM.Mediator.extend({
        events: {
            'task:update': 'onUpdate'
        },

        onUpdate: function (view, task, update) {
            task.save(update);
        }
    });

    return Controller;
});
