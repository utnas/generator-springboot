(function () {
    'use strict';

    var path = require('path'),
        fs = require('fs'),
        helpers = require('yeoman-generator').test;

    describe('spring boot build.gradle generator', function () {

        beforeEach(function (done) {
            helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
                if (err) {
                    return done(err);
                }

                this.app = helpers.createGenerator('springboot:app', [
                    '../../app'
                ]);
                done();
            }.bind(this));
        });

        it('should create build gradle file', function (done) {
            helpers.mockPrompt(this.app, {
                'packageName': 'com.testme',
                'applicationName': 'myapp',
                'bootVersion': '1.3.0.SNAPSHOT'
            });
            this.app.options['skip-install'] = true;
            this.app.run({}, function () {
                helpers.assertFiles(['build.gradle']);
                done();
            });
        });

    });

})();