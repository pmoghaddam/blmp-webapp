'use strict';

define([], function () {

    // Singleton
    return {
        io: window.io,
        socket: null // Set on connection
    };
});