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
  width: 84px;
  height: 64px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(16, 24, 40, 0.08);
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
        {discount ? `$${discount.toFixed(2)}` : "-"}
      </div>

      {/* Cột 5: Actions tách hẳn bên phải */}
      <div style={{ justifySelf: "self-end" }}>
        <button
          disabled={isDeleteting}
          className="btn-outline"
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            color: "black",
            fontWeight: "bold",
            transition: "background-color 0.3s, color 0.3s",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#f0f0f0";
            e.target.style.color = "#333";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#fff";
            e.target.style.color = "black";
          }}
          onClick={() => {
            console.log("DELETE id =", id);
            mutate(id);
          }}
        >
          Delete
        </button>
      </div>
    </Table.Row>
  );
}
