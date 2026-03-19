//@ts-check
import { AucoSDK } from '../../../dist/auco-sdk-integration.esm.js';

/** @type {import('../../../src/types').Config} */
const config = {
  iframeId: 'myIframe',
  sdkType: 'upload-v2',
  language: 'es',
  env: 'DEV',
  events: {
    onSDKReady: () => {
      console.log('SDK is ready');
    },
    onSDKClose: (documentId, redirectTo) => {
      console.log('Document:', documentId);
      console.log('Redirect to:', redirectTo);
    },
    onSDKToken: () => {
      return new Promise(resolve => resolve('YOUR_AUTH_TOKEN_HERE'));
    },
  },
  sdkData: {
    flowData: {
      type: 'participants',
      participants: [
        {
          id: 'signer-1',
          type: 'signer',
          name: 'Signer One',
          email: 'signer1@example.com',
          phone: '+573001234567',
          identification: '1234567890',
          identificationType: 'CC',
          country: 'CO',
        },
        {
          id: 'reader-1',
          type: 'reader',
          name: 'Reader One',
          email: 'reader1@example.com',
        },
      ],
    },
    uxOptions: {
      primaryColor: '#021c30',
      alternateColor: '#a557f2ff',
    },
  },
};

window.onload = function () {
  const unsubscribe = AucoSDK(config);
};
