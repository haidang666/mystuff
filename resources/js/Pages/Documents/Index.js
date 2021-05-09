import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import Pagination from '@/Shared/Pagination';
import SearchFilter from '@/Shared/SearchFilter';
import { Icon, Confirm } from 'semantic-ui-react';

const Index = () => {
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [currentContext, setCurrentContext] = useState({});
  const { documents } = usePage().props;
  const {
    data,
    meta: { links }
  } = documents;

  const handleConfirmDelete = () => {
    Inertia.delete(route('documents.destroy', currentContext.id));
    setOpenDeleteConfirm(false);
  };

  const handleCancelDelete = () => {
    setOpenDeleteConfirm(false);
  };

  const handleClickDelete = context => {
    setCurrentContext(context);
    setOpenDeleteConfirm(true);
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

  function renderTable() {
    function renderHead() {
      return (
        <thead>
          <tr className="font-bold text-left">
            <th className="px-6 pt-5 pb-4">Name</th>
            <th className="px-6 pt-5 pb-4">Group</th>
            <th className="px-6 pt-5 pb-4">Action</th>
          </tr>
        </thead>
      );
    }

    function renderRow(item, index) {
      return (
        <tr key={index} className="hover:bg-gray-100 focus-within:bg-gray-100">
          <td className="border-t">
            <InertiaLink
              tabIndex="1"
              href={route('contacts.edit', item.id)}
              className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"
            >
              {item.name}
              {item.deleted_at && (
                <Icon
                  name="trash"
                  className="flex-shrink-0 w-3 h-3 ml-2 text-gray-400 fill-current"
                />
              )}
            </InertiaLink>
          </td>
          <td className="border-t">
            <InertiaLink
              tabIndex="-1"
              className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
              href={route('contacts.edit', item.id)}
            >
              {item.group.name}
            </InertiaLink>
          </td>
          <td className="border-t">
            <InertiaLink
              tabIndex="-1"
              href={route('contacts.edit', item.id)}
              className="flex items-center px-4 focus:outline-none"
            >
              <Icon
                name="trash"
                className="block w-6 h-6 text-gray-400 fill-current"
              />
            </InertiaLink>
          </td>
        </tr>
      );
    }

    return (
      <table className="w-full whitespace-nowrap">
        {renderHead()}
        <tbody>
          {data.map(renderRow)}
          {data.length === 0 && (
            <tr>
              <td className="px-6 py-4 border-t" colSpan="3">
                Empty data.
                <button onClick={handleClickDelete}>A</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Documents</h1>

      <div className="flex items-center justify-between mb-6">
        <SearchFilter />
        <InertiaLink
          className="btn-indigo focus:outline-none"
          href={route('notes.create')}
        >
          <span>Create</span>
          <span className="hidden md:inline"> Document</span>
        </InertiaLink>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        {renderTable()}
      </div>

      <Pagination links={links} />

      {renderDeleteConfirm()}
    </div>
  );
};

Index.layout = page => <Layout title="Documents">{page}</Layout>;

export default Index;
