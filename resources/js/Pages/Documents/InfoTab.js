import React from 'react';
import { Form } from 'semantic-ui-react';
import { useForm } from '@inertiajs/inertia-react';

import LoadingButton from '@/Shared/LoadingButton';
import { TextArea, Input, Select } from '@/Shared/Form';

const InfoTab = ({ document, groups }) => {
  const { data, setData, errors, put, processing } = useForm({
    name: document.name || '',
    note: document.note || '',
    group_id: parseInt(document.group_id) || ''
  });

  const options = groups.map(i => {
    return { key: i.id, text: i.name, value: i.id };
  });
  options.unshift({ key: 0, text: 'Empty', value: null });

  function handleSubmit(e) {
    e.preventDefault();
    put(route('documents.update', document.id));
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

        <Select
          name="group"
          options={options}
          value={data.group_id}
          onChange={(e, data) => setData('group_id', data.value)}
          placeholder="Empty"
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
            Save
          </LoadingButton>
        </div>
      </Form>
    </div>
  );
};

export default InfoTab;
