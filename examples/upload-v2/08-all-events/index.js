//@ts-check
import { AucoSDK } from '../../../dist/auco-sdk-integration.esm.js';

/** @type {import('../../../src/types').Config} */
const config = {
  iframeId: 'myIframe',
  sdkType: 'upload-v2',
  language: 'es',
  env: 'DEV',
  events: {
    // Fired when the SDK iframe is loaded and ready to interact
    onSDKReady: () => {
      console.log('[onSDKReady] SDK is loaded and ready');
    },

    // Fired when the SDK flow is completed or closed
    onSDKClose: (documentId, redirectTo) => {
      console.log('[onSDKClose] Document ID:', documentId);
      console.log('[onSDKClose] Redirect to:', redirectTo);
    },

    // Fired when the SDK needs an authentication token
    onSDKToken: () => {
      console.log('[onSDKToken] SDK is requesting a token');
      return new Promise(resolve => resolve('YOUR_AUTH_TOKEN_HERE'));
    },

    // Fired when the user clicks the back button inside the SDK
    onSDKBack: () => {
      console.log('[onSDKBack] User clicked back');
      window.location.reload();
    },

    // Fired when the SDK flow is fully finished (after onSDKClose)
    onSDKFinish: () => {
      console.log('[onSDKFinish] SDK flow is fully finished');
    },

    // Fired when the SDK emits a notification to display to the user
    onSDKNotification: ({ message, options }) => {
      console.log('[onSDKNotification] Message:', message);
      console.log('[onSDKNotification] Options:', options);
    },

    // Fired when the SDK requires a payment action
    onSDKPay: ({ code, epaycoKey, validation, packageId }) => {
      console.log('[onSDKPay] Code:', code);
      console.log('[onSDKPay] ePayco Key:', epaycoKey);
      console.log('[onSDKPay] Validation:', validation);
      console.log('[onSDKPay] Package ID:', packageId);
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
