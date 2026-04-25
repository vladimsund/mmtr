import { useSelector, useDispatch } from "react-redux";

import { USER_ERRORS } from "@/shared";

import { login, register } from "../../api";
import { logout, refreshAuth } from "../slices";
import { isAuth } from "../selectors";

export default function useUser() {
  const dispatch = useDispatch();

  const isUserAuth = useSelector(isAuth);

  function handleLogin(email, password) {
    return dispatch(login({ email, password }));
  }

  function handleRegister(name, email, password) {
    return dispatch(register({ name, email, password }));
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
