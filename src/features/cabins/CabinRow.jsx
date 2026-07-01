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
  width: 7.2rem;
  height: 5.2rem;
  object-fit: cover;
  object-position: center;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
`;

const Cabin = styled.div`
  display: grid;
  gap: 0.2rem;
`;

const CabinName = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-800);
`;

const CabinDescription = styled.p`
  max-width: 32rem;
  color: var(--color-grey-500);
  font-size: 1.3rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Capacity = styled.div`
  color: var(--color-grey-600);
  font-weight: 500;
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
  color: var(--color-grey-800);
`;

const Discount = styled.div`
  justify-self: start;
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  background-color: var(--color-green-100);
  color: var(--color-green-700);
  font-size: 1.3rem;
  font-weight: 700;
`;

const NoDiscount = styled.span`
  color: var(--color-grey-400);
  font-weight: 600;
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

      <Cabin>
        <CabinName>{name}</CabinName>
        <CabinDescription>{description}</CabinDescription>
      </Cabin>

      <Capacity>Up to {maxCapacity} guests</Capacity>

      <Price>{formatCurrency(regularPrice)}</Price>

      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <NoDiscount>No discount</NoDiscount>
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
