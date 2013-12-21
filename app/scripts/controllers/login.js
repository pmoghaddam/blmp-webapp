/*global define*/

define([
    'jquery',
    'backbone',
    'views/login'
], function ($, Backbone, LoginView) {
    'use strict';

    var LoginController = Backbone.Controller.extend({
        start: function () {
            var loginView = new LoginView({el: '#app'});
            this.addListeners(loginView);
            loginView.render();
        },

        addListeners: function(view) {
            view.on('login', this.onLogin, this);
        },

        onLogin: function(data) {
            console.log(data);
        }
    });

    return LoginController;
});
