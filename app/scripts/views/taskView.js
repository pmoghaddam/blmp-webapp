/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'templates'
], function ($, _, Backbone, Marionette, JST) {
    'use strict';

    var View = Marionette.ItemView.extend({
        tagName: 'li',
        className: 'list-group-item task-list-item',
        template: JST['app/scripts/templates/taskView.ejs'],

        triggers: {
            'click .delete-task': 'delete',
            'mouseover': 'hover'
        },

        modelEvents: {
            'change': 'render'
        }

    });

    return View;
});
