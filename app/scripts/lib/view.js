/*global define*/

define([
    'jquery',
    'backbone',
    'underscore'
], function ($, Backbone, _) {
    'use strict';

    var eventSplitter = /\s+/;

    var createRelayFn = function (event) {
        return function() {
            var args = _.toArray(arguments);

            args.unshift(event);
            this.trigger.apply(this, args);
        };
    };

    /**
     * Enhance views
     */
    _.extend(Backbone.View.prototype, {

        /**
         * Bubbles events from view upwards.
         */
        relayEvents: function (events, view) {
            var names = events.split(eventSplitter);
            for (var i = 0, l = names.length; i < l; i++) {
                view.on(names[i], createRelayFn(names[i]), this);
            }
        }

    });

});
