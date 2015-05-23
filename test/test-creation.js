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

        it('creates expected files', function (done) {
            var expected = [
                // add files you expect to exist here.
                'build.gradle'
            ];

            helpers.mockPrompt(this.app, {
                'packageName': 'com.testme.testme',
                'baseName': 'myapp',
                'bootVersion': '1.3.0.SNAPSHOT'
            });
            this.app.options['skip-install'] = true;
            this.app.run({}, function () {
                helpers.assertFiles(expected);
                done();
            });
        });
    });

})();