import React from 'react';
import { Form } from 'semantic-ui-react';

import { formatError, capitalize } from './helpers';

export default ({
  label,
  name,
  containerClassName,
  className,
  error,
  ...props
}) => {
  const _error = formatError(error);

  return (
    <div className={containerClassName || 'p-8 -mb-3 -mr-3'}>
      <label className="form-label text-lg" htmlFor={name}>
        {label || capitalize(name)}
      </label>
      <Form.Select
        className={className || 'w-full'}
        id={name}
        name={name}
        {...props}
        error={_error.content && _error}
      />
    </div>
  );
};
