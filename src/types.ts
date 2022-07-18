export type Languages = 'es' | 'en';
export type SDKs = 'upload' | 'attachments' | 'validation' | 'sign';
export type SDKTypeObjectKeys = {
  [x in SDKs]: string;
};
export type SDKEvents = {
  onSDKReady: () => void;
  onSDKClose: () => void;
  onSDKToken?: () => string;
};
interface BaseConfig {
  keyPublic?: string;
  country?: string;
  iframeId: string;
  language: Languages;
  events: SDKEvents;
  customOrigin?: string;
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
interface SDKUpload extends BaseConfig {
  /**
   * Create an upload flow with signers and approvers
   */
  sdkType: 'upload';
  sdkData: SDKUploadData;
}
interface SDKAttachments extends BaseConfig {
  /**
   * Create an attachment flow with signers. You could not add approvers.
   *  In this flow there is only one approver, that is the person who creates it.
   */
  sdkType: 'attachments';
  sdkData: SDKUploadData;
}
interface SDKSign extends BaseConfig {
  /**
   * Sign flow, use this flow to let your users sign your documents
   */
  sdkType: 'sign';
  sdkData: {
    image: string;
    name: string;
    uxOptions: {
      primaryColor: string;
      redirectUrl: string;
    };
    document: string;
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
export type TAucoSDK = (params: Config) => void;
