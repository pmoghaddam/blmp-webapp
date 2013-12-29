/*global define*/

define([
    'jquery',
    'backbone',
    'services/authentication'
], function ($, Backbone, AuthService) {
    'use strict';

    var Controller = Backbone.Mediator.extend({
        events: {
            'register': 'onRegister',
            'cancelSignUp': 'onCancel'
        },

        onCancel: function () {
            this.layout.showLogin();
            Backbone.history.navigate('login');
        },

        onRegister: function (registrationInfo) {
            var me = this;

            new AuthService()
                .register(registrationInfo)
                .then(function () {
                    me.layout.showLogin();
                }).done();
        }

    });

    return Controller;
});
