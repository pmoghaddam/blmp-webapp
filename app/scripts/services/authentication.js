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
        }
    });

    return AuthenticationService;
});
