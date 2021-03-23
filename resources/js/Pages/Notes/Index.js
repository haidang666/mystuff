import React from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import Pagination from '@/Shared/Pagination';
import SearchFilter from '@/Shared/SearchFilter';
import { Icon } from 'semantic-ui-react';

const Index = () => {
  const { notes } = usePage().props;
  const {
    data,
    meta: { links }
  } = notes;
 
  const renderNote = (note, index) => {
    return (
      <div className="max-w-md md:max-w-2xl" key={index}>
        <div className="bg-yellow-200 rounded-lg overflow-hidden md:flex">
          <div>
            <div className="p-4 md:p-5">
              <p className="font-bold text-xl md:text-2xl">{new Date(note.created_at).toDateString()}</p>
              <p className="text-gray-700 md:text-lg">{note.content}</p>

              <button className="bg-red-500 rounded-full flex items-center justify-center" type="button" style={{ transition: "all .15s ease" }}>
                <Icon name='trash alternate outline'/>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Notes</h1>

      <div className="flex items-center justify-between mb-6">
        <SearchFilter />
        <InertiaLink
          className="btn-indigo focus:outline-none"
          href={route('contacts.create')}
        >
          <span>Create</span>
          <span className="hidden md:inline"> Notes</span>
        </InertiaLink>
      </div>

      <div className="overflow-x-auto bg-white">
        <div className="grid gap-3 grid-cols-1 md:grid-cols-5">
          {data.map(renderNote)}
        </div>
      </div>

      <Pagination links={links} />
    </div>
  );
};

Index.layout = page => <Layout title="Notes">{page}</Layout>;

export default Index;
