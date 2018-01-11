import { app, BrowserWindow, ipcMain, ipcRenderer } from 'electron'
import Datastore from 'nedb';
import moment from 'moment';

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

//Tablas
const clients = new Datastore({ filename: './storage/client.json', autoload: true });
const bills = new Datastore({ filename: './storage/bill.json', autoload: true });
const services = new Datastore({ filename: './storage/service.json', autoload: true });
const zones = new Datastore({ filename: './storage/zone.json', autoload: true });

// ****************CLIENTS****************

ipcMain.on('create-client', (event, client)=> {
  clients.insert(client, (err, doc) => {
      console.log('Inserted', doc.name, 'with ID', doc._id);
  });
});

ipcMain.on('get-clients', (event) => {
  clients.find({}, (err, docs) => {
    event.sender.send('return-clients', docs);
  });
});
// ****************BILLS****************

ipcMain.on('get-bills', (event) => {
  bills.find({}, (err, docs) => {
    event.sender.send('return-bills', docs);
  });
});

ipcMain.on('get-bills-date', (event,date) => {
  bills.find({'date':date}, (err, docs) => {
    event.sender.send('return-bills-date', docs);
  });
});

ipcMain.on('create-bill', (event, bill) => {
  bills.insert(bill, (err, doc) => {
    console.log('Inserted with id', doc._id);
  });
});

// ****************ZONES****************

ipcMain.on('create-zone', (event, zone) => {
  zones.insert(zone, (err, doc) => {
    console.log('Inserted with id', doc._id);
  });
});


/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
