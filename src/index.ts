import { registerServiceWorker } from './utils';
import * as jsonData from './data/precipitation.json';

window.addEventListener('load', () => {
  registerServiceWorker();

  console.log(jsonData);
});