export const validateLogin = (email, password) => {
  if (!email || !password) {
    return "All fields are required";
  }

  if (!email.includes("@")) {
    return "Invalid email";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  return null;
};

