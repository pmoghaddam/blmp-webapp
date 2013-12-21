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
            'submit': 'onSubmit'
        },

        render: function () {
            this.$el.html(this.template({}));
            return this;
        },

        onSubmit: function (e) {
            var data = formHelper.extractFormValues(this.$el.find('form'));

            this.trigger('login', data);

            e.preventDefault();
        }
    });

    return LoginView;
});
