// CabinRow.jsx
import styled from "styled-components";
import Table from "../ui/Table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../services/apiCabins";
import toast from "react-hot-toast";
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

  &.edit {
    background-color: #4caf50; /* Màu xanh cho nút Edit */

    &:hover {
      background-color: #45a049; /* Màu tối hơn khi hover */
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
  const { id, name, image, maxCapacity, regularPrice, discount } = cabin;
  const queryClient = useQueryClient();
  const { isLoading: isDeleteting, mutate } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onSuccess: () => {
      toast.success("Cabin deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (e) => alert(e.message),
  });

  return (
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
        {discount ? `$${discount.toFixed(2)}` : "No Discount"}
      </div>

      {/* Cột 5: Actions tách hẳn bên phải */}
      <div style={{ justifySelf: "self-end" }}>
        <Button className="edit">
          Edit
        </Button>
        <Button
          disabled={isDeleteting}
          className="delete"
          onClick={() => {
            console.log("DELETE id =", id);
            mutate(id);
          }}
        >
          Delete  
        </Button>
      </div>
    </Table.Row>
  );
}
