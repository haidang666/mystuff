import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/inertia-react';

import LoadingButton from '@/Shared/LoadingButton';
import { Input } from '@/Shared/Form';
import { Form, Modal } from 'semantic-ui-react';

const CreateModal = ({ isOpen, closeModelCb }) => {
  const { data, setData, post, processing, errors, clearErrors } = useForm({
    name: '',
    id: ''
  });

  const handleClose = () => {
    closeModelCb();
  };

  const handleSubmit = e => {
    e.preventDefault();

    post(route('documents.groups.store'), {
      onSuccess: () => {
        setData({});
        handleClose();
      }
    });
  };

  useEffect(() => {
    if (isOpen === true) {
      clearErrors();
    }
  }, [isOpen]);

  return (
    <Modal open={isOpen} onClose={handleClose} closeIcon>
      <Modal.Header>Create new group</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Input
            name="name"
            placeholder="Group name"
            defaultValue={data.name}
            onChange={e => setData('name', e.target.value)}
            error={errors.name}
            containerClassName="p-0"
          />

          <input type="hidden" value={data.id} name="id" />

          <div className="flex items-center justify-end mt-2">
            <LoadingButton
              loading={processing}
              type="submit"
              className="btn-indigo"
            >
              {!processing && 'Create New Group'}
            </LoadingButton>
          </div>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default CreateModal;
