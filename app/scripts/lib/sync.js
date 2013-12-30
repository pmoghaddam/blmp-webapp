/*global define*/
/*jslint indent: false */

define([
    'jquery',
    'backbone',
    'underscore',
    'lib/socket-io'
], function ($, Backbone, _, io) {
    'use strict';

    // Generate four random hex digits.
    var S4 = function () {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
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

            // Merge with additional params (if exists)
            if (model.collection) {
                _.extend(data, model.collection.socketParams);
            }
            _.extend(data, model.socketParams);

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
    var sync = Backbone.Collection.prototype.sync;
    _.extend(Backbone.Collection.prototype, {
        sync: function () {
            if (this.socketStorage && !this._initializedSocketStorage) {
                this.initializeSocketStorage();
            }

            sync.apply(this, arguments);
        },

        initializeSocketStorage: function () {
            this._initializedSocketStorage = true;
            var namespace = this.socketStorage;
            var me = this;

            var createEvent = namespace + ':create';
            var updateEvent = namespace + ':update';
            var deleteEvent = namespace + ':delete';

            // Filter logic
            var ignoreEvent = function (data, filter) {
                if (!filter) {
                    return false;
                }

                for (var key in filter) {
                    if (data[key] !== filter[key]) {
                        return true;
                    }
                }

                return false;
            };

            // Socket events
            var socketEvents = this.socketEvents = {};
            socketEvents[createEvent] = function (data) {
                if (ignoreEvent(data, me.socketFilter)) {
                    return;
                }

                var model = me.findWhere({guid: data.guid});

                // Distinguish between whether you made it or not
                if (model) {
                    model.set(data);
                } else {
                    me.add(data);
                }
            };
            socketEvents[updateEvent] = function (data) {
                if (ignoreEvent(data, me.socketFilter)) {
                    return;
                }

                me.add(data, {merge: true});
            };
            socketEvents[deleteEvent] = function (data) {
                if (ignoreEvent(data, me.socketFilter)) {
                    return;
                }

                var model = me.get(data._id);
                if (model) {
                    me.remove(model);
                }
            };

            // Bind events
            for (var key in socketEvents) {
                io.socket.on(key, socketEvents[key]);
            }
        },

        close: function () {
            // Unbind events
            var socketEvents = this.socketEvents;
            for (var key in socketEvents) {
                io.socket.removeListener(key, socketEvents[key]);
            }
        }
    });

    return Sync;
});
