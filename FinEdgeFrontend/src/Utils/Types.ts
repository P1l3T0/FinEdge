//! Enums

export enum MethodologyType {
  ZeroBasedBudgeting = 0,
  PayYourselfFirst = 1,
  FiftyThirtyTwenty = 2
}

export enum AccountType {
  Regular = 0,
  Savings = 1,
  Debt = 2,
  Retirement = 3
}

export enum NotificationType {
  None = 0,
  Success = 1,
  Error = 2,
  Warning = 3,
  Info = 4
}

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
  dateCreated: string;
  accounts: Account[];
  categories: Category[];
  transactions: Transaction[];
  notifications: AppNotification[];
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
  color: string;
}

export type Account = {
  id: number;
  userID: number;
  name: string;
  balance: number;
  accountType: string;
  currency: string;
  color: string;
  dateCreated: Date;
}

export type AccountSummary = {
  type: string;
  count: number;
  titles: string[];
  balance: number;
  currency: string;
};

export type AccountChartData = {
  category: string;
  value: number;
  color: string;
};

export type AccountTypeStats = {
  type: string;
  totalBalance: number;
  averageBalance: number;
  accountCount: number;
};

export type HighestBalanceAccount = {
  name: string;
  type: string;
  balance: number;
  currency: string;
};

export type AccountStats = {
  totalBalance: number;
  totalAccounts: number;
  averageBalance: number;
  primaryCurrency: string;
  accountTypeStats: AccountTypeStats[];
  highestBalanceAccount: HighestBalanceAccount;
};

//! Category

export type CategoryResponse = {
  categories: Category[];
  balance: number;
  budget: number;
  averageBalance: number;
  averageBudget: number;
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

export type CategoryChartData = {
  name: string;
  balance: number;
  budget: number;
  isIncome: boolean;
  color: string;
  currency: string;
};

// Category Sankey Chart

export type SankeyChartNode = {
  id: string;
  label: string;
}

export type SankeyChartLink = {
  sourceId: string;
  targetId: string;
  value: number;
}

export type SankeyChartDTO = {
  nodes: SankeyChartNode[];
  links: SankeyChartLink[];
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
  isRepeating: boolean;
}

export type Transaction = {
  id: number;
  name: string;
  accountName: string;
  categoryName: string;
  amount: number;
  dateCreated: Date;
  isRepeating: boolean;
}

export type TransactionResponse = {
  allTransactions: Transaction[];
  incomeTransactions: Transaction[];
  expenditureTransactions: Transaction[];
}

export type Reports = {
  dailyIncome: number,
  weeklyIncome: number,
  weeklyIncomeAverage: number,
  monthlyIncome: number,
  monthlyIncomeAverage: number,
  dailySpendings: number,
  weeklySpendings: number,
  weeklySpendingsAverage: number,
  monthlySpendings: number,
  monthlySpendingsAverage: number,
}

//! AIPrompt 

type PromptOutput = {
  id: number;
  title: string;
  responseContent: string;
  userID: number;
  dateCreated: Date;
}

//! Financial Recommendations

export type FinancialRecommendation = PromptOutput;

export type PromptRequestData = {
  prompt: string;
  dateString: string;
}

// Notifications

export type AppNotification = {
  id: number;
  userID: number;
  notificationType: string;
  title: string;
  description: string;
  isRead: boolean;
  dateCreated: string;
}