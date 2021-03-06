/*global define*/

define([
    'jquery',
    'backbone',
    'lib/blpm',
    'services/authentication'
], function ($, Backbone, BLPM, AuthService) {
    'use strict';

    var Controller = BLPM.Mediator.extend({
        events: {
            'signUp': 'onSignUp',
            'login': 'onLogin'
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
