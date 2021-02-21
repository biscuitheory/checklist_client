export default function validateAddItem(values) {
  const errors = {};

  if (!values.name) {
    errors.name = 'Un nom de liste est obligatoire.';
  } else if (typeof values.name !== 'string') {
    errors.name =
      'Veuillez utiliser des caractères valides pour saisir le nom de liste.';
  }

  return errors;
}
