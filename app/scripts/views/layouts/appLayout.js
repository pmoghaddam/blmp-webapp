/*global define*/

define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    'use strict';

    var View = Backbone.View.extend({
        el: '#app',

        show: function (view) {
            // Do nothing for the same view
            if (view === this.showing) {
                return;
            }

            this.reset();

            this.showing = view;
            this.$el.append(view.el);
        },

        reset: function () {
            if (!this.showing) {
                return;
            }

            // Clean application
            this.$el.empty();

            // Clean view itself
            this.showing.remove();
            this.showing = null;
        }
    });

    // Singleton
    return new View();
});
