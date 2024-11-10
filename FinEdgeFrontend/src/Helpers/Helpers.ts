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

export function getMethodologyString(methodologyType: number): string {
  return MethodologyType[methodologyType];
}