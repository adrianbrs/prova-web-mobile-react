import { PropsWithChildren } from "react";
import { Button, Modal } from "react-bootstrap";

export interface ModalFormProps {
  title: string;
  formId: string;
  showModal: boolean;
  closeModal: () => void;
}

const ModalForm = ({
  children,
  title,
  showModal,
  formId,
  closeModal,
}: PropsWithChildren<ModalFormProps>) => {
  return (
    <Modal show={showModal}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{children}</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Fechar
        </Button>
        <Button variant="primary" type="submit" form={formId}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalForm;
