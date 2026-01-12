// CabinRow.jsx
import styled from "styled-components";
import Table from "../ui/Table";
import { useState } from "react";
import CreateCabinFormv1 from "../features/cabins/CreateCabinFormv1";
import { useDeleteCabin } from "../features/cabins/useDeleteCabin";
import { useCreateCabin } from "../features/cabins/useCreateCabin";
import { HiSquare2Stack, HiPencil, HiTrash } from "react-icons/hi2";
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
const Button = styled.button`
  padding: 8px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: var(--color-grey-100);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 20px;
    height: 20px;
  }

  &.copy svg {
    color: #10b981;
  }

  &.edit svg {
    color: var(--color-brand-600);
  }

  &.delete svg {
    color: #ef4444;
  }

  &.copy:hover {
    background-color: #d1fae5;
  }

  &.edit:hover {
    background-color: var(--color-brand-100);
  }

  &.delete:hover {
    background-color: #fee2e2;
  }
`;

export default function CabinRow({ cabin, cols }) {
  const [showForm, setShowForm] = useState(false);
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
      <Table.Row columns={cols}>
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

        {/* Cột 5: Actions tách hẳn bên phải */}

        <div style={{ justifySelf: "self-end", display: "flex", gap: "4px" }}>
          <Button className="copy" disabled={isLoading} onClick={() => handleCopy()} title="Copy cabin">
            <HiSquare2Stack />
          </Button>
          <Button className="edit" disabled={isLoading} onClick={() => setShowForm((show) => !show)} title="Edit cabin">
            <HiPencil />
          </Button>
          <Button
            disabled={isDeleting}
            className="delete"
            onClick={() => {
              console.log("DELETE id =", id);
              deleteCabin(id);
            }}
            title="Delete cabin"
          >
            <HiTrash />
          </Button>
        </div>
      </Table.Row>
      {showForm && <CreateCabinFormv1 editCbin={cabin} />}
    </>
  );
}
