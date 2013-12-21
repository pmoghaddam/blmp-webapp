/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'lib/formHelper'
], function ($, _, Backbone, JST, formHelper) {
    'use strict';

    var RegistrationView = Backbone.View.extend({
        template: JST['app/scripts/templates/registration.ejs'],
        events: {
            'submit': 'onSubmit'
        },

        render: function () {
            this.$el.html(this.template({}));
            return this;
        },

        onSubmit: function (e) {
            e.preventDefault();

            var data = formHelper.extractFormValues(this.$el.find('form'));
            this.trigger('register', data);
        }
    });

    return RegistrationView;
});
