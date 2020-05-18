'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  //Configurations will be loaded here.
  //Ask for user input
  prompting: function() {
    var done = this.async();
    this.prompt([{
      type: 'input',
      name: 'name',
      message: 'What name would you like for your application (e.g. my-new-app)?',
      //Defaults to the project's folder name if the input is skipped
      default: this.appname,
      validate: (input) => {
        if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
        else return 'Project name may only include letters, numbers, underscores and hashes.';
      }
     },
     {
      type: 'input',
      name: 'description',
      message: 'What short description would you like for your application? ',
      default: this.appname
    },{
      type: 'input',
      name: 'author',
      message: 'What author should be used in the application description? ',
      default: "XYZ"
    }

    ], function(answers) {
      this.props = answers;
      done();
    }.bind(this));
   },
  //Writing Logic here
  writing: {
    //Copy the configuration files
    config: function() {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'), {
          name: this.props.name,
          description: this.props.description,
          author: this.props.author,
        }
      );
      this.fs.copyTpl(
        this.templatePath('_.env'),
        this.destinationPath('.env')
      );
      this.fs.copy(
        this.templatePath('_.gitignore'),
        this.destinationPath('.gitignore')
      );
    },

    //Copy application files
    app: function() {
      //Server file
      this.fs.copyTpl(
        this.templatePath('_server.js'),
        this.destinationPath('server.js'),
        {
          name: this.props.name
        }
      );
     

      // Config
      this.fs.copy(
        this.templatePath('_config/_engine.js'),
        this.destinationPath('config/engine.js'));

      // API
      this.fs.copyTpl(
        this.templatePath('_src/_api/_hello-world/_package.json'),
        this.destinationPath('src/api/hello-world/package.json')
      );
      this.fs.copyTpl(
        this.templatePath('_src/_api/_hello-world/_hello-world.js'),
        this.destinationPath('src/api/hello-world/hello-world.js')
      );
      this.fs.copyTpl(
        this.templatePath('_src/_api/_hello-world/_hello-world-handlers.js'),
        this.destinationPath('src/api/hello-world/hello-world-handlers.js')
      );
    }
  },
  install: function() {
    this.installDependencies();
  }
});
