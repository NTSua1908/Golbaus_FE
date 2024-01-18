export const validatePassword = (_: any, value: any) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!value || regex.test(value)) {
    return Promise.resolve();
  }

  return Promise.reject(
    "Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one digit, and one special character."
  );
};

export const validateUsername = (_: any, value: any) => {
  const regex = /^[a-zA-Z0-9_]{3,15}$/;

  if (!value || regex.test(value)) {
    return Promise.resolve();
  }

  return Promise.reject(
    "The user name must be 3 to 15 characters long and can only contain letters (both uppercase and lowercase), numbers, and underscores."
  );
};

export const validateFullname = (_: any, value: any) => {
  const regex = /^[A-Za-z-' ]{3,20}$/;

  if (!value || regex.test(value)) {
    return Promise.resolve();
  }

  return Promise.reject(
    "The full name should be between 2 and 20 characters, use letters, spaces, hyphens, and apostrophes, and follow proper capitalization."
  );
};

export const validateEmail = (email: string) => {
  const regex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;

  if (!email || regex.test(email)) {
    return true;
  }
  return false;
};
