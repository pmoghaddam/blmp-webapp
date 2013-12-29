/*global define*/

define([
    'jquery',
    'underscore',
    'marionette',
    'templates',
    'lib/formHelper'
], function ($, _, Marionette, JST, formHelper) {
    'use strict';

    var View = Marionette.ItemView.extend({
        id:'registration-form',
        template: JST['app/scripts/templates/registrationView.ejs'],
        events: {
            'submit': 'onSubmit',
            'click .cancel-sign-up': 'onCancel'
        },

        onSubmit: function (e) {
            e.preventDefault();
            var data = formHelper.extractFormValues(this.$('form'));
            this.trigger('register', data);
        },

        onCancel: function (e) {
            e.preventDefault();
            this.trigger('cancelSignUp');
        }
    });

    return View;
});
