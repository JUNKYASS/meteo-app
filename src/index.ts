import { registerServiceWorker } from './utils';
import * as jsonData from './data/precipitation.json';

const addHandler = () => {
  console.log('Row has been added (by manual callback!)');
};

window.addEventListener('load', () => {
  registerServiceWorker();

  // const db = new DBServices();
  // db.add('temperature', 'readwrite', data, addHandler);

  const data = [
    {
      date: '2019-12-04',
      t: '25',
    },
    {
      date: '2019-12-06',
      t: '22',
    },
    {
      date: '2019-12-05',
      t: '19',
    }
  ];


  const DBConnect = indexedDB.open('meteo', 2);

  DBConnect.addEventListener('upgradeneeded', () => {
    const db = DBConnect.result;

    if (!db.objectStoreNames.contains('temperature')) {
      const temperatureStore = db.createObjectStore('temperature', { keyPath: 'id', autoIncrement: true }); // Create storage for temperature
      const index = temperatureStore.createIndex('date_index', 'date'); // Create index for the date field
    }

    if (!db.objectStoreNames.contains('precipitation')) {
      const precipitationStore = db.createObjectStore('precipitation', { keyPath: 'id', autoIncrement: true }); // Create storage for precipitation
      const index = precipitationStore.createIndex('date_index', 'date'); // Create index for the date field
    }
  });

  DBConnect.addEventListener('error', () => {
    console.error('Error:', DBConnect.error);
  });

  DBConnect.addEventListener('success', () => {
    console.log('DB is ready...');

    const newDb = DBConnect.result;

    // add('temperature', 'readwrite', data, addHandler, DBConnect.result);
    const transaction = newDb.transaction('temperature', 'readwrite');
    const store = transaction.objectStore('temperature');
    let request = store.add(data); // Insert data to DB

    console.log('[DDB]:', request);

    request.addEventListener('success', () => {
      console.log("Row just added: ", request.result);
      // callback(); // Execute given callback
    });

    request.addEventListener('error', () => {
      console.log("Error: ", request.error);
    });
  });

  function add(storeName: string, flag: 'readonly' | 'readwrite' = 'readonly', data: any, callback: () => any, db: any) {
    const transaction = db.transaction(storeName, flag);
    const store = transaction.objectStore(storeName);
    let request = store.add(data); // Insert data to DB

    console.log('[DDB]:', request);

    request.addEventListener('success', () => {
      console.log("Row just added: ", request.result);
      callback(); // Execute given callback
    });

    request.addEventListener('error', () => {
      console.log("Error: ", request.error);
    });
  }

  // const add = (storeName: string, flag: 'readonly' | 'readwrite' = 'readonly', data: any, callback: () => any, db: any) => {
  //   const transaction = db.transaction(storeName, flag);
  //   const store = transaction.objectStore(storeName);
  //   let request = store.add(data); // Insert data to DB

  //   console.log('[DDB]:', request);

  //   request.addEventListener('success', () => {
  //     console.log("Row just added: ", request.result);
  //     callback(); // Execute given callback
  //   });

  //   request.addEventListener('error', () => {
  //     console.log("Error: ", request.error);
  //   });
  // }
});

// interface IDBServices {
//   DBConnect: IDBOpenDBRequest | undefined
//   DBConnectResult: IDBDatabase | undefined
// }

// class DBServices implements IDBServices {
//   DBConnect = undefined;
//   DBConnectResult = undefined;

//   constructor() {
//     this.init();
//   }

  // init() {
  //   this.DBConnect = indexedDB.open('meteoDB', 8);

  //   this.DBConnect.addEventListener('upgradeneeded', () => {
  //     const db = this.DBConnect.result;

  //     if (!db.objectStoreNames.contains('temperature')) {
  //       const temperatureStore = db.createObjectStore('temperature', { keyPath: 'id' }); // Create storage for temperature
  //       const index = temperatureStore.createIndex('date_index', 'date'); // Create index for the date field
  //     }

  //     if (!db.objectStoreNames.contains('precipitation')) {
  //       const precipitationStore = db.createObjectStore('precipitation', { keyPath: 'id' }); // Create storage for precipitation
  //       const index = precipitationStore.createIndex('date_index', 'date'); // Create index for the date field
  //     }
  //   });

  //   this.DBConnect.addEventListener('error', () => {
  //     console.error('Error:', this.DBConnect.error);
  //   });

  //   this.DBConnect.addEventListener('success', () => {
  //     console.log('DB is ready...');

  //     this.add('temperature', 'readwrite', data, addHandler);
  //   });
  // }

//   add(storeName: string, flag: 'readonly' | 'readwrite' = 'readonly', data: any, callback: () => any) {
//     const transaction = this.DBConnect.result.transaction(storeName, flag);
//     const store = transaction.objectStore(storeName);
//     let request = store.add(data); // Insert data to DB

//     console.log('[DDB]:', request);

//     request.addEventListener('success', () => {
//       console.log("Row just added: ", request.result);
//       callback(); // Execute given callback
//     });

//     request.addEventListener('error', () => {
//       console.log("Error: ", request.error);
//     });
//   }
// }