//@ts-check
import { AucoSDK } from '../dist/auco-sdk-integration.esm.js';
/** @type {import('../src/types').Config} */
let config = {
  iframeId: 'myIframe',
  sdkType: 'upload',
  keyPublic:"",
  language: 'es',
  events: {
    onSDKClose: (documentId) => {
      console.log("Este es el documento",documentId)
    },
    onSDKReady: () => {},
    onSDKToken:async()=>""
  },
  sdkData: {
    userAttributes:{
      name:"Test",
      email:"email1@gmail.com"
    },
    uxOptions: {
      primaryColor: "#021c30",
      alternateColor: "rgb(165, 87, 242)"
    },
  },
  env: 'DEV',
};
window.onload = function() {
  console.log(AucoSDK);
  const unsus = AucoSDK(config);
  // setTimeout(() => unsus(), 5000);
};
