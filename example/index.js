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
    sdkType: 'upload',
    keyPublic: '',
    language: 'es',
    customOrigin: 'http://localhost:4200',
    events: {
      onSDKClose: documentId => {
        console.log('Este es el documento', documentId);
      },
      onSDKReady: () => {},
      onSDKToken: () => {
        return new Promise(resolve =>
          resolve(
            'eyJraWQiOiJNTVJTendhRG5FNGxhdStldjNBdlwvNkxZc0Fvcnd0RlRuS1VEdlA4RHJ2MD0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJkMmYxMjM2My0xNjZjLTRkZjktYWUxZi1kY2EwYzNkZTIyYTEiLCJjdXN0b206cHJvZmlsZSI6ImFkbWluIiwiY3VzdG9tOmlvdFBvbGljeSI6IjEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicHJvZmlsZSI6ImFkbWluIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfVFJhaExQVTlIIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzp1c2VybmFtZSI6ImQyZjEyMzYzLTE2NmMtNGRmOS1hZTFmLWRjYTBjM2RlMjJhMSIsImN1c3RvbTpjb21wYW55IjoiNjFiYTA3Mzk3MGRmNTIzZDlkMjMyYTI3IiwiYXVkIjoiNnZzODRobjk3N21yMTNwdTY0aGdiZGdhcmciLCJpZGVudGl0aWVzIjpbeyJ1c2VySWQiOiIxMDQ0OTE5MDI4NzU3MjA3NjExNDkiLCJwcm92aWRlck5hbWUiOiJHb29nbGUiLCJwcm92aWRlclR5cGUiOiJHb29nbGUiLCJpc3N1ZXIiOm51bGwsInByaW1hcnkiOiJmYWxzZSIsImRhdGVDcmVhdGVkIjoiMTc0ODU0NzQxMDc2NiJ9XSwiZXZlbnRfaWQiOiJjZmZlZTJkYy0xOGFmLTQ2YjUtOTMzMC03Y2I4ZGE4MmJjNWYiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTc1MDc3Mjc3MCwibmFtZSI6IkV2ZWx5biBWYXNxdWV6IiwicGhvbmVfbnVtYmVyIjoiKzU3MzE3MzY1NDUxMyIsImV4cCI6MTc1Mjc3ODcyNiwiaWF0IjoxNzUyNzc1MTI4LCJlbWFpbCI6ImV2ZWx5bkBhdWNvLmFpIn0.bJeIBDYsTdUYpiFwA_Fm0g5LkbnWt1KlwOTz7FFTI8DXTQNIxfIxOFzyjrzIInpfbWn-nzggsfEIFv8Vfgv6nLoIoW1p34mS6t-FpL6iaCvunfgqNjDca4e5UQ_tONZNKNLV8Amj2WfZd9nUdiUb85mRpWgjzt6DWhryk35a3KTiIjQT6NkDntCuDmuLiTRTvBJD1mTC2EbkJKfgeUnZVObq-Tfz2weQKXlhncoIJzYosfa3ChYAerB78zS8PSeXjhkYB9YLefzdML38PEPZz0a6kLFymKMoD1Os8HQCqtHy42ZpSKaSBYtb7fo9PPC6uivP1VcFKeJXPjHrV4t0Cw'
          )
        );
      },
    },
    env: 'DEV',
    sdkData: {
      flowData: {
        type: 'complete',
        files: files,
        emailData: {
          name: 'Prueba precargar flujo',
          message: 'Mensaje',
          subject: 'Sujeto',
          expire: new Date(),
          notificationOff: true,
          remember: '48',
        },
        platform: 'auco',
        validations: {
          flow: false,
          identification: true,
          identificationCardBack: true,
          selfie: true,
        },
        participants: [
          {
            id: 'id1',
            type: 'signer',
            country: 'CO',
            email: 'firmante1@auco.ai',
            identification: '123',
            identificationType: 'CC',
            name: 'Firmante 1',
            phone: '+573161979572',
          },
          {
            id: 'id2',
            type: 'signer',
            country: 'CO',
            email: 'firmante2@auco.ai',
            identification: '1234',
            identificationType: 'CC',
            name: 'Firmante 2',
            phone: '+573161979572',
          },
          {
            id: 'id3',
            type: 'reader',
            email: 'lector@auco.ai',
            name: 'Lector',
            locked: true,
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
  const file1 = await getFile('./files/informe.pdf');
  const file2 = await getFile('./files/planos.pdf');
  const unsus = AucoSDK(getConfig([file2, file1]));
  // setTimeout(() => unsus(), 5000);
};
