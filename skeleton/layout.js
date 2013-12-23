/*global define*/

define([
    'jquery',
    'backbone',
    'marionette',
    'templates'
], function ($, Backbone, Marionette, JST) {
    'use strict';

    var Layout = Backbone.Service.extend({
        template: JST['app/scripts/templates/taskLayout.ejs'],

        regions: {
            primary: '#primary',
            secondary: '#secondary'
        }
    });

    return Layout;
});
