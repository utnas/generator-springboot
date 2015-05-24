(function () {
    "use strict";

    var util = require('util'),
        path = require('path'),
        yeoman = require('yeoman-generator'),
        chalk = require('chalk'),
        yosay = require('yosay');

    var SpringBootGenerator = module.exports = function () {
        yeoman.generators.Base.apply(this, arguments);
    };

    util.inherits(SpringBootGenerator, yeoman.generators.Base);

    SpringBootGenerator.prototype.askFor = function () {
        var waitCallback = this.async();

        console.log(yosay('\nWelcome to the Java Spring Boot Generator\n\n'));
        var prompts = [
            {
                type: 'string',
                name: 'bootVersion',
                message: '(1/6) What version of Spring Boot would you like to use?',
                default: '1.3.0.BUILD-SNAPSHOT'
            },
            {
                type: 'string',
                name: 'packageName',
                message: '(2/6) What is your default package name?',
                default: 'com.myapp'
            },
            {
                type: 'string',
                name: 'baseName',
                message: '(3/6) What is the base name of app?',
                default: 'app'
            },
            {
                type: 'checkbox',
                name: 'starters',
                message: '(4/6) select your starters',
                choices: [
                    {
                        name: 'Jetty (Tomcat will be uninstalled)',
                        value: 'jetty'
                    },
                    {
                        name: 'Actuator',
                        value: 'actuator'
                    },
                    {
                        name: 'Aop',
                        value: 'aop'
                    },
                    {
                        name: 'Batch',
                        value: 'batch'
                    },
                    {
                        name: 'Data-jpa',
                        value: 'jpa'
                    },
                    {
                        name: 'Integration',
                        value: 'integration'
                    },
                    {
                        name: 'Hateoas',
                        value: 'hateoas'
                    },
                    {
                        name: 'Jdbc',
                        value: 'jdbc'
                    },
                    {
                        name: 'Logging',
                        value: 'logging'
                    },
                    {
                        name: 'Security',
                        value: 'security'
                    },
                    {
                        name: 'Websocket',
                        value: 'websocket'
                    }
                ]
            }, {
                type: 'confirm',
                name: 'useSpock',
                message: '(5/6) Would you like to use Spock?',
                default: true
            },
            {
                type: 'confirm',
                name: 'useWrapper',
                message: '(6/6) Would you like to add the Gradle wrapper?',
                default: true
            }
        ];

        this.prompt(prompts, function (props) {
            this.packageName = props.packageName;
            this.baseName = props.baseName;
            this.useWrapper = props.useWrapper;
            this.bootVersion = props.bootVersion;
            this.useSpock = props.useSpock;
            this.starters = props.starters;

            var hasStarter = function (starter) {
                return props.starters ? props.starters.indexOf(starter) !== -1 : true;
            };
            this.jetty = hasStarter('jetty');
            this.actuator = hasStarter('actuator');
            this.aop = hasStarter('aop');
            this.batch = hasStarter('batch');
            this.hateoas = hasStarter('hateoas');
            this.jpa = hasStarter('jpa');
            this.integration = hasStarter('integration');
            this.jdbc = hasStarter('jdbc');
            this.logging = hasStarter('logging');
            this.security = hasStarter('security');
            this.websocket = hasStarter('websocket');

            waitCallback();

        }.bind(this));
    };

    SpringBootGenerator.prototype.app = function app() {

        var packageFolder = this.packageName.replace(/\./g, '/'),
            srcDir = 'src/main/java/' + packageFolder;

        this.mkdir(srcDir);
        this.template('build.gradle', 'build.gradle');
        this.template('Application.java', srcDir + '/Application.java');

        if (this.useSpock) {
            var testDir = 'src/test/groovy/' + packageFolder;
            this.mkdir(testDir);
        }

        this.config.set('packageName', this.packageName);
        this.config.set('packageFolder', packageFolder);
    };

    SpringBootGenerator.prototype.projectfiles = function projectfiles() {

    };

})();
