// Configure Babel to transpile the server scripts. The "react" preset is required to enable JSX in Node application.
require('babel-register')({
  presets: [
    ['env', {
      targets: {
        node: '8.11'
      }
    }],
    'react'
  ]
});
require('./render-server');
