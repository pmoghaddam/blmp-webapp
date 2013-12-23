/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'lib/formHelper'
], function ($, _, Backbone, JST, formHelper) {
    'use strict';

    var LoginView = Backbone.View.extend({
        template: JST['app/scripts/templates/login.ejs'],
        events: {
            'submit': 'onSubmit',
            'click .sign-up': 'onSignUp'
        },

        render: function () {
            this.$el.html(this.template({}));
            return this;
        },

        onSignUp: function (e) {
            e.preventDefault();
            this.$el.trigger('signUp');
        },

        onSubmit: function (e) {
            var data = formHelper.extractFormValues(this.$('form'));

            this.$el.trigger('login', [data]);

            e.preventDefault();
        }
    });

    return LoginView;
});
