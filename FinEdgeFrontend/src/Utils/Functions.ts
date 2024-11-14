import { AccountType, MethodologyType } from "./Types";

export function getEnumValueFromNumber(numberType: number, enumType: typeof MethodologyType | typeof AccountType): string {
  return enumType[numberType];
}