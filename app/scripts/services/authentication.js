/*global define*/

define([
    'jquery',
    'backbone',
    'lib/config',
    'q'
], function ($, Backbone, config, q) {
    'use strict';

    var AuthenticationService = Backbone.Service.extend({
        login: function (credentials) {
            return q($.ajax({
                method: 'POST',
                url: config.url + '/v0/session',
                data: credentials,
                xhrFields: {
                    withCredentials: true
                }
            }));
        },

        register: function (info) {
            return q($.ajax({
                method: 'POST',
                url: config.url + '/v0/registration',
                data: info
            }));
        }
    });

    return AuthenticationService;
});
