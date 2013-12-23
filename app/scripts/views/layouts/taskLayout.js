/*global define*/

define([
    'jquery',
    'backbone',
    'marionette',
    'templates'
], function ($, Backbone, Marionette, JST) {
    'use strict';

    var Layout = Marionette.Layout.extend({
        template: JST['app/scripts/templates/taskLayout.ejs'],

        regions: {
            taskLists: '#task-list-all',
            tasks: '#task-list',
            taskDetail: '#task-detail'
        }
    });

    return Layout;
});