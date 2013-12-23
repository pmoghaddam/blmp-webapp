/*global define*/

define([
    'jquery',
    'backbone',
    'q',
    'services/socket',
    'services/authentication'
], function ($, Backbone, Q, SocketService, AuthService) {
    'use strict';

    var LoginRouter = Backbone.Router.extend({
        routes: {
            '': 'tasks',
            'login': 'login',
            'logout': 'logout',
            'tasks': 'tasks'
        },

        initialize: function (options) {
            this.controllers = options.controllers;
        },

        authenticate: function () {
            var me = this;

            return new AuthService().connect().fail(function () {
                me.navigate('login', {trigger: true});
            });
        },

        index: function () {
            var me = this;

            this.authenticate().then(function () {
                me.controllers.login.login();
            });
        },

        login: function () {
            this.controllers.login.login();
        },

        tasks: function () {
            var me = this;

            this.authenticate().then(function () {
                me.controllers.task.list();
            });
        },

        logout: function () {
            var me = this;
            new AuthService().logout().then(function () {
                me.navigate('login', {trigger: true});
            });
        }

    });

    return LoginRouter;
});
