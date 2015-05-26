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
                name: 'applicationName',
                message: '(3/6) What is the base name of app?',
                default: 'app'
            },
            {
                type: 'checkbox',
                name: 'starters',
                message: '(4/6) select your (4/6)Project dependencies',
                choices: [
                    // Core
                    {
                        name: 'Security',
                        value: 'security'
                    },
                    {
                        name: 'AOP',
                        value: 'aop'
                    },
                    {
                        name: 'Atomikos (JTA)',
                        value: 'atomikos'
                    },
                    {
                        name: 'Bitronix (JTA)',
                        value: 'bitronix'
                    },
                    // Web
                    {
                        name: 'Web',
                        value: 'web'
                    },
                    {
                        name: 'Websocket',
                        value: 'websocket'
                    },
                    {
                        name: 'Ws',
                        value: 'ws'
                    },
                    {
                        name: 'Jersey (JAX-RS)',
                        value: 'jersey'
                    },
                    {
                        name: 'Vaadin',
                        value: 'vaadin'
                    },
                    {
                        name: 'Rest Repositories',
                        value: 'rest'
                    },
                    {
                        name: 'HATEOAS',
                        value: 'hateoas'
                    },
                    {
                        name: 'Mobile',
                        value: 'mobile'
                    },
                    // Data
                    {
                        name: 'JDBC',
                        value: 'jdbc'
                    },
                    {
                        name: 'JPA',
                        value: 'jpa'
                    },
                    {
                        name: 'MongoDB',
                        value: 'mongodb'
                    },
                    {
                        name: 'Redis',
                        value: 'redis'
                    },
                    {
                        name: 'Gemfire',
                        value: 'gemfire'
                    },
                    {
                        name: 'Solr',
                        value: 'solr'
                    },
                    {
                        name: 'Elasticsearch',
                        value: 'elasticsearch'
                    },
                    // Cloud
                    {
                        name: 'JPA',
                        value: 'jpa'
                    },
                    {
                        name: 'MongoDB',
                        value: 'mongodb'
                    },
                    {
                        name: 'JDBC',
                        value: 'jdbc'
                    },
                    {
                        name: 'JPA',
                        value: 'jpa'
                    },
                    {
                        name: 'MongoDB',
                        value: 'mongodb'
                    },
                    {
                        name: 'JDBC',
                        value: 'jdbc'
                    },
                    {
                        name: 'JPA',
                        value: 'jpa'
                    },
                    {
                        name: 'MongoDB',
                        value: 'mongodb'
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
            this.applicationName = props.applicationName;
            this.useWrapper = props.useWrapper;
            this.bootVersion = props.bootVersion;
            this.useSpock = props.useSpock;

            // here spring dependencies
            this.starters = props.starters;

            var hasStarter = function (starter) {
                return props.starters ? props.starters.indexOf(starter) !== -1 : true;
            };

            // Core
            this.security = hasStarter('security');
            this.aop = hasStarter('aop');
            this.atomikos = hasStarter('atomikos');
            this.bitronix = hasStarter('bitronix');

            // Web
            this.web = hasStarter('web');
            this.websocket = hasStarter('websocket');
            this.ws = hasStarter('ws');
            this.jersey = hasStarter('jersey');
            this.vaadin = hasStarter('vaadin');
            this.rest = hasStarter('rest');
            this.hateoas = hasStarter('hateoas');
            this.mobile = hasStarter('mobile');

            // Data
            this.jdbc = hasStarter('jdbc');
            this.jpa = hasStarter('jpa');
            this.mongodb = hasStarter('mongodb');
            this.redis = hasStarter('redis');
            this.gemfire = hasStarter('gemfire');
            this.solr = hasStarter('solr');
            this.elasticsearch = hasStarter('elasticsearch');

            // Cloud
            this.logging = hasStarter('logging');
            this.security = hasStarter('security');
            this.websocket = hasStarter('websocket');
            this.logging = hasStarter('logging');
            this.security = hasStarter('security');
            this.websocket = hasStarter('websocket');
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
