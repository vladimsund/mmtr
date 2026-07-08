import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES, USER_ERRORS } from "@/shared";

import { useUser } from "@/entities/user";

export default function useLoginForm() {
  const navigate = useNavigate();
  const user = useUser();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ email: "", password: "", api: "" });

  function handleChangeEmail(val) {
    setForm((prev) => ({ ...prev, email: val }));
    setErrors((prev) => ({ ...prev, email: user.getEmailError(val), api: "" }));
  }

  function handleChangePassword(val) {
    setForm((prev) => ({ ...prev, password: val }));
    setErrors((prev) => ({
      ...prev,
      password: user.getPasswordError(val),
      api: "",
    }));
  }

  function handleNavigateTo() {
    navigate(ROUTES.REGISTER);
  }

  async function handleLoginClick() {
    if (errors.email || errors.password || !form.email || !form.password) {
      return;
    }

    const error = await user.handleLogin(form.email, form.password);

    if (!error) {
      navigate(ROUTES.BOARDS);
      return;
    }

    setErrors((p) => ({ ...p, api: error }));
  }

  return {
    form,
    errors,
    handleChangeEmail,
    handleChangePassword,
    handleLoginClick,
    handleNavigateTo,
  };
}
