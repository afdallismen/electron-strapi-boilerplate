const { app, BrowserWindow } = require('electron');
const Strapi = require('strapi');
const isPackaged = require('electron-is-packaged');

if (isPackaged) {
  const fs = require('fs');
  const path = require('path');

  const appPath = path.join(app.getPath('home'), app.getName());

  const requiredFolderPaths = {
    database: path.join(appPath, 'database'),
    public: path.join(appPath, 'public'),
    uploads: path.join(appPath, 'public', 'uploads'),
  };

  Object.values(requiredFolderPaths).forEach((folderPath) => {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
  });
}

process.env.NODE_ENV = isPackaged ? 'production' : 'development';
process.env.BROWSER = 'none';

const strapi = Strapi({
  dir: `${__dirname}/`,
});

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    maximizable: true,
    title: 'electron-strapi',
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.maximize();

  strapi
    .start()
    .then(() => {
      win.loadURL('http://localhost:1337/admin');
    })
    .catch((err) => {
      console.error(err);
    });

  win.on('closed', () => {
    app.quit();
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
