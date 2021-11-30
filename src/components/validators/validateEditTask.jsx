export default function validateEditTask(values) {
  const errors = {};

  if (!values.name) {
    errors.name = 'Un intitulé de tâche est obligatoire.';
  } else if (typeof values.name !== 'string') {
    errors.name =
      'Veuillez utiliser des caractères valides pour saisir le nom de la tâche.';
  }

  if (!values.description) {
    errors.description = 'Une description de la tâche est obligatoire.';
  } else if (typeof values.description !== 'string') {
    errors.description =
      'Veuillez utiliser des caractères valides pour saisir la description de la tâche.';
  }

  if (typeof values.priority_id !== 'number') {
    errors.priority_id =
      'Veuillez utiliser des caractères valides pour saisir la priorité de la tâche.';
  }
  return errors;
}
