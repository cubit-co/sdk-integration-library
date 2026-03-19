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
    userAttributes: {
      email: 'user@example.com',
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
