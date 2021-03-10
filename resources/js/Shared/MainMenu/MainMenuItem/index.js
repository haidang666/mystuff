import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import classNames from 'classnames';
import { Icon as IconX } from 'semantic-ui-react';

export default ({ icon, link, text }) => {
  const isActive = route().current(link + '*');

  const textClasses = classNames({
    'text-white': isActive,
    'text-indigo-200 group-hover:text-white': !isActive
  });

  return (
    <div className="mb-4">
      <InertiaLink href={route(link)} className="flex items-center group py-3">
        <IconX name={icon} size='large' disabled={!isActive} className={textClasses}/>
        <div className={textClasses}>{text}</div>
      </InertiaLink>
    </div>
  );
};
