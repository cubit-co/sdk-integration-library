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
    onSDKToken: async () => '',
  },
  sdkData: {
    document: '123143',
    uxOptions: {
      primaryColor: '#021c30',
      alternateColor: 'rgb(165, 87, 242)',
    },
  },
  env: 'DEV',
  customOrigin: 'http://localhost:3000',
};
window.onload = function() {
  console.log(AucoSDK);
  const unsus = AucoSDK(config);
  // setTimeout(() => unsus(), 5000);
};
