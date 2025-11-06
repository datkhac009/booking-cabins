// CabinRow.jsx
import styled from "styled-components";
import Table from "../ui/Table";
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
  const { name, image, maxCapacity, regularPrice, discount } = cabin;

  return (
    <Table.Row columns={cols}>
      {/* Cột 1: ảnh + chỉ hiển thị code "001" */}
      <CellCabin style={{justifySelf:"self-start"}}>
        <Img src={image} alt={name} />
      </CellCabin>
    <div style={{justifySelf:"start"}}>
        <p>{name}</p>
    </div>
      {/* Cột 2: center */}
      <div style={{ justifySelf: "center",textAlign:"center" }}>{maxCapacity}</div>

      {/* Cột 3 & 4: phải */}
      <div style={{ justifySelf: "center", fontVariantNumeric: "tabular-nums" }}>
        ${regularPrice}
      </div>
      <div style={{ justifySelf: "center" }}>
        {discount ? `$${discount}` : "-"}
      </div>

      {/* Cột 5: Actions tách hẳn bên phải */}
      <div style={{ justifySelf: "self-end" }}>
        <button className="btn-outline">Delete</button>
      </div>
    </Table.Row>
  );
}
