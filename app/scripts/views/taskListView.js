/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'templates',
], function ($, _, Backbone, Marionette, JST) {
    'use strict';

    var View = Marionette.ItemView.extend({
        tagName: 'button',
        className: 'btn btn-default task-list-item',
        template: JST['app/scripts/templates/taskListView.ejs'],

        triggers: {
            'click': 'select',
            'click .delete-task': 'delete',
            'click .collaborators': 'collaborators'
        },

        modelEvents: {
            'change': 'render'
        }


    });

    return View;
});
