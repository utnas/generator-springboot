(function () {
    'use strict';

    var path = require('path'),
        helpers = require('yeoman-generator').test;

    describe('spring boot generator', function () {

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

        it('creates expected gradle file', function (done) {
            helpers.mockPrompt(this.app, {
                'packageName': 'com.testme',
                'baseName': 'myapp',
                'bootVersion': '1.3.0.SNAPSHOT'
            });
            this.app.options['skip-install'] = true;
            this.app.run({}, function () {
                helpers.assertFiles(['build.gradle']);
                done();
            });
        });

        it('creates expected java file', function (done) {
            helpers.mockPrompt(this.app, {
                'packageName': 'com.testme',
                'baseName': 'myapp',
                'bootVersion': '1.3.0.SNAPSHOT'
            });
            this.app.options['skip-install'] = true;
            this.app.run({}, function () {
                helpers.assertFiles(['src/main/java/com/testme/Application.java']);
                done();
            });
        });
    });

})();