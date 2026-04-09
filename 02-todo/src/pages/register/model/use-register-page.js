import { useState } from "react";

export default function useRegisterPage() {
  const [form, setForm] = useState({
    login: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    login: "",
    email: "",
    password: "",
    api: "",
  });

  function validateLogin() {}
  function validateEmail() {}
  function validatePassword() {}

  function handleChangeLogin(val) {
    setForm((prev) => ({ ...prev, login: val }));
    setErrors((prev) => ({ ...prev, login: "", api: "" }));
    validateLogin();
  }

  function handleChangeEmail(val) {
    setForm((prev) => ({ ...prev, email: val }));
    setErrors((prev) => ({ ...prev, email: "", api: "" }));
    validateEmail();
  }

  function handleChangePassword(val) {
    setForm((prev) => ({ ...prev, password: val }));
    setErrors((prev) => ({ ...prev, password: "", api: "" }));
    validatePassword();
  }

  function handleChangeConfirm(val) {
    setForm((prev) => ({ ...prev, confirmPassword: val }));
    setErrors((prev) => ({ ...prev, api: "" }));
  }

  function handleRegisterClick() {}

  return {
    form,
    errors,
    handleChangeLogin,
    handleChangeEmail,
    handleChangePassword,
    handleChangeConfirm,
    handleRegisterClick,
  };
}
