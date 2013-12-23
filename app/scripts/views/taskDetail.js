/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var View = Backbone.View.extend({
        template: JST['app/scripts/templates/taskDetail.ejs'],

        render: function () {
            this.$el.html(this.template(this.model.attributes));
            return this;
        }
    });

    return View;
});
