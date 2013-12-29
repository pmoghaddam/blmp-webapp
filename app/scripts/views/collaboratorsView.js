/*global define*/

define([
    'jquery',
    'underscore',
    'marionette',
    'templates',
    'views/collaboratorView',
    'bootstrap.modal'
], function ($, _, Marionette, JST, CollaboratorItemView) {
    'use strict';

    var View = Marionette.CompositeView.extend({
        className: 'collaborators-view',
        template: JST['app/scripts/templates/collaboratorsView.ejs'],
        itemView: CollaboratorItemView,
        itemViewEventPrefix: 'collaborator',
        itemViewContainer: '.collaborators',

        events: {
            'hidden.bs.modal': 'onHidden',
            'click #add-collaborator': 'onAddCollaborator'
        },

        onHidden: function () {
            this.$el.remove();
        },

        onAddCollaborator: function () {
            var $input = this.$('#add-collaborator-input');
            var email = $input.val();
            $input.val('');
            this.trigger('collaborator:create', email);
        },

        onRender: function () {
            this.$('.modal').modal('show');
        }
    });

    return View;
});
