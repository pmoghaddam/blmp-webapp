/*global define*/

define([
    'jquery',
    'backbone',
    'lib/config'
], function ($, Backbone, config) {
    'use strict';

    var AuthenticationService = Backbone.Service.extend({
        login: function (credentials) {
            return $.ajax({
                method: 'POST',
                url: config.url + '/v0/session',
                data: credentials,
                xhrFields: {
                    withCredentials: true
                }
            });
        }
    });

    return AuthenticationService;
});
