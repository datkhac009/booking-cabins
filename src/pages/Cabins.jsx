import Heading from "../ui/Heading";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperation from "../features/cabins/CabinTableOperation";
import styled from "styled-components";

const CabinsHeader = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 2.4rem;
  margin-bottom: 2.4rem;

  @media (max-width: 900px) {
    align-items: stretch;
    flex-direction: column;
  }
`;

const TitleGroup = styled.div`
  display: grid;
  gap: 0.4rem;
`;

const Subtitle = styled.p`
  color: var(--color-grey-500);
  font-size: 1.5rem;
`;

const CabinsContent = styled.div`
  display: grid;
  gap: 1.6rem;
`;

function Cabins() {
  return (
    <>
      <CabinsHeader>
        <TitleGroup>
          <Heading as="h1">All cabins</Heading>
          <Subtitle>Manage cabin inventory, pricing, and availability.</Subtitle>
        </TitleGroup>
        <CabinTableOperation />
      </CabinsHeader>

      <CabinsContent>
        <CabinTable />
        <AddCabin />
      </CabinsContent>
    </>
  );
}

export default Cabins;
