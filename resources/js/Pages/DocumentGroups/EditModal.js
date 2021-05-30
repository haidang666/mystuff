import React, { useEffect } from 'react';
import { Modal } from 'semantic-ui-react';
import { useForm } from '@inertiajs/inertia-react';

import { Input } from '@/Shared/Form';
import { Form } from 'semantic-ui-react';
import LoadingButton from '@/Shared/LoadingButton';

const EditModal = ({ group, isOpen, closeModelCb }) => {
  const { setData, put, processing, errors, clearErrors } = useForm({
    name: '',
    id: ''
  });

  const handleClose = () => {
    closeModelCb();
  };

  const handleSubmit = e => {
    e.preventDefault();

    put(route('documents.groups.update', group.id), {
      onSuccess: () => {
        setData({});
        handleClose();
      }
    });
  };

  useEffect(() => {
    if (isOpen === true) {
      clearErrors();
      setData(group);
    }
  }, [isOpen, group]);

  return (
    <Modal open={isOpen} onClose={handleClose} closeIcon>
      <Modal.Header>Edit group name </Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Input
            name="name"
            placeholder="New group name"
            defaultValue={group.name}
            onChange={e => setData('name', e.target.value)}
            containerClassName="p-0"
            error={errors.name}
          />

          <input type="hidden" value={group.id} name="id" />

          <div className="flex items-center justify-end mt-2">
            <LoadingButton
              loading={processing}
              type="submit"
              className="btn-indigo"
            >
              {!processing && 'Save'}
            </LoadingButton>
          </div>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default EditModal;
