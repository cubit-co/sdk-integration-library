//@ts-check
import { AucoSDK } from '../dist/auco-sdk-integration.esm.js';
/** @type {import('../src/types').Config} */
let config = {
  iframeId: 'myIframe',
  sdkType: 'validation',
  keyPublic: '',
  language: 'es',
  events: {
    onSDKClose: documentId => {
      console.log('Este es el documento', documentId);
    },
    onSDKReady: () => {},
  },
  env: 'DEV',
};
window.onload = function() {
  console.log(AucoSDK);
  const unsus = AucoSDK(config);
  // setTimeout(() => unsus(), 5000);
};
