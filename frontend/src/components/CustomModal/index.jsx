import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export default function CustomModal(props) {
  const { onHide, children, title, eventsave } = props;

  const save = () => {
    eventsave();
      onHide();
  }

  return (
    <Modal 
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={save}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
