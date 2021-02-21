export default function validatePostList(values) {
  const errors = {};

  if (!values.name) {
    errors.name = 'Un nom de liste est obligatoire.';
  } else if (typeof values.name !== 'string') {
    errors.name =
      'Veuillez utiliser des caractères valides pour saisir le nom de liste.';
  }

  if (!values.description) {
    errors.description = 'Une description de la tâche est obligatoire.';
  } else if (typeof values.description !== 'string') {
    errors.description =
      'Veuillez utiliser des caractères valides pour saisir la description de la tâche.';
  }

  return errors;
}
