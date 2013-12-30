/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'templates',
    'lib/formHelper'
], function ($, _, Backbone, Marionette, JST, formHelper) {
    'use strict';

    var View = Marionette.ItemView.extend({
        template: JST['app/scripts/templates/taskDetailView.ejs'],

        events: {
            'submit': 'onSubmit'
        },

        triggers: {
            'click .cancel': 'task:cancel'
        },

        modelEvents: {
            'change': 'render'
        },

        onRender: function() {
            _.defer(_.bind(this.focus, this));

        },

        focus: function() {
            var $input = this.$('input[name=title]');
            $input.focus();
            $input.trigger('click');
        },

        onSubmit: function (e) {
            e.preventDefault();

            var $form = this.$('form');
            var data = formHelper.extractFormValues($form);
            data.priority = parseInt(data.priority, 10);

            this.trigger('task:update', this, this.model, data);
        }
    });

    return View;
});
