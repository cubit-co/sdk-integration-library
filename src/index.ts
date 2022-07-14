import { TAucoSDK, Config } from './types';

export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a + b;
};

export const AucoSDK: TAucoSDK = params => {
  parametersValidation(params);
  setupEvents(params);
};

// AucoSDK({
//   iframeId: 'myIframe',
//   keyPublic: '',
//   language: 'es',
//   sdkType: 'upload',
//   events: {
//     onSDKClose: () => {},
//     onSDKReady: () => {},
//   },
//   sdkData: {
//     userAttributes: {
//       email: '',
//       firstName: '',
//       lastName: '',
//     },
//   },
// });
const parametersValidation = (params: Config) => {
  if (!params.iframeId) {
    throw new Error('Could not start SDK, iframeId is missing');
  }
  if (!['es', 'en'].includes(params?.language)) {
    throw new Error(
      "Could not start SDK, language is missing or invalid, available options are 'es' and 'en' "
    );
  }
};
const setupEvents = (params: Config) => {
  const { iframeId, events, language, sdkData } = params;
  const origin = 'https://sdk-upload-doc.vercel.app';
  const iframe = document.getElementById(iframeId) as HTMLIFrameElement;
  if (!iframe) {
    throw new Error(
      `Could not start SDK, Iframe with id: ${iframeId} not found`
    );
  }
  function onMessage(event: MessageEvent) {
    if (event.origin !== origin) return;
    if (event.data.ready) {
      iframe!.contentWindow?.postMessage({ language, ...sdkData }, origin);
      return;
    }
    if (event.data.type.includes('token')) {
      console.log('Recibí evento token del sdk', event);
      if (!events.onSDKToken) {
        throw new Error(
          "Could not get token, SDK is asking for user token, but there isn't a onSDKToken function provided"
        );
      }
      const token = events.onSDKToken();
      iframe!.contentWindow?.postMessage({ type: 'token', token }, origin);
    }
    if (event.data.type === 'SDK-CLOSE') {
      events.onSDKClose();
      window.removeEventListener('message', onMessage);
    }
    if (event.data) {
      console.log('Respuesta final del iframe', event);
    }
  }
  window.addEventListener('message', onMessage);
  iframe.src = origin;
};
