import React from 'react';
import { InertiaLink, useForm } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import LoadingButton from '@/Shared/LoadingButton';
import { Form } from 'semantic-ui-react';

const Create = () => {
  const { data, setData, errors, post, processing } = useForm({
    content: '',
    is_marked: false
  });

  const handleSubmit = e => {
    e.preventDefault();
    post(route('notes.store'));
  };

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">
        <InertiaLink
          href={route('notes')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Notes
        </InertiaLink>
        <span className="font-medium text-indigo-600"> /</span> Create
      </h1>

      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <Form onSubmit={handleSubmit}>
          <div className="p-8 -mb-3 -mr-3">
            <label className="form-label text-lg">Content</label>
            <Form.TextArea
              className="w-full"
              placeholder="Tell us more about you..."
              style={{ minHeight: 150 }}
              value={data.content}
              onChange={e => setData('content', e.target.value)}
              error={
                errors.content && {
                  content: errors.content,
                  pointing: 'below'
                }
              }
            />
          </div>

          <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
            <LoadingButton
              loading={processing}
              type="submit"
              className="btn-indigo"
            >
              Create Note
            </LoadingButton>
          </div>
        </Form>
      </div>
    </div>
  );
};

Create.layout = page => <Layout title="Create Note">{page}</Layout>;

export default Create;
