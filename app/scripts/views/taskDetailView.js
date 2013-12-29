/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'templates',
    'lib/formHelper',
    'controllers/mediators/taskDetailMediator'
], function ($, _, Backbone, Marionette, JST, formHelper, TaskDetailMediator) {
    'use strict';

    var View = Marionette.ItemView.extend({
        template: JST['app/scripts/templates/taskDetail.ejs'],

        events: {
            'submit': 'onSubmit'
        },

        modelEvents: {
            'change': 'render'
        },

        initialize: function (options) {
            new TaskDetailMediator({view: this, model: options.model});
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
