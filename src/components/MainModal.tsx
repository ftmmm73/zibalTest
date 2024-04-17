import React from "react";
import { Button, Modal } from "antd";

type PropsTypes = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  content: React.ReactNode | string;
};

const MainModal = ({
  isOpen,
  onClose,
  content,
  title,
  onSubmit,
}: PropsTypes) => {
  return (
    <Modal
      title={title ?? "عنوان دیالوگ"}
      open={isOpen}
      onOk={onClose}
      onCancel={onClose}
      footer={() => (
        <>
          <Button onClick={onClose}>انصراف</Button>
          <Button type="primary" onClick={onSubmit} htmlType="submit">
            ثبت درخواست تسویه
          </Button>
        </>
      )}>
      {content}
    </Modal>
  );
};
export default MainModal;
