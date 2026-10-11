const fieldLimits = {
  name: 100,
  email: 254,
  subject: 160,
  message: 5000,
  organization: 160,
};

export function validateContact(payload) {
  const errors = {};
  const values = Object.fromEntries(
    Object.keys(fieldLimits).map((field) => [
      field,
      typeof payload?.[field] === 'string' ? sanitize(payload[field]) : '',
    ]),
  );

  for (const field of ['name', 'email', 'subject', 'message']) {
    if (!values[field]) errors[field] = 'This field is required.';
  }

  for (const [field, limit] of Object.entries(fieldLimits)) {
    if (values[field].length > limit) {
      errors[field] = `Must be ${limit} characters or fewer.`;
    }
  }

  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address.';
  }

  return { errors, values };
}

function sanitize(value) {
  return value
    .split('')
    .filter((character) => {
      const code = character.charCodeAt(0);
      return !((code <= 8) || code === 11 || code === 12 || (code >= 14 && code <= 31) || code === 127);
    })
    .join('')
    .trim();
}
