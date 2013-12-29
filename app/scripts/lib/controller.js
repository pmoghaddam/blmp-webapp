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
    var Controller = Backbone.Controller = Marionette.Controller.extend({

        showLayout: function (layout) {
            layout.on('close', this.close, this);
            appLayout.show(layout);
        },

        listenToView: function (view) {
            // One controller per view, avoid reuse
            if (this.listeningToView) {
                console.error('Do not reuse controllers');
            } else {
                this.listeningToView = view;
            }

            // Views track controllers that are listening to them
            if (view.controllers) {
                view.controllers.push(this);
            } else {
                view.controllers = [this];
            }

            // Listen to events on the view
            var events = this.events;
            for (var key in events) {
                view.on(key, this[events[key]], this);
            }

            // Destroy when view is destroyed
            view.on('close', this.close, this);
        }

    });

    return Controller;
});
