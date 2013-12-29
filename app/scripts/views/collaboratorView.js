/*global define*/

define([
    'jquery',
    'underscore',
    'marionette',
    'templates'
], function ($, _, Marionette, JST) {
    'use strict';

    var View = Marionette.ItemView.extend({
        template: JST['app/scripts/templates/collaboratorView.ejs'],

        triggers: {
            'click .delete-user': 'delete'
        },

        modelEvents: {
            'change': 'render'
        }
    });

    return View;
});
