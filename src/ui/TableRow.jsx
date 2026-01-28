// CabinRow.jsx (TableRow.jsx)
import styled from "styled-components";
import Table from "../ui/Table";
import { useState } from "react";
import CreateCabinFormv1 from "../features/cabins/CreateCabinFormv1";
import { useDeleteCabin } from "../features/cabins/useDeleteCabin";
import { useCreateCabin } from "../features/cabins/useCreateCabin";
import { HiSquare2Stack, HiPencil, HiTrash } from "react-icons/hi2";
import Modal from "../ui/Modal";
import ConfirmDelete from "../ui/ConfirmDelete";
import Menus from "../ui/Menus";

const CellCabin = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const Img = styled.img`
  width: 150px;
  height: max-content;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(16, 24, 40, 0.08);
`;

export default function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const { id, name, image, maxCapacity, regularPrice, discount } = cabin;

  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { CreateCabin, isLoading } = useCreateCabin();

  function handleCopy() {
    CreateCabin({
      name: `Copy Name : ${name}`,
      image,
      maxCapacity,
      regularPrice,
      discount,
    });
  }

  return (
    <>
      <Table.Row>
        <CellCabin style={{ justifySelf: "self-start" }}>
          <Img src={image} alt={name} />
        </CellCabin>

        <div style={{ justifySelf: "start" }}>
          <p>{name}</p>
        </div>

        <div style={{ justifySelf: "center", textAlign: "center" }}>
          {maxCapacity}
        </div>

        <div
          style={{
            justifySelf: "center",
            fontVariantNumeric: "tabular-nums",
            fontFamily: "'Courier New', monospace",
            color: "black",
            fontWeight: "bold",
          }}
        >
          ${regularPrice.toFixed(2)}
        </div>

        <div
          style={{
            justifySelf: "center",
            fontFamily: "'Courier New', monospace",
            color: "red",
            fontWeight: "bold",
          }}
        >
          {discount ? `$${discount.toFixed(2)}` : <span>&mdash;</span>}
        </div>

        {/* ACTIONS: Dấu 3 chấm + menu box */}
        <div style={{ justifySelf: "self-end" }}>
          <Menus.Menu>
            <Menus.Toggle id={id} />

            <Menus.List id={id}>
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={handleCopy}
                disabled={isLoading}
              >
                Copy
              </Menus.Button>

              <Menus.Button
                icon={<HiPencil />}
                onClick={() => setShowForm(true)}
                disabled={isLoading}
              >
                Edit
              </Menus.Button>

              <Menus.Button
                icon={<HiTrash />}
                onClick={() => setShowDeleteConfirm(true)}
                disabled={isDeleting}
              >
                Delete
              </Menus.Button>
            </Menus.List>
          </Menus.Menu>
        </div>
      </Table.Row>

      {showForm && (
        <Modal closeModal={() => setShowForm(false)}>
          <CreateCabinFormv1
            editCbin={cabin}
            closeModal={() => setShowForm(false)}
          />
        </Modal>
      )}

      {showDeleteConfirm && (
        <Modal closeModal={() => setShowDeleteConfirm(false)}>
          <ConfirmDelete
            resource={`cabin ${name}`}
            onConfirm={() => {
              deleteCabin(id);
              setShowDeleteConfirm(false);
            }}
            disabled={isDeleting}
            closeModal={() => setShowDeleteConfirm(false)}
          />
        </Modal>
      )}
    </>
  );
}
