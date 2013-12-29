/*global define*/

define([
    'jquery',
    'backbone',
    'services/authentication'
], function ($, Backbone, AuthService) {
    'use strict';

    var Controller = Backbone.Controller.extend({
        events: {
            'signUp': 'onSignUp',
            'login': 'onLogin'
        },

        initialize: function (options) {
            var view = this.view = options.view;
            this.layout = options.layout;

            this.listenToView(view);
        },

        onSignUp: function () {
            this.layout.showRegistration();
            Backbone.history.navigate('register');
        },

        onLogin: function (credentials) {
            new AuthService()
                .login(credentials)
                .then(function () {
                    Backbone.history.navigate('tasks', {trigger: true});
                }).done();
        }
    });

    return Controller;
});
