/*global define*/

define([
    'jquery',
    'underscore',
    'marionette'
], function ($, _, Marionette) {
    'use strict';

    var View = Marionette.Layout.extend({
        el: 'body',

        regions: {
            app: '#app'
        },

        show: function (view) {
            this.app.show(view);
        }
    });

    // Singleton
    return new View();
});
