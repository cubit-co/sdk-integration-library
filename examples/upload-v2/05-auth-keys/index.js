//@ts-check
import { AucoSDK } from '../../../dist/auco-sdk-integration.esm.js';

// Both keyPublic and keyPrivate are required for key-based authentication.
// Replace with your actual keys from the Auco dashboard.
const KEY_PUBLIC = 'puk_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
const KEY_PRIVATE = 'prk_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';

/** @type {import('../../../src/types').Config} */
const config = {
  iframeId: 'myIframe',
  sdkType: 'upload-v2',
  language: 'es',
  env: 'DEV',
  keyPublic: KEY_PUBLIC,
  keyPrivate: KEY_PRIVATE,
  // No onSDKToken needed when using key-based auth
  events: {
    onSDKReady: () => {
      console.log('SDK is ready');
    },
    onSDKClose: (documentId, redirectTo) => {
      console.log('Document:', documentId);
      console.log('Redirect to:', redirectTo);
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
