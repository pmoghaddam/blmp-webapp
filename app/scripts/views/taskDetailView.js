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
        template: JST['app/scripts/templates/taskDetail.ejs'],

        events: {
            'submit': 'onSubmit'
        },

        modelEvents: {
            'change': 'render'
        },

        onSubmit: function (e) {
            e.preventDefault();

            var $form = this.$('form');
            var data = formHelper.extractFormValues($form);
            data.priority = parseInt(data.priority, 10);

            this.$el.trigger('task:update', [this.model, data]);
        }
    });

    return View;
});
