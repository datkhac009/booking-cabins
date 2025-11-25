// CabinRow.jsx
import styled from "styled-components";
import Table from "../ui/Table";
import { useState } from "react";
import CreateCabinFormv1 from "../features/cabins/CreateCabinFormv1";
import { useDeleteCabin } from "../features/cabins/useDeleteCabin";
import { useCreateCabin } from "../features/cabins/useCreateCabin";
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
  padding: 10px 20px;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
  width: 100px; /* Đặt chiều rộng cố định cho cả hai nút */
  margin: 5px; /* Thêm khoảng cách giữa các nút */
 &.copy {
    background-color: #00ce4174; /* Màu đỏ cho nút Delete */

    &:hover {
      background-color: #00ff5174; /* Màu tối hơn khi hover */
    }
  }
  &.edit {
    background-color: var(--color-brand-500);

    &:hover {
      background-color: var(--color-brand-700); /* Màu tối hơn khi hover */
    }
  }

  &.delete {
    background-color: #f44336; /* Màu đỏ cho nút Delete */

    &:hover {
      background-color: #d32f2f; /* Màu tối hơn khi hover */
    }
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

        <div style={{ justifySelf: "self-end" }}>
          <Button className="copy" disabled={isLoading} onClick={ () => handleCopy() }>Copy</Button>
          <Button className="edit" disabled={isLoading} onClick={() => setShowForm((show) => !show)}>
            Edit
          </Button>
          <Button
            disabled={isDeleting}
            className="delete"
            onClick={() => {
              console.log("DELETE id =", id);
              deleteCabin(id);
            }}
          >
            Delete
          </Button>
        </div>
      </Table.Row>
      {showForm && <CreateCabinFormv1 editCbin={cabin} />}
    </>
  );
}
