(function () {
    "use strict";

    var path = require('path'),
        helpers = require('yeoman-generator').test;

    describe('spring boot rest java files generator', function () {

        beforeEach(function (done) {
            helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
                if (err) {
                    return done(err);
                }

                this.rest = helpers.createGenerator('springboot:rest', [
                    '../../rest'
                ]);
                done();
            }.bind(this));
        });

        it('should create interface.java file', function (done) {
            helpers.mockPrompt(this.rest, {
                'packageName': 'com.testme',
                'applicationName': 'myapp',
                'bootVersion': '1.3.0.SNAPSHOT'
            });
            this.app.options['skip-install'] = true;
            this.app.run({}, function () {
                helpers.assertFiles(['src/main/java/com/testme/rest/Application.java']);
                done();
            });
        });
    });

})();