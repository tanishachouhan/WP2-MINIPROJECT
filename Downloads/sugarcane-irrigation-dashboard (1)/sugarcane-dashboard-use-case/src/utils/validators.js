// Shared validation helpers for Login / Signup forms.

const SPECIAL_CHAR_REGEX = /[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\/;']/;
const ID_REGEX = /^[A-Za-z0-9._]{4,}$/;

export function getPasswordChecks(password) {
  return {
    length: password.length >= 8,
    special: SPECIAL_CHAR_REGEX.test(password),
  };
}

export function isPasswordValid(password) {
  const checks = getPasswordChecks(password);
  return checks.length && checks.special;
}

export function isIdValid(id) {
  return ID_REGEX.test(id.trim());
}
