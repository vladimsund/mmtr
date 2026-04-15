import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "@/shared";
import { useAuth } from "@/entities/user";

export default function useLoginPage() {
  const { login, validateEmail, validatePassword } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "vladimsov@gmail.com",
    password: "Vladimsund123",
  });
  const [errors, setErrors] = useState({ email: "", password: "", api: "" });

  function handleChangeEmail(val) {
    setForm((prev) => ({ ...prev, email: val }));
    setErrors((prev) => ({ ...prev, email: "", api: "" }));
    validateEmail(val);
  }

  function handleChangePassword(val) {
    setForm((prev) => ({ ...prev, password: val }));
    setErrors((prev) => ({ ...prev, password: "", api: "" }));
    validatePassword(val);
  }

  function handleNavigateTo() {
    navigate(ROUTES.REGISTER);
  }

  function handleLoginClick() {
    login({
      email: form.email,
      password: form.password,
    });
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
