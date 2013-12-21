'use strict';

define(['underscore'], function (_) {

    var IO = function () {
        this.io = window.io;
        this.socket = null;
    };

    _.extend(IO.prototype, {
        connect: function (url, options) {
            this.socket = this.io.connect(url, options);
            return this.socket;
        }
    });

    // Singleton
    return new IO();
});