import { useState } from "react";
import { Button, Form, Modal } from "antd";
import SongForm from "./song-form";

const SongModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add New Song
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Submit">
        <SongForm form={form} setOpen={setIsModalOpen} />
      </Modal>
    </>
  );
};

export default SongModal;
