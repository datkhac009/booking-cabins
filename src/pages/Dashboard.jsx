import DashboardFilter from "../features/dashboard/DashboardFilter";
import Heading from "../ui/Heading";
import DashboardLayout from "./../features/dashboard/DashboardLayout";
import styled from "styled-components";

const DashboardHeader = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 2.4rem;
  margin-bottom: 2.8rem;

  @media (max-width: 760px) {
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

function Dashboard() {
  return (
    <>
      <DashboardHeader>
        <TitleGroup>
          <Heading as="h1">Dashboard</Heading>
          <Subtitle>Track bookings, revenue, stays, and daily operations.</Subtitle>
        </TitleGroup>
        <DashboardFilter />
      </DashboardHeader>
      <DashboardLayout />
    </>
  );
}

export default Dashboard;
