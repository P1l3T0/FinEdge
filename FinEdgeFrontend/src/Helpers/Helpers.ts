export type User = {
  name: string;
  surname: string;
  email: string;
  password: string;
  methodologyType: string;
}

export type LoginDto = {
  email: string;
  password: string
}

enum MethodologyType {
  ZeroBasedBudgeting = 0,
  PayYourselfFirst = 1,
  FiftyThirtyTwenty = 2
}

export const emailRegEx = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');
export const passwordRegEx = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{10,}$');

export function getMethodologyString(methodologyType: number): string {
  return MethodologyType[methodologyType];
}