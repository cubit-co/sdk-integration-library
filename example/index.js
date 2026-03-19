//@ts-check
import { AucoSDK } from '../dist/auco-sdk-integration.esm.js';

async function getFile(path) {
  const res = await fetch(path);
  const blob = await res.blob();
  let metadata = {
    type: 'application/pdf',
  };
  const file = new File([blob], 'file.pdf', metadata);
  return file;
}

function getConfig(files) {
  /** @type {import('../src/types').Config} */
  const config = {
    iframeId: 'myIframe',
    sdkType: 'upload-v2',
    // keyPublic: 'puk_e1cd6a01ecdb4b4ea72ec118e33b18de',
    // keyPrivate: 'prk_e1cd6a01ecdb4b4ea72ec118e33b18de',
    language: 'es',
    customOrigin: 'http://localhost:4200',
    events: {
      onSDKClose: (documentId, redirect, signProfile) => {
        console.log('Este es el documento', documentId);
        console.log('Participantes del documento', signProfile);
      },
      onSDKReady: () => {},
      onSDKToken: () => {
        return new Promise(resolve => resolve('eyJraWQiOiJNTVJTendhRG5FNGxhdStldjNBdlwvNkxZc0Fvcnd0RlRuS1VEdlA4RHJ2MD0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJkMmYxMjM2My0xNjZjLTRkZjktYWUxZi1kY2EwYzNkZTIyYTEiLCJjdXN0b206cHJvZmlsZSI6ImFkbWluIiwiY3VzdG9tOmlvdFBvbGljeSI6IjEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicHJvZmlsZSI6ImFkbWluIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfVFJhaExQVTlIIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzp1c2VybmFtZSI6ImQyZjEyMzYzLTE2NmMtNGRmOS1hZTFmLWRjYTBjM2RlMjJhMSIsImN1c3RvbTpjb21wYW55IjoiNjFiYTA3Mzk3MGRmNTIzZDlkMjMyYTI3IiwiYXVkIjoiNnZzODRobjk3N21yMTNwdTY0aGdiZGdhcmciLCJpZGVudGl0aWVzIjpbeyJ1c2VySWQiOiIxMDQ0OTE5MDI4NzU3MjA3NjExNDkiLCJwcm92aWRlck5hbWUiOiJHb29nbGUiLCJwcm92aWRlclR5cGUiOiJHb29nbGUiLCJpc3N1ZXIiOm51bGwsInByaW1hcnkiOiJmYWxzZSIsImRhdGVDcmVhdGVkIjoiMTc0ODU0NzQxMDc2NiJ9XSwiZXZlbnRfaWQiOiIzOWFhYmFmNi1kMzNlLTRkMmMtYjA1My1lYmU1MTg0ODFlOWQiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTc3MjEzNDUzOCwibmFtZSI6IkV2ZWx5biBWYXNxdWV6IiwicGhvbmVfbnVtYmVyIjoiKzU3MzE3MzY1NDUxMyIsImV4cCI6MTc3MzE4MjYxNywiaWF0IjoxNzczMTc5MDE3LCJlbWFpbCI6ImV2ZWx5bkBhdWNvLmFpIn0.GV2DFK9xoREfok6BqU_dpl9GcxD29LA5EffMPpGEncxwwS3H_ewtLmx87POSfnxBESPbWVZo6CQexuw2CEylVCrMDLhCCWb-S9GAEhb6aiikgBG0EZCo2L-_Dslf4Q99-P2PWM7U3Ryx679PsramlgI5qtV5GGwkLF_LocsobftDtjZDgAF9n65Q7FUvTcMTtJ9ryBsstFk_HB-KvyEr6voVWojaPHaFxLZz8Pj7db2EM_dkDAeYh02C-3Qla170Pz-ByAHQ7MYVLePaSatN7Td6k72jRIUMAaYJEuSVuU6nmozTnPCFHoxooO8xK2aYFxNyx0CPwMvM5DS2E5MXSA'));
      },
      onSDKBack: () => {
        window.location.reload();
      },
    },
    env: 'DEV',
    sdkData: {
      userAttributes: {
        email: 'email@auco.ai',
      },
      // flowData: {
      //   type: 'complete',
      //   files,
      //   emailData: {
      //     message: '',
      //     name: '',
      //     subject: '',
      //   },
      //   platform: 'auco',
      //   validations: {
      //     flow: false,
      //     identification: false,
      //     identificationCardBack: false,
      //     selfie: false,
      //   },
      //   participants: [
      //     {
      //       id: 'id1',
      //       type: 'signer',
      //       country: 'CO',
      //       email: 'firmante1@auco.ai',
      //       identification: '123',
      //       identificationType: 'CC',
      //       name: 'Firmante 1',
      //       phone: '+573161979572',
      //     },
      //     {
      //       id: 'id2',
      //       type: 'signer',
      //       country: 'CO',
      //       email: 'firmante2@auco.ai',
      //       identification: '1234',
      //       identificationType: 'CC',
      //       name: 'Firmante 2',
      //       phone: '+573161979572',
      //     },
      //     {
      //       id: 'id3',
      //       type: 'reader',
      //       email: 'lector@auco.ai',
      //       name: 'Lector',
      //       locked: true,
      //     },
      //   ],
      // },
      uxOptions: {
        primaryColor: '#021c30',
        alternateColor: '#a557f2ff',
      },
    },
  };
  return config;
}
window.onload = async function() {
  const file1 = await getFile('./files/file.pdf');
  const unsus = AucoSDK(getConfig([file1]));
  // setTimeout(() => unsus(), 5000);
};
