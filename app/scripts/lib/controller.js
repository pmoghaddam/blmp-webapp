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
            layout.on('close', this.destruct, this);
            appLayout.show(layout);
        },

        showModal: function(modal) {
            modal.on('close', this.destruct, this);
            appLayout.showModal(modal);
        },

        listenToView: function (view) {
            // One controller per view, avoid reuse
            if (this._listeningToView) {
                console.error('Do not reuse controllers');
            } else {
                this._listeningToView = view;
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
            view.on('close', this.destruct, this);
        },

        destruct: function () {
            if (this._destructed) {
                return;
            }
            this._destructed = true;

            _.each(this.objectsToDestruct, function (object) {
                if (_.isFunction(object.close)) {
                    object.close();
                }
            });

            this.close();
        },

        /**
         * Important for items such as collections that are listening
         * to sockets.
         */
        destructOnClose: function (object) {
            this.objectsToDestruct = this.objectsToDestruct || [];
            this.objectsToDestruct.push(object);
        }

    });

    return Controller;
});
