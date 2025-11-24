import Button from 'ui/Button';
import Modal from 'ui/Modal';

function AddCabin() {
  return (
    <Modal>
      <Modal.Toggle opens='new-cabin'>
        <Button>Add new cabin</Button>
      </Modal.Toggle>
     
    </Modal>
  );
}

export default AddCabin;
