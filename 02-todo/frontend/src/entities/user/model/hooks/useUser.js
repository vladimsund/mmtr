import { useSelector, useDispatch } from "react-redux";

import { DEFAULT_ERRORS, USER_ERRORS } from "@/shared";

import { login, register } from "../../api";
import { logout, refreshAuth } from "../slices";
import { isAuth } from "../selectors";

export default function useUser() {
  const dispatch = useDispatch();

  const isUserAuth = useSelector(isAuth);

  async function handleLogin(email, password) {
    try {
      await dispatch(login({ email, password })).unwrap();
    } catch (error) {
      if (error.statusCode === 401) {
        return USER_ERRORS.NOT_EXIST;
      }

      return DEFAULT_ERRORS.NETWORK_API;
    }
  }

  async function handleRegister(name, email, password) {
    try {
      await dispatch(register({ name, email, password })).unwrap();
    } catch (error) {
      if (error.statusCode === 409) {
        return USER_ERRORS.EMAIL_BUSY;
      }

      return DEFAULT_ERRORS.NETWORK_API;
    }
  }

  function handleLogout() {
    dispatch(logout());
  }

  function handleRefreshUser() {
    dispatch(refreshAuth());
  }

  function getEmailError(email) {
    return email.includes("@") ? "" : USER_ERRORS.INCORRECT_EMAIL;
  }

  function getPasswordError(password) {
    const chars = password.split("");
    const hasDigit = chars.some((c) => c >= "0" && c <= "9");
    const hasLetter = /[a-zA-Z]/.test(password);

    if (password.length < 8 || !hasDigit || !hasLetter) {
      return USER_ERRORS.INCORRECT_PASSWORD;
    }

    return "";
  }

  return {
    handleLogin,
    handleRegister,
    handleLogout,
    handleRefreshUser,
    isUserAuth,
    getEmailError,
    getPasswordError,
  };
}
