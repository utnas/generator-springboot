(function () {
    "use strict";

    var assert = require('assert');

    describe('spring boot generator app folder', function () {

        it('it should import app folder', function () {
            assert(require('../app') !== undefined);
        });
    });

})();