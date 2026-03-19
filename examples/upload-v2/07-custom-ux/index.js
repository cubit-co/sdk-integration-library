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
      // Main brand color used for buttons, headers, and primary UI elements
      primaryColor: '#1a73e8',
      // Secondary color used for accents and highlights
      alternateColor: '#34a853',
      // Color applied on hover states for interactive elements
      hoverColor: '#1557b0',
      // Gradient colors for icons
      icons: {
        gradient: ['#1a73e8', '#34a853'],
      },
    },
  },
};

window.onload = function () {
  const unsubscribe = AucoSDK(config);
};
