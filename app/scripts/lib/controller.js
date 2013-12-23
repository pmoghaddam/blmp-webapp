/*global define*/

define([
    'jquery',
    'backbone',
    'underscore',
    'views/layouts/appLayout'
], function ($, Backbone, _, appLayout) {
    'use strict';

    // Add initialization method here
    var Controller = Backbone.Controller = Backbone.View.extend({
        createLayout: function () {
            console.error('`createLayout` not implemented');
        },

        doLayout: function () {
            if (this.layout) {
                this.layout.remove();
            }

            var layout = this.layout = this.createLayout();

            // Render layout
            this.$el.empty();
            this.$el.append(layout.render().el);
            appLayout.show(this);

            return layout;
        }
    });

    return Controller;
});
