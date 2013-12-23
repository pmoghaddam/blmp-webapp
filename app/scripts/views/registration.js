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
            'submit': 'onSubmit',
            'click .cancel-sign-up': 'onCancel'
        },

        render: function () {
            this.$el.html(this.template({}));
            return this;
        },

        onSubmit: function (e) {
            e.preventDefault();

            var data = formHelper.extractFormValues(this.$('form'));
            this.$el.trigger('register', [data]);
        },

        onCancel: function(e) {
            e.preventDefault();

            this.$el.trigger('cancelSignUp');
        }
    });

    return RegistrationView;
});
