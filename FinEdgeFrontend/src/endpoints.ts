const baseURL: string | undefined = process.env.REACT_APP_API_URL;

const authController: string | undefined = `${baseURL}/authentication`;
const userController: string | undefined = `${baseURL}/user`;
const accountController: string | undefined = `${baseURL}/accounts`;

export const registerEndPoint = `${authController}/register`;
export const loginEndPoint = `${authController}/login`;
export const logoutEndPoint = `${authController}/logout`;

export const getCurrentUserEnddPoint = `${userController}/get`;
export const updateCurrentUserEnddPoint = `${userController}/update`;

export const createAccountEndPoint = `${accountController}/create`;
export const getAllAccountsEndPoint = `${accountController}/get-all`;
export const getAccountEndPoint = `${accountController}/get`;
export const updateAccountEndPoint = `${accountController}/update`;
export const deleteAccountEndPoint = `${accountController}/delete`;