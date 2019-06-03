let { app, BrowserWindow, ipcMain, ipcRenderer, Menu } = require('electron')
let Datastore = require('nedb');
let moment = require('moment');

global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\');

const zones = new Datastore({ filename: './storage/zone.json', autoload: true });
const services = new Datastore({ filename: './storage/service.json', autoload: true });
const clients = new Datastore({ filename: './storage/client.json', autoload: true });

// let newServices = [
//   {
//     "cost": "100",
//     "description": "Contiene 100 canales",
//     "name": "Cable",
//     "zone": "1"
//   },
//   {
//     "cost": "200",
//     "description": "Contiene 100 canales",
//     "name": "Cable",
//     "zone": "2"
//   },
//   {
//     "cost": "150",
//     "description": "Contiene 100 canales",
//     "name": "Cable",
//     "zone": "3"
//   },
//   {
//     "cost": "130",
//     "description": "Contiene 100 canales",
//     "name": "Cable",
//     "zone": "4"
//   },
//   {
//     "cost": "120",
//     "description": "Contiene 100 canales",
//     "name": "Cable",
//     "zone": "5"
//   },
//   {
//     "cost": "300",
//     "description": "Contiene 100 canales",
//     "name": "Cable",
//     "zone": "6"
//   },
//   {
//     "cost": "60",
//     "description": "Agua y alcantarillado",
//     "name": "Agua",
//     "zone": "1"
//   },
//   {
//     "cost": "70",
//     "description": "Agua y alcantarillado",
//     "name": "Agua",
//     "zone": "2"
//   },
//   {
//     "cost": "80",
//     "description": "Agua y alcantarillado",
//     "name": "Agua",
//     "zone": "3"
//   },
//   {
//     "cost": "90",
//     "description": "Agua y alcantarillado",
//     "name": "Agua",
//     "zone": "4"
//   },
//   {
//     "cost": "50",
//     "description": "Agua y alcantarillado",
//     "name": "Agua",
//     "zone": "5"
//   },
//   {
//     "cost": "100",
//     "description": "Agua y alcantarillado",
//     "name": "Agua",
//     "zone": "6"
//   }
// ]

// services.insert(newServices, (err, docs) => {
//   if(err)
//     throw err;
//   console.log(docs);
// })
// services.update({}, { $set: { zone: '1' } }, { multi : true }, (err, nUpdated) => {
//   if(err){
//     throw err;
//   }
// });

// zones.remove({}, { multi: true }, (err, numRemoved) => {
//   if(err){
//     throw err;
//   }
// });

// let newZones = [
//   {cost: 10, description: "Tarifa 1", numRate: 1},
//   {cost: 10, description: "Tarifa 2", numRate: 2},
//   {cost: 10, description: "Tarifa 3", numRate: 3},
//   {cost: 10, description: "Tarifa 4", numRate: 4},
//   {cost: 10, description: "Tarifa 5", numRate: 5},
//   {cost: 10, description: "Tarifa 6", numRate: 6}
// ];

// zones.insert(newZones, (err, nDocs) => {
//   if(err){
//     throw err;
//   }
// });

services.remove({}, { multi: true }, (err, numRemoved) => {
  if(err){
    throw err;
  }
});

let nservices = [
  {cost:300, description:"Contiene 100 canales", name: "Cable", zone: 1},
  {cost:300, description:"Contiene 100 canales", name: "Cable", zone: 2},
  {cost:300, description:"Contiene 100 canales", name: "Cable", zone: 3},
  {cost:300, description:"Contiene 100 canales", name: "Cable", zone: 4},
  {cost:300, description:"Contiene 100 canales", name: "Cable", zone: 5},
  {cost:300, description:"Contiene 100 canales", name: "Cable", zone: 6},
  {cost:60, description:"Servicio de agua", name: "Agua", zone: 1},
  {cost:60, description:"Servicio de agua", name: "Agua", zone: 2},
  {cost:60, description:"Servicio de agua", name: "Agua", zone: 3},
  {cost:60, description:"Servicio de agua", name: "Agua", zone: 4},
  {cost:60, description:"Servicio de agua", name: "Agua", zone: 5},
  {cost:60, description:"Servicio de agua", name: "Agua", zone: 6}
];


services.insert(nservices, (err, nDocs) => {
  if(err){
    throw err;
  }
});

// {"_id":"8HGjgRHd8jUKFh8B","cost":"300","description":"Contiene 100 canales. No varia el precio dependiendo de la zona.","name":"Cable","zone":"Residencial Urbana"}
// {"cost":"450","description":"Contiene 100 canales. No varia el precio dependiendo de la zona.","name":"Cable","zone":"Comercial","_id":"BUU9HqlGi56ctlBa"}
// {"cost":"75","description":"60 Lps Agua + 15 Lps Alcantarillado.","name":"Agua","zone":"Residencial Urbana","_id":"Jz3prEFV6WqiWdP1"}
// {"cost":"500","description":"Contiene 100 canales. No varia el precio dependiendo de la zona.","name":"Cable","zone":"Rural","_id":"QNUQilCIVI77mMSQ"}
// {"cost":"155","description":"140 Lps Agua + 15 Lps Alcantarillado.","name":"Agua","zone":"Comercial","_id":"SzM4u6gGnEyqyLHp"}
// {"cost":"60","description":"60 Lps Agua + 0 Lps Alcantarillado.","name":"Agua","zone":"Rural","_id":"epUvbATamEYHw6TD"}



// rates.insert([{rateNum: 1, description: 'Tarifa 1', price: 0}, 
//               {rateNum: 2, description: 'Tarifa 2', price: 0},
//               {rateNum: 3, description: 'Tarifa 3', price: 0},
//               {rateNum: 4, description: 'Tarifa 4', price: 0},
//               {rateNum: 5, description: 'Tarifa 5', price: 0},
//               {rateNum: 6, description: 'Tarifa 6', price: 0}], 
//               (err, docs) => {
//                 if(err){
//                     throw err;
//                 }
//               });
