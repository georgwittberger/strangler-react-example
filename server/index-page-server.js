// Configure Babel to transpile the server scripts.
require('babel-register')({
  presets: [
    ['env', {
      targets: {
        node: '8.11'
      }
    }]
  ]
});
require('./page-server');
