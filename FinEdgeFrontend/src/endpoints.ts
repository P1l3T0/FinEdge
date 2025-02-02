const baseURL: string | undefined = process.env.REACT_APP_API_URL;

//! Controllers
const authController: string | undefined = `${baseURL}/authentication`;
const userController: string | undefined = `${baseURL}/user`;
const accountController: string | undefined = `${baseURL}/accounts`;
const categoryController: string | undefined = `${baseURL}/category`;
const transactionController: string | undefined = `${baseURL}/transaction`;
const financialRecommendationsController: string | undefined = `${baseURL}/financialRecommendation`;
const promptSuggestionController: string | undefined = `${baseURL}/promptSuggestions`;
const notificationController: string | undefined = `${baseURL}/notification`;

//! Authentication
export const registerEndPoint = `${authController}/register`;
export const loginEndPoint = `${authController}/login`;
export const logoutEndPoint = `${authController}/logout`;
export const refreshTokenEndPoint = `${authController}/refresh-token`;

//! User
export const getAccountAndCategoryNamesEnddPoint = `${userController}/get/names`;
export const getCurrentUserEnddPoint = `${userController}/get`;
export const updateCurrentUserEnddPoint = `${userController}/update`;
export const deketeCurrentUserEnddPoint = `${userController}/delete`;

//! Accounts
export const createAccountEndPoint = `${accountController}/create`;
export const getAllAccountsEndPoint = `${accountController}/get-all`;
export const getAccountEndPoint = `${accountController}/get`;
export const updateAccountEndPoint = `${accountController}/update`;
export const deleteAccountEndPoint = `${accountController}/delete`;

//! Categories
export const createCategoryEndPoint = `${categoryController}/create`;
export const getAllCategoriesEndPoint = `${categoryController}/get`;
export const getCategoryInfoEndPoint = `${categoryController}/get/info`;
export const updateCategoryEndPoint = `${categoryController}/update`;
export const deleteCategoryEndPoint = `${categoryController}/delete`;
export const gdeleteAllCategoriesEndPoint = `${categoryController}/delete-all`;

//! Transactions
export const createTransactionEndPoint = `${transactionController}/create`;
export const getTransactionEndPoint = `${transactionController}/get`;
export const getTransactionReportsEndPoint = `${transactionController}/get/reports`;
export const updateTransactionEndPoint = `${transactionController}/update`;
export const deleteTransactionEndPoint = `${transactionController}/delete`;

//! Financial Recommendations
export const createFinancialRecommendationEndPoint = `${financialRecommendationsController}/create`;
export const getFinancialRecommendationEndPoint = `${financialRecommendationsController}/get`;
export const deleteFinancialRecommendationEndPoint = `${financialRecommendationsController}/delete`;

//! Prompt Suggestions
export const getPromptSuggestionsEndPoint = `${promptSuggestionController}/get`;

// Notifications
export const getNotificationsEndPoint = `${notificationController}/get-all`;
export const getLatestUnreadNotificationEndPoint = `${notificationController}/get-latest-unread`;
export const markNotificationAsReadAsync = `${notificationController}/mark-as-read`;
export const markAllNotificationsAsReadAsync = `${notificationController}/mark-all-as-read`;
export const getNotificationHubEndPoint = `${baseURL}/notificationHub`;