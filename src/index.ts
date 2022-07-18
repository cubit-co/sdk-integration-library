import { TAucoSDK, Config, SDKTypeObjectKeys, SDKs } from './types';

export const AucoSDK: TAucoSDK = params => {
  parametersValidation(params);
  const messageFunc = setupEvents(params);
  const unsuscribe = () => {
    window.removeEventListener('message', messageFunc);
  };
  return unsuscribe;
};

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
  const origin = params.customOrigin
    ? params.customOrigin
    : getSDKURL[params.sdkType];
  const iframe = document.getElementById(iframeId) as HTMLIFrameElement;
  if (!iframe) {
    throw new Error(
      `Could not start SDK, Iframe with id: ${iframeId} not found`
    );
  }
  async function onMessage(event: MessageEvent) {
    if (event.origin !== origin) return;
    if (event.data.ready) {
      iframe!.contentWindow?.postMessage(
        { language, ...sdkData, ...getExtraConstants(params.sdkType) },
        origin
      );
      await events.onSDKReady();
      return;
    }
    if (event.data.type.includes('token')) {
      if (!events.onSDKToken) {
        throw new Error(
          "Could not get token, SDK is asking for user token, but there isn't a onSDKToken function provided"
        );
      }
      const token = await events.onSDKToken();
      iframe!.contentWindow?.postMessage({ type: 'token', token }, origin);
    }
    if (event.data.type === 'SDK-CLOSE') {
      await events.onSDKClose();
      window.removeEventListener('message', onMessage);
    }
  }
  window.addEventListener('message', onMessage);
  iframe.src = origin;
  return onMessage;
};
const getSDKURL: SDKTypeObjectKeys = {
  upload: 'https://upload.auco.ai',
  sign: 'https://sign.auco.ai',
  attachments: 'https://upload.auco.ai',
  validation: '',
};
const getExtraConstants = (type: SDKs) => {
  let extraConstants = new Map();
  if (type == 'upload' || type == 'attachments') {
    extraConstants.set(
      'flowType',
      type == 'upload' ? 'upload-document' : 'add-documents'
    );
  }
  return Object.fromEntries(extraConstants);
};
