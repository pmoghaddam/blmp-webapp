/*global define*/

define([
    'jquery',
    'underscore',
    'marionette',
    'templates',
    'views/loginView',
    'views/registrationView',
    'controllers/mediators/registrationMediator',
    'controllers/mediators/loginMediator'
], function ($, _, Marionette, JST, LoginView, RegistrationView, RegistrationMediator, LoginMediator) {
    'use strict';

    var Layout = Marionette.Layout.extend({
        template: JST['app/scripts/templates/layouts/loginLayout.ejs'],
        className: 'login-layout',

        regions: {
            mainRegion: '#main-region'
        },

        showLogin: function () {
            var view = new LoginView();
            new LoginMediator({view: view, layout: this});
            this.mainRegion.show(view);
        },

        showRegistration: function () {
            var view = new RegistrationView();
            new RegistrationMediator({view: view, layout: this});
            this.mainRegion.show(view);
        }

    });

    return Layout;
});
