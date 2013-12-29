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

        events: {
            'click .delete-user': 'onDelete'
        },

        modelEvents: {
            'change': 'render'
        },

        onDelete: function () {
            this.$el.trigger('collaborator:delete', [this.model]);
        }
    });

    return View;
});
