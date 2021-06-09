import React from 'react';
import { InertiaLink, usePage, useForm } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import LoadingButton from '@/Shared/LoadingButton';
import { TextArea, Input, Select } from '@/Shared/Form';
import { Form } from 'semantic-ui-react';

const Create = () => {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    note: '',
    group_id: ''
  });
  const { groups } = usePage().props;

  const handleSubmit = e => {
    e.preventDefault();
    post(route('documents.store'));
  };

  const options = groups.map(i => {
    return { key: i.id, text: i.name, value: i.id };
  });
  options.unshift({ key: 0, text: 'Empty', value: null });

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">
        <InertiaLink
          href={route('documents.index')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Documents
        </InertiaLink>
        <span className="font-medium text-indigo-600"> /</span> Create
      </h1>

      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <Form onSubmit={handleSubmit}>
          <Input
            name="name"
            placeholder="Tell us more about you..."
            value={data.name}
            onChange={e => setData('name', e.target.value)}
            error={errors.name}
          />

          <Select
            name="group"
            options={options}
            value={data.group_id}
            onChange={(e, data) => setData('group_id', data.value)}
            placeholder="Empty"
            error={errors.group_id}
          />

          <TextArea
            name="note"
            placeholder="Tell us more about you..."
            style={{ minHeight: 150 }}
            value={data.note}
            onChange={e => setData('note', e.target.value)}
            error={errors.note}
          />

          <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
            <LoadingButton
              loading={processing}
              type="submit"
              className="btn-indigo"
            >
              Create Document
            </LoadingButton>
          </div>
        </Form>
      </div>
    </div>
  );
};

Create.layout = page => <Layout title="Create Document">{page}</Layout>;

export default Create;
