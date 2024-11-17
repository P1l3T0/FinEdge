const baseURL: string | undefined = process.env.REACT_APP_API_URL;

const authController: string | undefined = `${baseURL}/authentication`;
const userController: string | undefined = `${baseURL}/user`;
const accountController: string | undefined = `${baseURL}/accounts`;
const categoryController: string | undefined = `${baseURL}/category`;

export const registerEndPoint = `${authController}/register`;
export const loginEndPoint = `${authController}/login`;
export const logoutEndPoint = `${authController}/logout`;
export const refreshTokenEndPoint = `${authController}/refresh-token`;

export const getCurrentUserEnddPoint = `${userController}/get`;
export const updateCurrentUserEnddPoint = `${userController}/update`;
export const deketeCurrentUserEnddPoint = `${userController}/delete`;

export const createAccountEndPoint = `${accountController}/create`;
export const getAllAccountsEndPoint = `${accountController}/get-all`;
export const getAccountEndPoint = `${accountController}/get`;
export const updateAccountEndPoint = `${accountController}/update`;
export const deleteAccountEndPoint = `${accountController}/delete`;

export const createCategoryEndPoint = `${categoryController}/create`;
export const getIncomeCategoriesEndPoint = `${categoryController}/get/income`;
export const getExpenditureCategoriesEndPoint = `${categoryController}/get/expenditure`;
export const updateCategoryEndPoint = `${categoryController}/update`;
export const deleteCategoryEndPoint = `${categoryController}/delete`;
export const gdeleteAllCategoriesEndPoint = `${categoryController}/delete-all`;
