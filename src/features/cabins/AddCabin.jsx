import CreateCabinFormv1 from "./CreateCabinFormv1";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import styled from "styled-components";

const AddCabinActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

function AddCabin() {
  return (
    <AddCabinActions>
      <Modal>
        <Modal.Toggle opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Toggle>
        
        <Modal.Window name="cabin-form">
          <CreateCabinFormv1 />
        </Modal.Window>
      </Modal>
    </AddCabinActions>
  );
}

export default AddCabin;
