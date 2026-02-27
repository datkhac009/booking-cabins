import styled from "styled-components";
import { HiPencil, HiTrash, HiSquare2Stack } from "react-icons/hi2";

import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import CreateCabinFormv1 from "./CreateCabinFormv1";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  const { deleteCabin, isLoading: isDeleting } = useDeleteCabin();
  const {  createCabin } = useCreateCabin();

  function handleDuplicate() {
    createCabin({
      name: `${name} duplicate`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <Table.Row role="row">
      <Img src={image} alt={`Cabin ${name}`} />

      <Cabin>{name}</Cabin>

      <div>Fits up to {maxCapacity} guests</div>

      <Price>{formatCurrency(regularPrice)}</Price>

      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={cabinId} />

          <Menus.List id={cabinId}>
            <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
              Duplicate
            </Menus.Button>

            <Modal.Toggle opens="edit">
              <Menus.Button icon={<HiPencil />}>Edit cabin</Menus.Button>
            </Modal.Toggle>

            <Modal.Toggle opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete cabin</Menus.Button>
            </Modal.Toggle>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="edit">
          <CreateCabinFormv1 editCabin={cabin} />
        </Modal.Window>

        <Modal.Window name="delete">
          <ConfirmDelete
            resource="cabin"
            onConfirm={() => deleteCabin(cabinId)}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default CabinRow;