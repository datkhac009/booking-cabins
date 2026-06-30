import styled from 'styled-components';
import Heading from './../../ui/Heading';
import Row from './../../ui/Row';
import Spinner from './../../ui/Spinner';
import TodayItem from '../dashboard/TodayItem';
import useActivityTodayStays from './useActivityTodayStays';
import DashboardBox from '../dashboard/DashboardBox';

const StyledToday = styled(DashboardBox)`
  display: flex;
  flex-direction: column;
  grid-column: 1 / span 2;
  min-height: 34rem;

  @media (max-width: 680px) {
    grid-column: 1;
  }
`;

const TodayList = styled.ul`
  overflow-y: auto;
  margin: -0.8rem 0;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  flex: 1;
  display: grid;
  place-items: center;
  text-align: center;
  min-height: 20rem;
  border: 1px dashed var(--color-grey-200);
  border-radius: var(--border-radius-md);
  background-color: var(--color-grey-50);
  color: var(--color-grey-500);
  font-size: 1.6rem;
  font-weight: 600;
`;

function Today() {
  const { isLoading, stays } = useActivityTodayStays();

  return (
    <StyledToday>
      <Row type='horizontal'>
        <Heading type='h2'>Today</Heading>
        {/* Through the 'as' props, we make the button Polymorphic! Built-in into styled components. The polymorphic component pattern comes in handy when we need flexibility on the rendered HTML element. */}
        {/* id of -1 means there is no ID, which means a new booking will be made for a new guest */}
      </Row>

      {!isLoading ? (
        stays?.length > 0 ? (
          <TodayList>
            {stays.map((stay) => (
              <TodayItem key={stay.id} stay={stay} />
            ))}
          </TodayList>
        ) : (
          <NoActivity>No activity today...</NoActivity>
        )
      ) : (
        <Spinner />
      )}
    </StyledToday>
  );
}

export default Today;
