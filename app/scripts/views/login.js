/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var LoginView = Backbone.View.extend({
        template: JST['app/scripts/templates/login.ejs'],

        render: function () {
            this.$el.html(this.template({}));
            return this;
        }
    });

    return LoginView;
});
