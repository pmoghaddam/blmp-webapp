/*global define*/

define([
    'jquery',
    'backbone',
    'marionette',
    'underscore',
    'views/layouts/appLayout'
], function ($, Backbone, Marionette, _, appLayout) {
    'use strict';

    // Add initialization method here
    // TODO: Create own namespace?
    var Controller = Backbone.Controller = Marionette.Controller.extend({

        showLayout: function (layout) {
            // Bind to all layout listeners
            this.listenToView(layout);

            appLayout.show(layout);
        },

        listenToView: function (view) {
            var events = this.events;
            for (var key in events) {
                view.on(key, this[events[key]], this);
            }
        }
    });

    return Controller;
});
