export default function validate(values) {
  const errors = {};

  const EMAIL_REGEX = /\S+@\S+\.\S+/;
  const PWD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

  if (!values.email) {
    errors.email = 'The email field must not be empty.';
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = "The email format must be 'name@domain.com'";
  }
  if (!values.password) {
    errors.password = 'The password field must not be empty.';
  } else if (!PWD_REGEX.test(values.password)) {
    errors.password =
      'The password should contain at least 8 characters, a capital letter, a number and a special character.';
  }

  return errors;
}
