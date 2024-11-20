const baseURL: string | undefined = process.env.REACT_APP_API_URL;

//! Controllers
const authController: string | undefined = `${baseURL}/authentication`;
const userController: string | undefined = `${baseURL}/user`;
const accountController: string | undefined = `${baseURL}/accounts`;
const categoryController: string | undefined = `${baseURL}/category`;
const transactionController: string | undefined = `${baseURL}/transaction`;

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
export const getIncomeCategoriesEndPoint = `${categoryController}/get/income`;
export const getExpenditureCategoriesEndPoint = `${categoryController}/get/expenditure`;
export const updateCategoryEndPoint = `${categoryController}/update`;
export const deleteCategoryEndPoint = `${categoryController}/delete`;
export const gdeleteAllCategoriesEndPoint = `${categoryController}/delete-all`;

//! Transactions
export const createTransactionEndPoint = `${transactionController}/create`;
export const getTransactionEndPoint = `${transactionController}/get`;
export const updateTransactionEndPoint = `${transactionController}/update`;
export const deleteTransactionEndPoint = `${transactionController}/delete`;