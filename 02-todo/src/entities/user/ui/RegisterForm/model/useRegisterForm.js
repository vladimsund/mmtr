import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES, USER_ERRORS, DEFAULT_ERRORS } from "@/shared";

import { useUser } from "@/entities/user";

export default function useRegistrationPage() {
  const navigate = useNavigate();
  const { handleRegister, getEmailError, getPasswordError } = useUser();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    api: "",
  });

  function handleChangeName(val) {
    setForm((prev) => ({ ...prev, name: val }));
    setErrors((prev) => ({ ...prev, name: "", api: "" }));
  }

  function handleChangeEmail(val) {
    setForm((prev) => ({ ...prev, email: val }));
    setErrors((prev) => ({ ...prev, email: getEmailError(val), api: "" }));
  }

  function handleChangePassword(val) {
    setForm((prev) => ({ ...prev, password: val }));
    setErrors((prev) => ({
      ...prev,
      password: getPasswordError(val),
      api: "",
    }));
  }

  function handleChangeConfirm(val) {
    setForm((prev) => ({ ...prev, confirmPassword: val }));
    setErrors((prev) => ({ ...prev, api: "" }));
  }

  async function handleRegisterClick() {
    if (errors.email || errors.password || !form.email || !form.password) {
      return;
    }

    if (form.password !== form.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        api: USER_ERRORS.DIFFERENT_PASSWORDS,
      }));
      return;
    }

    const result = await handleRegister(form.name, form.email, form.password);

    if (!result.error) {
      navigate(ROUTES.BOARDS);
      return;
    }

    let ouputErrorApi = "";
    const statusCode = result.payload?.statusCode;

    if (statusCode === 409) {
      ouputErrorApi = USER_ERRORS.EMAIL_BUSY;
    } else if (statusCode === 400) {
      ouputErrorApi = USER_ERRORS.VALIDATE_INPUT;
    } else {
      ouputErrorApi = DEFAULT_ERRORS.NETWORK_API;
    }

    setErrors((p) => ({ ...p, api: ouputErrorApi }));
  }

  function handleNavigateTo() {
    navigate(ROUTES.AUTH);
  }

  return {
    form,
    errors,
    handleChangeName,
    handleChangeEmail,
    handleChangePassword,
    handleChangeConfirm,
    handleRegisterClick,
    handleNavigateTo,
  };
}
