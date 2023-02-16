import {
  Cart,
  PaymentCheckData,
  PaymentFormFields,
  PaymentInfo,
  Wallet,
  PaymentId,
  Transaction,
  PaymentEmailFormFields,
  PaymentMethod,
  PspSelected,
} from "../../features/payment/models/paymentModel";
import { getConfigOrThrow } from "../config/config";

export enum SessionItems {
  paymentInfo = "paymentInfo",
  noticeInfo = "rptId",
  useremail = "useremail",
  paymentId = "paymentId",
  paymentMethod = "paymentMethod",
  pspSelected = "pspSelected",
  checkData = "checkData",
  wallet = "wallet",
  sessionToken = "sessionToken",
  cart = "cart",
  transaction = "transaction",
  idTransaction = "idTransaction",
}
const isParsable = (item: SessionItems) =>
  !(
    item === SessionItems.sessionToken ||
    item === SessionItems.useremail ||
    item === SessionItems.idTransaction
  );

export const getSessionItem = (item: SessionItems) => {
  try {
    const serializedState = sessionStorage.getItem(item);

    if (!serializedState) {
      return undefined;
    }

    return isParsable(item)
      ? (JSON.parse(serializedState) as
          | PaymentInfo
          | PaymentFormFields
          | PaymentEmailFormFields
          | PaymentId
          | PaymentCheckData
          | Wallet
          | Transaction
          | Cart
          | PspSelected)
      : serializedState;
  } catch (e) {
    return undefined;
  }
};

export function setSessionItem(
  name: SessionItems,
  item:
    | string
    | PaymentInfo
    | PaymentFormFields
    | PaymentEmailFormFields
    | PaymentMethod
    | PaymentId
    | PaymentCheckData
    | Wallet
    | Transaction
    | Cart
    | PspSelected
) {
  sessionStorage.setItem(
    name,
    typeof item === "string" ? item : JSON.stringify(item)
  );
}

export const isStateEmpty = (item: SessionItems) => !getSessionItem(item);

export const clearStorage = () => {
  sessionStorage.clear();
};

export function getReCaptchaKey() {
  return getConfigOrThrow().CHECKOUT_RECAPTCHA_SITE_KEY;
}
