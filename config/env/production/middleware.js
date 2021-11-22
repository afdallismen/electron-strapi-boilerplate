const path = require('path');
const { app } = require('electron');

module.exports = {
  settings: {
    public: {
      path: path.join(app.getPath('home'), app.getName(), 'public'),
    },
  },
};
