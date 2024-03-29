import { TAucoSDK, Config, SDKTypeObjectKeys, SDKs } from './types';
function uuid() {
  const d = new Date();
  const s = d.toISOString().replaceAll(':', '-');
  return s;
}
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
  const {
    iframeId,
    events,
    language,
    sdkData,
    keyPublic = undefined,
    customOrigin,
    sdkType,
    env,
  } = params;
  const origin = customOrigin
    ? customOrigin
    : env == 'DEV'
    ? getDevSDKURL[sdkType]
    : getSDKURL[sdkType];
  const iframe = document.getElementById(iframeId) as HTMLIFrameElement;

  if (!iframe) {
    throw new Error(
      `Could not start SDK, Iframe with id: ${iframeId} not found`
    );
  }

  if (keyPublic && keyPublic.length != 36 && !events.onSDKToken) {
    throw new Error('Could not start SDK, onSDKToken is missing');
  }

  if (keyPublic && keyPublic.length != 36) {
    throw new Error('Could not start SDK, invalid keyPublic');
  }

  async function onMessage(event: MessageEvent) {
    if (event.origin !== origin) return;
    env == 'DEV' && console.log('Eventos del iframe', event);
    if (event.data.ready) {
      iframe!.contentWindow?.postMessage(
        {
          language,
          ...sdkData,
          keyPublic,
          sdkParentURL: window.location.href,
          ...getExtraConstants(sdkType),
        },
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
      params.env == 'DEV' && console.log(token);
      iframe!.contentWindow?.postMessage({ type: 'token', token }, origin);
    }
    if (event.data.type === 'SDK-PAY') {
      if (!events.onSDKPay) {
        throw new Error(
          "SDK is asking for payment, but there isn't a onSDKPay function provided"
        );
      }
      await events.onSDKPay(event.data.data);
    }
    if (event.data.type === 'SDK-CLOSE') {
      await events.onSDKClose(
        event.data?.document ?? event.data?.similarity ?? '',
        event.data?.redirectTo ?? event.data?.status ?? ''
      );
      if ((event.data?.status !== 'PENDING' ))
        window.removeEventListener('message', onMessage);
    }
  }
  window.addEventListener('message', onMessage);
  iframe.src = origin + '?id=' + uuid();
  return onMessage;
};
const getSDKURL: SDKTypeObjectKeys = {
  upload: 'https://upload.auco.ai',
  sign: 'https://sign.auco.ai',
  attachments: 'https://upload.auco.ai',
  'validation-attachments': 'https://upload.auco.ai',
  validation: 'https://veriface.auco.ai',
  'list-validation': '',
};
const getDevSDKURL: SDKTypeObjectKeys = {
  upload: 'https://upload-stage.auco.ai',
  sign: 'https://sign-stage.auco.ai',
  attachments: 'https://upload-stage.auco.ai',
  'validation-attachments': 'https://upload-stage.auco.ai',
  validation: 'https://veriface-stage.auco.ai',
  'list-validation': '',
};

const flowTypesUploadSDK = {
  upload: 'upload',
  attachments: 'attachments',
  'validation-attachments': 'validation-attachments',
};
const getExtraConstants = (type: SDKs) => {
  let extraConstants = new Map();
  if (Object.keys(flowTypesUploadSDK).includes(type)) {
    extraConstants.set('flowType', type);
  }
  return Object.fromEntries(extraConstants);
};
