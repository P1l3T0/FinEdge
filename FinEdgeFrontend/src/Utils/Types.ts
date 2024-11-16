export type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
  methodologyType: string;
  totalBalance: number;
  accounts: Account[];
}

export type RegisterDTO = {
  name: string;
  surname: string;
  email: string;
  password: string;
  methodologyType: string;
}

export type LoginDTO = {
  email: string;
  password: string
}

export type UpdateDTO = {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export type AccountDTO = {
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

export enum AccountType {
  Regular = 0,
  Savings = 1,
  Debt = 2
}
