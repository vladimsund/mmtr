import { useState } from "react";

export default function useAuthPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "", api: "" });

  function validateEmail() {}
  function validatePassword() {}

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

  function handleLoginClick() {}

  return {
    form,
    errors,
    handleChangeEmail,
    handleChangePassword,
    handleLoginClick,
  };
}
