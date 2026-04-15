import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "@/shared";
import { useAuth } from "@/entities/user";

export default function useRegistrationPage() {
  const { register, validateName, validateEmail, validatePassword } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "vladimsund",
    email: "vladimsov@gmail.com",
    password: "Vladimsund123",
    confirmPassword: "Vladimsund123",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    api: "",
  });

  function handleChangeName(val) {
    setForm((prev) => ({ ...prev, login: val }));
    setErrors((prev) => ({ ...prev, login: "", api: "" }));
    validateName();
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

  function handleRegisterClick() {
    register({
      email: form.email,
      password: form.password,
      name: form.name,
    });
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
