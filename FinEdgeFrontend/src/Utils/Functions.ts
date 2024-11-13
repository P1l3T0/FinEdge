import { MethodologyType } from "./Types";

export function getMethodologyString(methodologyType: number): string {
  return MethodologyType[methodologyType];
}