/*global define*/

define([
    'jquery',
    'backbone',
    'services/authentication'
], function ($, Backbone, AuthService) {
    'use strict';

    var Controller = Backbone.Controller.extend({
        events: {
            'register': 'onRegister',
            'cancelSignUp': 'onCancel'
        },

        initialize: function (options) {
            var view = this.view = options.view;
            this.layout = options.layout;

            this.listenToView(view);
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
