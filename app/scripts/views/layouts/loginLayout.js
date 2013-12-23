/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/login',
    'views/registration'
], function ($, _, Backbone, JST, LoginView, RegistrationView) {
    'use strict';

    var View = Backbone.View.extend({
        template: JST['app/scripts/templates/layouts/loginLayout.ejs'],
        className: 'login-layout',

        initialize: function () {
            this.login = new LoginView();
            this.registration = new RegistrationView();

            // Internal events
            this.listenTo(this.login, 'register', this.showRegistration);
        },

        showLogin: function () {
            this.login.$el.show();
            this.registration.$el.hide();
        },

        showRegistration: function () {
            this.login.$el.hide();
            this.registration.$el.show();
        },

        render: function () {
            this.$el.html(this.template());

            // Add children
            this.renderItem('#login-form', this.login);
            this.renderItem('#registration-form', this.registration);

            // Hidden registration
            this.registration.$el.hide();

            return this;
        },

        renderItem: function (selector, view) {
            if (!view || !view.render) {
                return;
            }

            return this.$el.find(selector).append(view.render().el);
        }
    });

    return View;
});
