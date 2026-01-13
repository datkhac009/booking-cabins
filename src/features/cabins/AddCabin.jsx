import { useState } from "react";
import CreateCabinFormv1 from "./CreateCabinFormv1";
import Button from "../../ui/Button";
import Modal from "./../../ui/Modal";
function AddCabin() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div>
        <Button
          onClick={() => setShowForm((s) => !s)}
          style={{ width: "100%", marginBottom: "5rem", marginTop: "1.5rem" }}
        >
          Add new Cabin
        </Button>
        {showForm && (
          <Modal closeModal={() => setShowForm(false)}>
            <CreateCabinFormv1 closeModal={() => setShowForm(false)} />
          </Modal>
        )}
      </div>
    </>
  );
}

export default AddCabin;
