/*global define*/

define([
    'jquery',
    'backbone',
    'lib/blpm',
    'underscore',
    'views/collaboratorsView',
    'controllers/mediators/collaboratorsMediator',
    'services/task',
    'collections/users'
], function ($, Backbone, BLPM, _, CollaboratorsView, CollaboratorsMediator, TaskService, UsersCollection) {
    'use strict';

    var Controller = BLPM.Controller.extend({

        show: function (taskList) {
            var me = this;
            this.taskList = taskList;

            new TaskService().getCollaborators(taskList)
                .then(function (users) {
                    me.collection = new UsersCollection(users);
                    me.destructOnClose(me.collection);

                    me.view = new CollaboratorsView({model: taskList, collection: me.collection});
                    new CollaboratorsMediator({view: me.view, model: taskList, collection: me.collection});

                    me.showModal(me.view);
                }).done();
        }

    });

    return Controller;
});
