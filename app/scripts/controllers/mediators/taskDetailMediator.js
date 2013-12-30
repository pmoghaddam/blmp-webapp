/*global define*/

define([
    'jquery',
    'backbone',
    'lib/blpm'
], function ($, Backbone, BLPM) {
    'use strict';

    var Controller = BLPM.Mediator.extend({
        events: {
            'task:update': 'onUpdate',
            'task:cancel': 'onCancel'
        },

        onUpdate: function (view, task, update) {
            task.save(update);
        },

        onCancel: function() {
            this.layout.unshowTask();
        }
    });

    return Controller;
});
