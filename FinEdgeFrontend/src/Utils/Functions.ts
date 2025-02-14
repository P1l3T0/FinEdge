import { AccountType, MethodologyType, NotificationType } from "./Types";

export const accountType: string[] = ["Regular", "Savings", "Debt", "Retirement"];
export const currency: string[] = ["BGN", "USD", "EUR"];

export function getEnumValueFromNumber(numberType: number, enumType: typeof MethodologyType | typeof AccountType | typeof NotificationType): string {
  return enumType[numberType];
}

export const isValidEmail = (email: string, emailRegEx: RegExp): boolean => {
  return emailRegEx.test(email);
};

export const isValidPassword = (password: string, passwordRegEx: RegExp): boolean => {
  return passwordRegEx.test(password);
};
