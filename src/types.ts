export type Languages = 'es' | 'en';
export type SDKs = 'upload' | 'attachments' | 'validation' | 'sign';
export type EnvType = 'DEV' | 'PROD';
export type SDKTypeObjectKeys = {
  [x in SDKs]: string;
};
export type SDKEvents = {
  onSDKReady: () => void;
  onSDKClose: () => void;
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
}
interface SDKUpload extends Omit<BaseConfig, 'events'> {
  /**
   * Create an upload flow with signers and approvers
   */
  sdkType: 'upload';
  sdkData: SDKUploadData;
  events: Required<SDKEvents>;
}
interface SDKAttachments extends Omit<BaseConfig, 'events'> {
  /**
   * Create an attachment flow with signers. You could not add approvers.
   *  In this flow there is only one approver, that is the person who creates it.
   */
  sdkType: 'attachments';
  sdkData: SDKUploadData;
  events: Required<SDKEvents>;
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
  };
}
interface SDKValidation extends BaseConfig {
  /**
   * Create a validation flow, Your customer validate his face against his
   * ID Photo and you receive a response with the similarity between those two photos
   */
  sdkType: 'validation';
  sdkData: {};
}
export type Config = SDKUpload | SDKAttachments | SDKSign | SDKValidation;
export type TAucoSDK = (params: Config) => () => void;
