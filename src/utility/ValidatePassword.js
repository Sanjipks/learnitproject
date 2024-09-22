export const validatePassword = (password) => {
  const minLength = 8;
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
    return { toastMessage: "Password must be at least 8 characters long." };
  } else if (!hasLowercase) {
    return {
      toastMessage: "Password must contain at least one lowercase letter.",
    };
  } else if (!hasUppercase) {
    return {
      toastMessage: "Password must contain at least one uppercase letter.",
    };
  } else if (!hasNumber) {
    return { toastMesage: "Password must contain at least one number." };
  } else if (!hasSpecialChar) {
    return {
      toastMessage: "Password must contain at least one special character.",
    };
  }

  return null;
};
