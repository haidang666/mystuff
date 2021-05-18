import React from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage, useForm } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
// import DeleteButton from '@/Shared/DeleteButton';
import LoadingButton from '@/Shared/LoadingButton';
import { TextArea, Input, Select } from '@/Shared/Form';
import { Form } from 'semantic-ui-react';
import TrashedMessage from '@/Shared/TrashedMessage';

const Edit = () => {
  const { document, groups } = usePage().props;
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

  // function destroy() {
  //   if (confirm('Are you sure you want to delete this contact?')) {
  //     Inertia.delete(route('contacts.destroy', document.id));
  //   }
  // }

  function restore() {
    if (confirm('Are you sure you want to restore this contact?')) {
      Inertia.put(route('contacts.restore', document.id));
    }
  }

  return (
    <div>
      <Helmet title={`${data.name}`} />
      <h1 className="mb-8 text-3xl font-bold">
        <InertiaLink
          href={route('documents')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Documents
        </InertiaLink>
        <span className="mx-2 font-medium text-indigo-600">/</span>
        {data.name}
      </h1>
      {document.deleted_at && (
        <TrashedMessage onRestore={restore}>
          This document has been deleted.
        </TrashedMessage>
      )}
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
    </div>
  );
};

Edit.layout = page => <Layout>{page}</Layout>;

export default Edit;
