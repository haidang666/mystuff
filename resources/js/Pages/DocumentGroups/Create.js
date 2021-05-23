import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import LoadingButton from '@/Shared/LoadingButton';
import { Input } from '@/Shared/Form';
import { Form } from 'semantic-ui-react';

const Create = ({ handleClose, group }) => {
  const { data, setData, post, processing, errors } = useForm({
    name: group?.name || '',
    id: group?.id || ''
  });
  const routeName = group?.id
    ? 'documents.groups.store'
    : 'documents.groups.update';

  const handleSubmit = e => {
    e.preventDefault();

    post(route(routeName), {
      onSuccess: () => {
        setData('name', '');
        handleClose();
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        name="name"
        placeholder="Group name"
        defaultValue={data.name}
        onChange={e => setData('name', e.target.value)}
        error={errors.name}
        containerClassName="p-0"
      />

      <input type="hidden" value={data.id} name="id" />

      <div className="flex items-center justify-end mt-2">
        <LoadingButton
          loading={processing}
          type="submit"
          className="btn-indigo"
        >
          Create New Group
        </LoadingButton>
      </div>
    </Form>
  );
};

export default Create;
