//@ts-check
import { AucoSDK } from '../../../dist/auco-sdk-integration.esm.js';
import { getFile } from '../shared/helpers.js';

function getConfig(files) {
  /** @type {import('../../../src/types').Config} */
  const config = {
    customOrigin: 'http://localhost:4200',
    iframeId: 'myIframe',
    sdkType: 'upload-v2',
    language: 'es',
    keyPrivate: 'prk_e1cd6a01ecdb4b4ea72ec118e33b18de',
    keyPublic: 'puk_e1cd6a01ecdb4b4ea72ec118e33b18de',
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
        email: 'evelyn@auco.ai',
      },
      flowData: {
        type: 'complete',
        files,
        platform: 'auco',
        validations: {
          otpCode: 'email',
          selfie: true,
          identification: true,
          identificationCardBack: false,
          flow: false,
        },
        emailData: {
          name: 'Auco',
          message: 'Please sign this document',
          subject: 'Document signing request',
        },
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
            id: 'signer-2',
            type: 'signer',
            name: 'Signer Two',
            email: 'signer2@example.com',
            phone: '+573009876543',
            identification: '0987654321',
            identificationType: 'CC',
            country: 'CO',
          },
        ],
      },
      uxOptions: {
        primaryColor: '#021c30',
        alternateColor: '#a557f2ff',
      },
    },
  };
  return config;
}

window.onload = async function() {
  const file = await getFile('../shared/files/file.pdf');
  const unsubscribe = AucoSDK(getConfig([file]));
};
