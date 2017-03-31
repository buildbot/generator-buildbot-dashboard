'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

jest.mock('npm-name', () => () => Promise.resolve(true));

describe('generator-buildbot-dashboard:app', () => {
    beforeAll(() => {
        return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
          name: 'mydashboard',
          description: 'A cool dashboard',
          homepage: 'http://buildbot.net',
          githubAccount: 'buildbot',
          authorName: 'The Buildbot Team',
          authorEmail: 'hi@buildbot.net',
          authorUrl: 'http://buildbot.net',
          keywords: [],
          license: 'MIT'
      });
    });
    it('creates files', () => {
        assert.file([
            'README.md',
            'setup.py'
        ]);
        assert.noFileContent(
      'setup.py', '<%= app_name_kebab %>'
    );
    });
});
