import { registerServicerWorker } from './utils';

window.addEventListener('load', () => {
  registerServicerWorker();
  const db = new DBServices();
});



class DBServices {
  constructor() {
    this.init();
  }

  init() {
    const DBConnect = indexedDB.open('meteoDB', 3);

    DBConnect.addEventListener('upgradeneeded', () => {
      const db = DBConnect.result;

      if (!db.objectStoreNames.contains('temperature')) {
        db.createObjectStore('temperature', { keyPath: 'id' });
      }
    });

    DBConnect.addEventListener('error', (e) => {
      console.error('Error:', DBConnect.error);
    });

    DBConnect.addEventListener('success', (e) => {

    });
  }
}