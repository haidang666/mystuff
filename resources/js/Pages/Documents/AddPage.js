import React from 'react';
import { Form } from 'semantic-ui-react';
import { useForm } from '@inertiajs/inertia-react';

import FileInput from '@/Shared/FileInput';
import LoadingButton from '@/Shared/LoadingButton';
import { TextArea, Input } from '@/Shared/Form';

const AddPage = () => {
  const { data, setData, errors, post, processing } = useForm({
    name: '',
    note: '',
    photo: ''
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route('documents.update', document.id));
  }

  return (
    <div className="bg-white rounded shadow">
      <Form onSubmit={handleSubmit}>
        <Input
          name="name"
          placeholder="Tell us more about you..."
          value={data.name}
          onChange={e => setData('name', e.target.value)}
          error={errors.name}
        />

        <TextArea
          name="text"
          placeholder="Tell us more about you..."
          style={{ minHeight: 150 }}
          value={data.note}
          onChange={e => setData('note', e.target.value)}
          error={errors.note}
        />

        <FileInput
          className="p-8 -mb-3 -mr-3"
          label="Photo"
          name="photo_url"
          accept="image/*"
          errors={errors.photo}
          value={data.photo}
          onChange={photo => setData('photo', photo)}
        />

        <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
          <LoadingButton
            loading={processing}
            type="submit"
            className="btn-indigo"
          >
            Save
          </LoadingButton>
        </div>
      </Form>
    </div>
  );
};

export default AddPage;
