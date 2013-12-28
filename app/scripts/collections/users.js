/*global define*/

define([
    'underscore',
    'backbone',
    'models/user'
], function (_, Backbone, UserModel) {
    'use strict';

    var Collection = Backbone.Collection.extend({
        model: UserModel
    });

    return Collection;
});
