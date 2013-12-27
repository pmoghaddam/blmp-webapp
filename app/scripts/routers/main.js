/*global define*/

define([
    'jquery',
    'backbone',
    'q',
    'services/socket',
    'services/authentication',
    'controllers/login',
    'controllers/task'
], function ($, Backbone, Q, SocketService, AuthService, LoginController, TaskController) {
    'use strict';

    var exceptionHandler = function(err) {
        // TODO: Isolate to development eventually
        console.error(err.message);
    };

    var LoginRouter = Backbone.Router.extend({
        routes: {
            '': 'tasks',
            'login': 'login',
            'logout': 'logout',
            'tasks(/:id)': 'tasks',
            'register': 'register'
        },

        authenticate: function () {
            var me = this;

            return new AuthService().connect().fail(function () {
                me.navigate('login', {trigger: true});
            }).fail(exceptionHandler);
        },

        index: function () {
            this.authenticate().then(function () {
                new LoginController().login();
            }).fail(exceptionHandler);
        },

        login: function () {
            new LoginController().login();
        },

        register: function () {
            new LoginController().register();
        },

        tasks: function (id) {
            this.authenticate().then(function () {
                new TaskController().list(id);
            }).fail(exceptionHandler);
        },

        logout: function () {
            var me = this;
            new AuthService().logout().then(function () {
                me.navigate('login', {trigger: true});
            }).fail(exceptionHandler);
        }

    });

    return LoginRouter;
});
