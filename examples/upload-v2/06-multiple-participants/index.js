//@ts-check
import { AucoSDK } from '../../../dist/auco-sdk-integration.esm.js';
import { getFile } from '../shared/helpers.js';

/** @type {import('../../../src/types').Config} */
function getConfig(files) {
  return {
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
        type: 'complete',
        files,
        platform: 'auco',
        validations: {
          selfie: false,
          identification: false,
          identificationCardBack: false,
          flow: false,
        },
        emailData: {
          name: 'Auco',
          message: 'Please review and sign this document',
          subject: 'Document for your review',
        },
        participants: [
          // Signer with OTP and camera validation
          {
            id: 'signer-1',
            type: 'signer',
            name: 'Signer with OTP',
            email: 'signer1@example.com',
            phone: '+573001234567',
            identification: '1234567890',
            identificationType: 'CC',
            country: 'CO',
            otpCode: true,
            camera: true,
            video: false,
          },
          // Signer with WhatsApp and flow options
          {
            id: 'signer-2',
            type: 'signer',
            name: 'Signer with Options',
            email: 'signer2@example.com',
            phone: '+573009876543',
            identification: '0987654321',
            identificationType: 'CC',
            country: 'CO',
            options: {
              whatsapp: true,
              flow: true,
            },
          },
          // Approver (locked, cannot be removed by the user)
          {
            id: 'approver-1',
            type: 'approver',
            name: 'Approver',
            email: 'approver@example.com',
            phone: '+573005551234',
            identification: '1122334455',
            identificationType: 'CC',
            country: 'CO',
            locked: true,
          },
          // Reader (minimal fields)
          {
            id: 'reader-1',
            type: 'reader',
            name: 'Reader',
            email: 'reader@example.com',
          },
        ],
      },
      uxOptions: {
        primaryColor: '#021c30',
        alternateColor: '#a557f2ff',
      },
    },
  };
}

window.onload = async function () {
  const file = await getFile('../shared/files/file.pdf');
  const unsubscribe = AucoSDK(getConfig([file]));
};
