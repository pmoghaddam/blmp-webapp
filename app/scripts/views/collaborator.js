/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var View = Backbone.View.extend({
        template: JST['app/scripts/templates/collaborator.ejs'],

        events: {
            'click .delete-user': 'onDelete'
        },

        render: function () {
            this.$el.html(this.template(this.model.attributes));
            return this;
        },

        onDelete: function () {
            this.$el.trigger('collaborator:delete', [this.model]);
        }
    });

    return View;
});
