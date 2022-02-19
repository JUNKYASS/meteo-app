const isServiceWorkerSupported: () => boolean = () => ('serviceWorker' in navigator);

export const registerServicerWorker = (): void => {
  let nav: any = navigator;

  if (isServiceWorkerSupported()) {
    nav.serviceWorker.register('/service-worker.js').then(function () {
      console.log("Service Worker Registered");
    });
  }
};