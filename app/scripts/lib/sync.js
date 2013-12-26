/*global define*/

define([
    'jquery',
    'backbone',
    'underscore',
    'lib/socket-io'
], function ($, Backbone, _, io) {
    'use strict';

    // Generate four random hex digits.
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };

    // Generate a pseudo-GUID by concatenating random hexadecimal.
    var guid = function () {
        return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
    };

    // Create custom socket storage
    var Sync = {

        // Hold onto original
        backboneSync: Backbone.sync,

        sync: function (method, model, options) {
            var namespace = model.socketStorage;
            var event;
            var data = {};

            switch (method) {
            case 'read':
                if (model instanceof Backbone.Model) {
                    data = model.toJSON();
                    event = namespace + ':show';
                } else {
                    event = namespace + ':list';
                }
                // Not globally impacting (i.e. not mutating)
                io.socket.once(event, function (data) {
                    options.success(data);
                });
                break;
            case 'create':
                event = namespace + ':create';
                model.set({guid: guid()});
                data = model.toJSON();
                break;
            case 'update':
                event = namespace + ':update';
                data = model.changedAttributes();
                data.id = model.id;
                break;
            case 'delete':
                event = namespace + ':delete';
                data = {id: model.id};
                break;
            }

            io.socket.emit(event, data);
        },

        // Ability to dynamically switch between options
        getSyncMethod: function (model) {
            if (model.socketStorage || (model.collection && model.collection.socketStorage)) {
                return Sync.sync;
            } else {
                return Sync.backboneSync;
            }
        }

    };

    // Dynamically determine sync method
    Backbone.sync = function (method, model, options) {
        return Sync.getSyncMethod(model).apply(this, [method, model, options]);
    };

    // Enhance collections
    _.extend(Backbone.Collection.prototype, {
        initializeSocketStorage: function () {
            var namespace = this.socketStorage;
            var me = this;

            io.socket.on(namespace + ':create', function (data) {
                var model = me.findWhere({guid: data.guid});

                // Distinguish between whether you made it or not
                if (model) {
                    model.set(data);
                } else {
                    me.add(data);
                }
            });

            io.socket.on(namespace + ':update', function (data) {
                me.add(data, {merge: true});
            });

            io.socket.on(namespace + ':delete', function (data) {
                var model = me.get(data._id);
                if (model) {
                    me.remove(model);
                }
            });
        }
    });

    return Sync;
});
