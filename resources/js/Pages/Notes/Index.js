import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import Pagination from '@/Shared/Pagination';
import SearchFilter from '@/Shared/SearchFilter';
import { Icon, Confirm } from 'semantic-ui-react';

const Index = () => {
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [currentNote, setCurrentNote] = useState({});

  const { notes } = usePage().props;
  const {
    data,
    meta: { links }
  } = notes;

  const handleConfirmDelete = () => {
    Inertia.delete(route('notes.destroy', currentNote.id));
    setOpenDeleteConfirm(false);
  };

  const handleCancelDelete = () => {
    setOpenDeleteConfirm(false);
  };

  const handleClickDelete = note => {
    setCurrentNote(note);
    setOpenDeleteConfirm(true);
  };

  const renderNote = (note, index) => {
    return (
      <div className="max-w-md md:max-w-2xl" key={index}>
        <div className="bg-yellow-200 rounded-lg overflow-hidden md:flex">
          <div>
            <div className="p-4 md:p-5">
              <p className="font-bold text-xl md:text-2xl">
                {new Date(note.created_at).toDateString()}
              </p>
              <p className="text-gray-700 md:text-lg">{note.content}</p>

              <button
                className="bg-red-500 p-1.5 rounded flex items-center justify-center focus:outline-none"
                type="button"
                style={{ transition: 'all .15s ease' }}
                onClick={() => handleClickDelete(note)}
              >
                <Icon name="trash alternate outline" style={{ margin: 0 }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDeleteConfirm = () => {
    return (
      <Confirm
        open={openDeleteConfirm}
        content="Are you sure you want to delete this?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    );
  };

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Notes</h1>

      <div className="flex items-center justify-between mb-6">
        <SearchFilter />
      </div>
      <div className="flex items-center mb-6">
        <InertiaLink
          className="btn-indigo focus:outline-none"
          href={route('notes.create')}
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

      {renderDeleteConfirm()}
    </div>
  );
};

Index.layout = page => <Layout title="Notes">{page}</Layout>;

export default Index;
