export default function validateAddTask(values) {
  const errors = {};

  if (!values.name) {
    errors.name = 'Un nom de liste est obligatoire.';
  } else if (typeof values.name !== 'string') {
    errors.name =
      'Veuillez utiliser des caractères valides pour saisir le nom de liste.';
  }

  if (!values.description) {
    errors.description = 'Une description de liste est obligatoire.';
  } else if (typeof values.description !== 'string') {
    errors.description =
      'Veuillez utiliser des caractères valides pour saisir la description de liste.';
  }

  return errors;
}
