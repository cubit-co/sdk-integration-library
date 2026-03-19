//@ts-check
import { AucoSDK } from '../../../dist/auco-sdk-integration.esm.js';

// Replace DOCUMENT_CODE_HERE with a real document code from a previous upload or API call
const DOCUMENT_CODE = 'DOCUMENT_CODE_HERE';

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
      type: 'edit',
      code: DOCUMENT_CODE,
      keepPositions: true,
      // Optional overrides - uncomment to modify the existing flow:
      // participants: [
      //   {
      //     id: 'signer-1',
      //     type: 'signer',
      //     name: 'Updated Signer',
      //     email: 'updated@example.com',
      //     phone: '+573001234567',
      //     identification: '1234567890',
      //     identificationType: 'CC',
      //     country: 'CO',
      //   },
      // ],
      // platform: 'auco',
      // validations: {
      //   selfie: true,
      //   identification: true,
      //   identificationCardBack: false,
      //   flow: false,
      // },
      // emailData: {
      //   name: 'Auco',
      //   message: 'Updated message',
      //   subject: 'Updated subject',
      // },
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
