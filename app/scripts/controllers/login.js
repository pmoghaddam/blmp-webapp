/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'lib/dispatcher',
    'services/authentication',
    'services/socket',
    'views/login',
    'views/registration'
], function ($, _, Backbone, dispatcher, AuthService, SocketService, LoginView, RegistrationView) {
    'use strict';

    var LoginController = Backbone.Controller.extend({
        login: function () {
            // Initial screen
            this.setView(this.renderLogin());
        },

        renderLogin: function () {
            // Setup view
            var loginView = new LoginView();
            loginView.on('login', this.onLogin, this);
            loginView.on('register', this.onSignUp, this);
            loginView.render();
            return loginView;
        },

        renderRegistration: function () {
            var registrationView = new RegistrationView();
            registrationView.on('register', this.onRegister, this);
            registrationView.render();
            return registrationView;
        },

        onSignUp: function () {
            this.setView(this.renderRegistration());
        },

        setView: function (view) {
            if (this.view) {
                this.view.remove();
            }

            this.view = view;
            $('#app').append(view.el);
        },

        onRegister: function (registrationInfo) {
            var me = this;

            new AuthService()
                .register(registrationInfo)
                .then(function () {
                    me.setView(me.renderLogin());
                });
        },

        onLogin: function (credentials) {
            var me = this;

            new AuthService()
                .login(credentials)
                .then(function () {
                    me.view.remove();
                    Backbone.history.navigate('tasks', {trigger: true});
//                    dispatcher.trigger('loggedIn');
                });
        }
    });

    return LoginController;
});
