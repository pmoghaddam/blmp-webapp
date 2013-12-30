/*global define*/

define([
    'jquery',
    'backbone',
    'lib/blpm'
], function ($, Backbone, BLPM) {
    'use strict';

    var Controller = BLPM.Controller.extend({
        start: function () {
            // Starting logic of controller
        }
    });

    return Controller;
});
