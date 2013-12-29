/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'lib/dispatcher',
    'services/authentication',
    'services/socket',
    'views/layouts/loginLayout'
], function ($, _, Backbone, dispatcher, AuthService, SocketService, LoginLayout) {
    'use strict';

    var LoginController = Backbone.Controller.extend({
        className: 'login-controller',
        events: {
            'signUp': 'showRegistration',
            'cancelSignUp': 'showLogin',
            'login': 'onLogin',
            'register': 'onRegister'
        },

        login: function () {
            var layout = new LoginLayout();
            this.showLogin();

            this.showLayout(layout);
        },

        register: function () {
            var layout = new LoginLayout();
            this.showRegistration();

            this.showLayout(layout);
        },

        showLogin: function () {
            this.layout.showLogin();
            Backbone.history.navigate('login');
        },

        showRegistration: function () {
            this.layout.showRegistration();
            Backbone.history.navigate('register');
        },

        onRegister: function (e, registrationInfo) {
            var me = this;

            new AuthService()
                .register(registrationInfo)
                .then(function () {
                    me.showLogin();
                });
        },

        onLogin: function (e, credentials) {
            new AuthService()
                .login(credentials)
                .then(function () {
                    Backbone.history.navigate('tasks', {trigger: true});
                });
        }
    });

    return LoginController;
});
