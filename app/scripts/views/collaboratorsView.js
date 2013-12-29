/*global define*/

define([
    'jquery',
    'underscore',
    'marionette',
    'templates',
    'views/collaboratorView',
    'mediators/collaboratorsMediator',
    'bootstrap.modal'
], function ($, _, Marionette, JST, CollaboratorItemView, CollaboratorsMediator) {
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

        initialize: function (options) {
            new CollaboratorsMediator({view: this, model: options.model, collection: options.collection});
        },

        onHidden: function () {
            this.$el.remove();
        },

        onAddCollaborator: function () {
            var $input = this.$('#add-collaborator-input');
            var email = $input.val();
            $input.val('');
            this.trigger('collaborator:create', email);
        }
    });

    return View;
});
