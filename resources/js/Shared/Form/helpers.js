function formatError(error) {
  const _error = {};
  _error.pointing = 'above';
  if (typeof error === 'object') {
    _error.content = error.content;
    _error.pointing = error.pointing || 'above';
  } else if (typeof error === 'string') {
    _error.content = error;
  }

  return _error;
}

function capitalize(s) {
  return s && s[0].toUpperCase() + s.slice(1);
}

export { formatError, capitalize };
