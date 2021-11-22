const path = require('path');
const { app } = require('electron');

module.exports = ({ env }) => {
  return {
    defaultConnection: 'default',
    connections: {
      default: {
        connector: 'bookshelf',
        settings: {
          client: 'sqlite',
          filename: path.join(
            app.getPath('home'),
            app.getName(),
            'database',
            'data.db'
          ),
        },
        options: {
          useNullAsDefault: true,
        },
      },
    },
  };
};
