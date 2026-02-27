import CreateCabinFormv1 from "./CreateCabinFormv1";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Toggle opens="cabin-form">
          <Button style={{ width: "100%", marginBottom: "5rem", marginTop: "1.5rem" }}>
            Add new Cabin
          </Button>
        </Modal.Toggle>
        
        <Modal.Window name="cabin-form">
          <CreateCabinFormv1 />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCabin;