import { app, BrowserWindow, ipcMain, ipcRenderer, Menu } from 'electron'
import Datastore from 'nedb';
import moment from 'moment';

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
//if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\');
  const template = [
    {
      label: 'Edit',
      submenu: [
        {role: 'minimize'},
        {role: 'close'}
      ]
    },
    {
      label: 'View',
      submenu: [
        {role: 'reload'},
        {role: 'forcereload'},
        {role: 'togglefullscreen'}
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
//}


let mainWindow;
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
    width: 1000,
    webPreferences: {
      devTools: process.env.NODE_ENV !== 'development'? false : true
    }
  });

  mainWindow.maximize();
  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow);

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
  clients.find({}).sort({ firstname:1 }).exec( (err, docs) => {
    event.sender.send('fetch-clients', docs);
  });
});

ipcMain.on('get-clientsSync', (event) => {
  clients.find({}).sort({ firstname:1 }).exec( (err, docs) => {
    event.returnValue = docs;
  });
});


ipcMain.on('paginar', (event) => {
    clients.find({}).skip(3).limit(3).exec((err, docs) => {
      console.log(docs);
    });
});

ipcMain.on('update-client', (event, client) => {
  clients.update({ _id : client._id},client, (err, numAffected) => {
    if(!err) {
      console.log('Client updated succesfuly!');
    }else{
      console.log('Error updating client', err);
      // console.log('numAffected: ', numAffected);
    }
  });
});


//Actualizar formato de clientes, usado para actualizar clientes viejos para que tengan fecha
ipcMain.on('add-dates-clients', (event) =>{
  let joinDay = moment().format("DD");
  let joinMonth = moment().format("MM");
  let joinYear = moment().format("YYYY");

  clients.update({}, {$set: { joinDay, joinMonth, joinYear }}, {multi: true}, (err, numReplaced) => {
    if(err){
      console.log('Error adding dates to clients: ', err);
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

ipcMain.on('get-billsSync', (event,month,year) => {
  bills.find({}, (err, docs) => {
    event.returnValue = docs;
  });
});

ipcMain.on('get-bills-monthSync', (event,month,year) => {
  bills.find({'dateMonth':month,'dateYear': year}, (err, docs) => {
    event.returnValue = docs;
  });
});

ipcMain.on('get-bills-water-clientSync', (event, client_id) => {
  bills.find({ client_id, service: 'agua' }, (err, docs) => {
    event.returnValue = docs;
  });
});

ipcMain.on('get-bills-cable-clientSync', (event, client_id) => {
  bills.find({ client_id, service: 'cable' }, (err, docs) => {
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

ipcMain.on('create-promotion-bills', (event, newBills) => {
  console.log(newBills);
  bills.insert(newBills, (err, docs) => {
    if(err){
      throw err;
    }
  });
});

// ****************ZONES****************

ipcMain.on('create-zone', (event, zone) => {
  zones.insert(zone, (err, doc) => {
    console.log('Inserted with id', doc._id);
  });
});

ipcMain.on('get-zones', (event)=>{
  zones.find({}).sort({ numRate: 1 }).exec((err,docs)=>{
    if(err){
      throw err;
    }
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

ipcMain.on('get-zone', (event, numRate) => {
  zones.findOne({numRate}, (err, doc) => {
    if(err){
      throw err;
    }
    event.sender.send('return-zone', doc);
  });
});

ipcMain.on('get-zoneSync', (event, numRate) => {
  zones.findOne({numRate}, (err, doc) => {
    event.returnValue = doc;
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
