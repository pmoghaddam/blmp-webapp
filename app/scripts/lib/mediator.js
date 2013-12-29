/*global define*/

define([
    'underscore',
    'backbone',
    'lib/controller'
], function (_, Backbone, Controller) {
    'use strict';

    var mediatorOptions = ['view', 'model', 'collection', 'layout'];

    var Mediator = Backbone.Mediator = Controller.extend({
        events: {},

        /**
         * Common mediator logic to hold onto particular options
         * and begin listening to events
         */
        initialize: function (options) {
            var picked = _.pick(options, mediatorOptions);
            _.extend(this, picked);
            this.listenToView(options.view);
        }
    });

    return Mediator;
});
