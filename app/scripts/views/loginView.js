/*global define*/

define([
    'jquery',
    'underscore',
    'marionette',
    'templates',
    'lib/formHelper'
], function ($, _, Marionette, JST, formHelper) {
    'use strict';

    var LoginView = Marionette.ItemView.extend({
        id: 'login-form',
        template: JST['app/scripts/templates/loginView.ejs'],
        events: {
            'submit': 'onSubmit',
            'click .sign-up': 'onSignUp'
        },

        onSignUp: function (e) {
            e.preventDefault();
            this.trigger('signUp');
        },

        onSubmit: function (e) {
            e.preventDefault();
            var data = formHelper.extractFormValues(this.$('form'));

            this.trigger('login', data);
        }
    });

    return LoginView;
});
