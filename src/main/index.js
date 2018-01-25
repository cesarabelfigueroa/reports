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
      console.log('Inserted', doc.firstname, 'with ID', doc._id);
  });
});

ipcMain.on('remove-client', (event, _id) => {
  clients.remove({ _id }, {}, (err, numRemoved)=> {
    event.sender.send('remove-client-ret', err);
  });
});

ipcMain.on('get-clients', (event) => {
  clients.find({}, (err, docs) => {
    event.sender.send('fetch-clients', docs);
  });
});

ipcMain.on('get-clientsSync', (event) => {
  clients.find({}, (err, docs) => {
    event.returnValue = docs;
  });
});

ipcMain.on('update-client', (event, client) => {
  clients.update({ _id : client._id},client, (err, numAffected) => {
    if(!err) {
      console.log('Client updated succesfuly!');
    }else{
      console.log('Error updating client', err);
      console.log('numAffected: ', numAffected);
    }
  });
});
// ****************BILLS****************

ipcMain.on('get-bills', (event) => {
  bills.find({}, (err, docs) => {
    event.sender.send('return-bills', docs);
  });
});

ipcMain.on('get-bills-date', (event,date,month,year) => {
  bills.find({'dateDay':date,'dateMonth':month,'dateYear': year}, (err, docs) => {
    event.sender.send('return-bills-date', docs);
  });
});

ipcMain.on('get-bills-month', (event,month,year) => {
  bills.find({'dateMonth':month,'dateYear': year}, (err, docs) => {
    event.sender.send('return-bills-month', docs);
  });
});

ipcMain.on('get-bills-monthSync', (event,month,year) => {
  bills.find({'dateMonth':month,'dateYear': year}, (err, docs) => {
    event.returnValue = docs;
  });
});

ipcMain.on('get-bills-year', (event,year) => {
  bills.find({'dateYear': year}, (err, docs) => {
    event.sender.send('return-bills-year', docs);
  });
});


ipcMain.on('get-bills-yearSync', (event, year) => {
  bills.find({'dateYear': year}, (err, docs) => {
    event.returnValue = docs;
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

ipcMain.on('get-zones', (event)=>{
  zones.find({},(err,docs)=>{
     event.sender.send('return-zones',docs);
  });
});

ipcMain.on('update-zone', (event, zone) => {
  zones.update({ _id : zone._id},zone, (err, numAffected) => {
    if(!err) {
      console.log('Zone updated succesfuly!');
    }else{
      console.log('Error updating zone', err);
      console.log('numAffected: ', numAffected);
    }
  });
});

ipcMain.on('delete-zone', (event, _id) => {
    zones.remove({ _id }, (err, numRemoved) => {
      if(!err && numRemoved===1){
        console.log('Zona removida con exito!');

      }else{
        console.log('Error borrando zona', err);
      }
      ipcMain.send('delete-zone-ret', err);
    });
});

// ****************SERVICES****************

ipcMain.on('get-services', (event)=>{
    services.find({},(err, docs)=>{
      event.sender.send('return-services',docs);
    });
});

ipcMain.on('get-services-cost', (event,service,zone) => {
  services.findOne({'name':service,'zone': zone}, (err, docs) => {
    event.returnValue = docs;
  });
});

ipcMain.on('create-service', (event,service)=>{
    services.insert(service, (err, doc)=>{
      console.log('Inserted with id', doc._id);
    });
});

ipcMain.on('update-service', (event, service) => {
  services.update({ _id : service._id},service, (err, numAffected) => {
    if(!err) {
      console.log('Service updated succesfuly!');
    }else{
      console.log('Error updating service', err);
      console.log('numAffected: ', numAffected);
    }
  });
});

ipcMain.on('delete-service', (event, _id) => {
  services.remove({ _id }, (err, numRemoved) => {
    if(!err && numRemoved===1) {
      console.log('Servicio borrado con exito!');
    }else{
      console.log('Error borrando servicio', err);
    }
    ipcMain.send('delete-service-ret', err);
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
