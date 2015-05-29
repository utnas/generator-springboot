(function () {
    "use strict";

    var util = require('util');
    var yeoman = require('yeoman-generator');

    var RestGenerator = module.exports = function RestGenerator(args, options, config) {
        yeoman.generators.Base.apply(this, arguments);
    };

    util.inherits(RestGenerator, yeoman.generators.Base);

    RestGenerator.prototype.askFor = function askFor() {
        var cb = this.async();

        var prompts = [
            {
                type: 'string',
                name: 'packageName',
                message: '(1/4) Package name:',
                default: this.config.get('packageName')
            },
            {
                type: 'string',
                name: 'interfaceImplName',
                message: '(2/4) Name for your representation class:',
                default: 'RestInterfaceImpl'
            },
            {
                type: 'string',
                name: 'interfaceName',
                message: '(3/4) Name for your controller:',
                default: 'RestInterface'
            },
            {
                type: 'string',
                name: 'interfaceImplName',
                message: '(4/4) Path to Controller:',
                default: '/hello-world'
            }
        ];

        this.prompt(prompts, function (props) {
            this.packageName = props.packageName;
            this.representation = props.representation;
            this.interfaceName = props.interfaceName;
            this.interfaceImplName = props.interfaceImplName;
            cb();
        }.bind(this));

    };

    RestGenerator.prototype.files = function app() {
        var packageFolder = this.packageName.replace(/\./g, '/');
        var controllersDir = 'src/main/java/' + packageFolder + '/rest';
        var domainsDir = 'src/main/java/' + packageFolder + '/domain';

        this.mkdir(controllersDir);
        this.mkdir(domainsDir);

        this.template('RestInterface.java', controllersDir + '/' + this.interfaceName + '.java');
        this.template('RestInterfaceImpl.java', domainsDir + '/' + this.representation + '.java');

        this.config.set('packageName', this.packageName);
    };

})();