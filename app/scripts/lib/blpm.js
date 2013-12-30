/*global define*/

/**
 * Assisting class to load required classes
 */
define([
    'lib/controller',
    'lib/mediator',
    'lib/service',
    'lib/sync',
    'lib/view'
], function (Controller, Mediator, Service) {
    'use strict';

    var BLPM = {
        Controller: Controller,
        Mediator: Mediator,
        Service: Service
    };

    return BLPM;
});
