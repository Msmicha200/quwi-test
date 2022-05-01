const path = require('path');

const auth_module = function (module_options) {
    const options = false ? module_options : this.options.auth;

    const template = this.addTemplate({
        src: path.resolve(__dirname, 'plugin.js'),
        fileName: path.join('auth.js'),
        options: options
    });
    
    this.options.plugins.push(path.resolve(this.options.buildDir,  template.dst));
}

module.exports = auth_module;
