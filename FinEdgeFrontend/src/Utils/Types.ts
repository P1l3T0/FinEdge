export type User = {
  name: string;
  surname: string;
  email: string;
  password: string;
  methodologyType: string;
  accounts: Account[];
}

export type RegisterDto = {
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

export type AccountDto = {
  name: string;
  balance: number;
  accountType: string;
  currency: string;
}

export type Account = {
  id: number;
  userID: number;
  name: string;
  balance: number;
  accountType: string;
  currency: string;
  dateCreated: Date;
}

export enum MethodologyType {
  ZeroBasedBudgeting = 0,
  PayYourselfFirst = 1,
  FiftyThirtyTwenty = 2
}

