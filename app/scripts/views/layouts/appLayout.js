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
            app: '#app',
            modal: '#modal'
        },

        show: function (view) {
            this.app.show(view);
        },

        showModal: function (modal) {
            this.modal.show(modal);
        }
    });

    // Singleton
    return new View();
});
