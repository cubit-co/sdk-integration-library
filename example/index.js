//@ts-check
import { AucoSDK } from '../dist/auco-sdk-integration.esm.js';
/** @type {import('../src/types').Config} */
let config = {
  iframeId: 'myIframe',
  sdkType: 'sign',
  language: 'es',
  events: {
    onSDKClose: () => {},
    onSDKReady: () => {},
  },
  sdkData: {
    document:"63225460f6521aaec1e60e33BC",
    uxOptions: {
      primaryColor: "#021c30",
      alternateColor: "rgb(165, 87, 242)"
    },
    signFlow:"package",
  },
  env: 'DEV',
  customOrigin: 'http://localhost:3000',
};
window.onload = function() {
  console.log(AucoSDK);
  const unsus = AucoSDK(config);
  setTimeout(() => unsus(), 5000);
};
