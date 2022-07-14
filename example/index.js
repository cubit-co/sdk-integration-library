import { AucoSDK } from '../dist/auco-sdk-integration.esm.js';

let config = {
  iframeId: 'myIframe',
  sdkType: 'upload',
  language: 'es',
  events: {
    onSDKClose: () => {},
    onSDKReady: () => {},
  },
  sdkData: {
    flowType: 'upload-document',
    userAttributes: {
      email: '',
      firstName: '',
      lastName: '',
    },
  },
};
window.onload = function() {
  console.log(AucoSDK);
  AucoSDK(config);
};
