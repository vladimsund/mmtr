import { useDispatch } from "react-redux";

import { USER_ERRORS } from "@/shared";

import { login, register } from "../slices/userSlice";

export default function useUser() {
  const dispatch = useDispatch();

  function handleLogin(email, password) {
    return dispatch(login({ email, password }));
  }

  function handleRegister(name, email, password) {
    return dispatch(register({ name, email, password }));
  }

  function getEmailError(email) {
    if (!email) {
      return "";
    }

    return email.includes("@") ? "" : USER_ERRORS.INCORRECT_EMAIL;
  }

  function getPasswordError(password) {
    if (!password) {
      return "";
    }

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
    getEmailError,
    getPasswordError,
  };
}
