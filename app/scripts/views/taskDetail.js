/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'lib/formHelper'
], function ($, _, Backbone, JST, formHelper) {
    'use strict';

    var View = Backbone.View.extend({
        template: JST['app/scripts/templates/taskDetail.ejs'],

        events: {
            'submit': 'onSubmit'
        },

        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.attributes));
            return this;
        },

        onSubmit: function (e) {
            e.preventDefault();

            var $form = this.$el.find('form');
            var data = formHelper.extractFormValues($form);
            data.priority = parseInt(data.priority, 10);

            this.$el.trigger('task:update', [this.model, data]);
        }
    });

    return View;
});
