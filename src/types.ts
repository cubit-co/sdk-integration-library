export type Languages = 'es' | 'en';
export type SDKs =
  | 'upload'
  | 'attachments'
  | 'validation-attachments'
  | 'validation'
  | 'sign'
  | 'list-validation';
export type EnvType = 'DEV' | 'PROD';
export type SDKTypeObjectKeys = {
  [x in SDKs]: string;
};
export type SDKEvents = {
  onSDKReady: () => void;
  onSDKClose: (documentId?: string, redirectTo?: string) => void;
  onSDKToken?: () => Promise<string>;
  onSDKPay?: ({ docCode, wompi }: { docCode: string; wompi: string }) => void;
};
interface BaseConfig {
  keyPublic?: string;
  country?: string;
  iframeId: string;
  language: Languages;
  events: SDKEvents;
  customOrigin?: string;
  env: EnvType;
}
interface SDKUploadData {
  userAttributes: {
    name: string;
    email: string;
    phone?: string;
    identification?: string;
    identificationType?: string;
  };
  uxOptions: {
    primaryColor: string;
    alternateColor: string;
    redirectUrl?: string;
    hoverColor?: string;
    icons?: {
      gradient: string[];
    };
  };
}
interface SDKUpload extends Omit<BaseConfig, 'events'> {
  /**
   * Create an upload flow with signers and approvers
   */
  sdkType: 'upload';
  sdkData: SDKUploadData;
  events: SDKEvents;
}

interface SDKAttachments extends Omit<BaseConfig, 'events'> {
  /**
   * Create an attachment flow with signers. You could not add approvers.
   *  In this flow there is only one approver, that is the person who creates it.
   */
  sdkType: 'attachments';
  sdkData: SDKUploadData;
  events: SDKEvents;
}
interface SDKValidationAttachments extends Omit<BaseConfig, 'events'> {
  /**
   * Create an attachment flow with validation in restrictive list. You could not add approvers.
   */
  sdkType: 'validation-attachments';
  sdkData: SDKUploadData;
  events: SDKEvents;
}
interface SDKSign extends BaseConfig {
  /**
   * Sign flow, use this flow to let your users sign your documents
   */
  sdkType: 'sign';
  sdkData: {
    /**
     * Document Id , also known as code
     */
    document: string;
    image?: string;
    name?: string;
    uxOptions: {
      primaryColor: string;
      alternateColor: string;
      redirectUrl?: string;
      hoverColor?: string;
      icons?: {
        gradient: string[];
      };
    };
    signFlow?: 'document' | 'approve' | 'package';
  };
}
interface SDKValidation extends Omit<BaseConfig, 'events'> {
  /**
   * Create a validation flow, Your customer validate his face against his
   * ID Photo and you receive a response with the similarity between those two photos
   */
  sdkType: 'validation';
  events: Omit<BaseConfig['events'],"onSDKClose"> & {
    onSDKClose: (similarity?: number, status?: string) => void;
  };
  sdkData:{
    /**
     * code from /validate API response
     */
    document:string
  }
}
interface SDKListValidation extends Omit<BaseConfig, 'events'> {
  sdkType: 'list-validation';
  sdkData: Omit<SDKUploadData, 'userAttributes'> & {
    showPrices: boolean;
  };
  events: Required<SDKEvents>;
}
export type Config =
  | SDKUpload
  | SDKAttachments
  | SDKValidationAttachments
  | SDKSign
  | SDKValidation
  | SDKListValidation;
export type TAucoSDK = (params: Config) => () => void;
