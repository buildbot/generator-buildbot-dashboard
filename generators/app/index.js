'use strict';
const Generator = require('yeoman-generator');
const _ = require('lodash');
const path = require('path');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
    initializing() {
        this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
        this.props = {};
    }
    prompting() {
        const prompts = [{
            store: true,
            type: 'string',
            name: 'name',
            message: 'Your Dashboard name',
            default: path.basename(process.cwd())
        }, {
            store: true,
            name: 'description',
            message: 'Description'
        }, {
            store: true,
            name: 'homepage',
            message: 'Project homepage url'
        }, {
            name: 'authorName',
            message: 'Author\'s Name',
            when: !this.props.authorName,
            default: this.user.git.name(),
            store: true
        }, {
            name: 'authorEmail',
            message: 'Author\'s Email',
            when: !this.props.authorEmail,
            default: this.user.git.email(),
            store: true
        }, {
            name: 'authorUrl',
            message: 'Author\'s Homepage',
            when: !this.props.authorUrl,
            store: true
        }, {
            store: true,
            name: 'keywords',
            message: 'Package keywords (comma to split)',
            when: !this.pkg.keywords,
            filter(words) {
                return words.split(/\s*,\s*/g);
            }
        }];

        return this.prompt(prompts).then(props => {
            this.props = _.extend(props, this.props);
      this.props.app_name = _.snakeCase(props.name); // eslint-disable-line
            this.props.appName = _.camelCase(props.name);
            this.props.AppName = _.upperFirst(this.props.appName);
      this.props.app_name_kebab = _.kebabCase(props.name); // eslint-disable-line
        });
    }
    default() {
        if (path.basename(this.destinationPath()) !== this.props.name) {
            this.log(
        'Your dashboard must be inside a folder named ' + this.props.name + '\n' +
        'I\'ll automatically create this folder.'
      );
            mkdirp(this.props.name);
            this.destinationRoot(this.destinationPath(this.props.name));
        }
    }
    writing() {
        if (!this.pkg.license) {
            this.composeWith(require.resolve('generator-license/app'), {
                name: this.props.authorName,
                email: this.props.authorEmail,
                website: this.props.authorUrl
            });
        }
        this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
        this.pkg = _.extend({
            name: this.props.name,
            version: '0.0.0',
            description: this.props.description,
            homepage: this.props.homepage,

            author: {
                name: this.props.authorName,
                email: this.props.authorEmail,
                url: this.props.authorUrl
            },
            keywords: [],
            dependencies: {
                guanlecoja: '~0.8.0',
                gulp: '~3.9.0'},
            devDependencies: {}
        }, this.pkg);
        this.props.license = this.pkg.license;

        this.fs.writeJSON(this.destinationPath('package.json'), this.pkg);
        for (var p of [
            'guanlecoja/config.coffee',
            'gulpfile.js',
            'README.rst',
            'setup.cfg',
            'setup.py',
            '.gitignore',
            'src/module/dashboard.tpl.jade',
            'src/module/dashboard.controller.coffee',
            'src/module/main.module.coffee',
            'src/module/main.module.spec.coffee',
            'src/styles/styles.less',
            '<%=app_name%>/__init__.py'
        ]) {
            this.fs.copyTpl(
                this.templatePath(p),
                this.destinationPath(_.template(p)(this.props)), this.props
            );
        }
    }

    install() {
    }
};
