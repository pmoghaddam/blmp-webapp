/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/collaborator',
    'bootstrap.modal'
], function ($, _, Backbone, JST, CollaboratorItemView) {
    'use strict';

    var View = Backbone.View.extend({
        className: 'collaborators-view',
        template: JST['app/scripts/templates/collaborators.ejs'],

        events: {
            'hidden.bs.modal': 'onHidden',
            'click #add-collaborator': 'onAddCollaborator'
        },

        initialize: function () {
            this.collection.on('add', this.addOne, this);
        },

        render: function () {
            this.$el.html(this.template({}));
            this.collection.forEach(this.addOne, this);

            $('body').append(this.el);
            this.$('.modal').modal('show');

            return this;
        },

        addOne: function (user) {
            var view = new CollaboratorItemView({model: user});

            var $listEl = this.$('.collaborators');
            $listEl.after(view.render().el);
        },

        onHidden: function () {
            this.$el.remove();
        },

        onAddCollaborator: function () {
            var $input = this.$('#add-collaborator-input');
            var email = $input.val();
            $input.val('');
            this.trigger('addCollaborator', email);
        }
    });

    return View;
});
