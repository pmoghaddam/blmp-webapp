/*global sinon*/

define([
    'controllers/applicationController'
], function (ApplicationController) {
    'use strict';

    describe('Smoke Test', function () {
        it('should have Require.JS mapped properly', function () {
            assert.ok(ApplicationController);
        });

        it('should have Sinon.JS loaded', function () {
            assert.ok(sinon);
        });
    });
});

