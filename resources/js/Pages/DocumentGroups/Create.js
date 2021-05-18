import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import LoadingButton from '@/Shared/LoadingButton';
import { Input } from '@/Shared/Form';
import { Form } from 'semantic-ui-react';

const Create = ({ handleClose }) => {
  const { data, setData, post, processing, errors } = useForm({
    name: ''
  });

  const handleSubmit = e => {
    e.preventDefault();
    post(route('documents.store'), {
      onSuccess: () => handleClose()
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        name="name"
        placeholder="Tell us more about you..."
        value={data.name}
        onChange={e => setData('name', e.target.value)}
        error={errors.name}
        containerClassName="p-0"
      />

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
