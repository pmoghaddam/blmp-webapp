/*global define*/

define([
    'jquery',
    'backbone'
], function ($, Backbone) {
    'use strict';

    var Controller = Backbone.Controller.extend({
        events: {
            'task:update': 'onUpdate'
        },

        initialize: function (options) {
            var view = this.view = options.view;
            this.listenToView(view);
        },

        onUpdate: function (view, task, update) {
            task.save(update);
        }
    });

    return Controller;
});
