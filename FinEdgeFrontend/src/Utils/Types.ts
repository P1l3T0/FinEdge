//! Common 

export type LabelContentProps = {
  category: string;
  dataItem: {
    name: string;
    ammount: number;
    color?: string;
  };
  percentage: number;
  series: {
    data: any[];
    visible: boolean;
    labels: Record<string, unknown>;
    overlay: Record<string, unknown>;
    rangeArea: Record<string, unknown>;
    [key: string]: any;
  };
  value: number;
};


//! Auth

export type Auth = {
  username: string;
  accessToken: string;
}

export type AuthContextType = {
  auth: Auth;
  setAuth: React.Dispatch<React.SetStateAction<Auth>>;
}

export type RefreshToken = {
  refreshToken: string;
}

//! User

export type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
  methodologyType: string;
  totalBalance: number;
  accounts: Account[];
  categories: Category[];
  transactions: Transaction[];
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
  password: string;
}

export type UpdateDTO = {
  name: string;
  surname: string;
  email: string;
  password: string;
}

//! Account

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

//! Category

export type CategoryResponse = {
  incomeCategories: Category[];
  expenditureCategories: Category[];
  totalIncomeBalance: number;
  totalIncomeBudget: number;
  totalExpenditureBalance: number;
  totalExpenditureBudget: number;
}

export type CategoryDTO = {
  name: string;
  currency: string;
  budget: number;
  isIncome: boolean;
  color: string;
}

export type Category = {
  id: number;
  userID: number;
  name: string;
  currency: string;
  balance: number;
  budget: number;
  isIncome: boolean;
  color: string;
  dateCreated: Date;
}

export type CategoryInfo = {
  incomeInfo: CategoryInfoDTO[];
  expenditureInfo: CategoryInfoDTO[];
}

export type CategoryInfoDTO = {
  name: string;
  ammount: number;
  color: string;
}

//! Transactions

export type Names = {
  accountNames: string[];
  categoryNames: string[];
}

export type TransactionDTO = {
  name: string;
  accountName: string;
  categoryName: string;
  amount: number;
}

export type Transaction = {
  id: number;
  name: string;
  accountName: string;
  categoryName: string;
  amount: number;
  dateCreated: Date;
}

export type TransactionResponse = {
  allTransactions: Transaction[];
  incomeTransactions: Transaction[];
  expenditureTransactions: Transaction[];
}

export type Reports = {
  dailyIncome: number,
  weeklyIncome: number,
  weeklyAverage: number,
  monthlyIncome: number,
  monthlyAverage: number,
  dailySpendings: number,
  weeklySpendings: number,
  weeklySpendingsAverage: number,
  monthlySpendings: number,
  monthlySpendingsAverage: number,
}

//! Enums

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
