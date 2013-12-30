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
