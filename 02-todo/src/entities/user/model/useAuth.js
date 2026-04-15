import { login as loginReq, registration as registrationReq } from "@/pages";

export default function useAuth() {
  function validateName() {}
  function validateEmail() {}
  function validatePassword() {}

  function login(data) {
    console.log(loginReq(data));
  }

  function register(data) {
    console.log(registrationReq(data));
  }

  return {
    login,
    register,
    validateName,
    validateEmail,
    validatePassword,
  };
}
