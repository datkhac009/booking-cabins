import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  HiPencil,
  HiTrash,
  HiEye,
} from 'react-icons/hi2';

import Tag from '../../ui/Tag';
import Menus from '../../ui/Menus';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';

import { useDeleteBooking } from './useDeleteBooking';
import { formatCurrency } from '../../utils/helpers';
import { formatDistanceFromNow } from '../../utils/helpers';
import { format, isToday } from 'date-fns';

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
`;

function BookingRow({ booking }) {
  const { mutate: deleteBooking, isLoading: isDeleting } = useDeleteBooking();
  const navigate = useNavigate();
  console.log(booking)
  // Extract values from booking with fallbacks
  const bookingId = booking.id;
  const startDate = booking.startDate;
  const endDate = booking.endDate;
  const numNights = booking.numNight || 0; 
  const numGuests = booking.numGuests || 0;
  const cabinsPrice = booking.cabinsPrice || 0;
  const extrasPrice = booking.extrasPrice || 0;
  const totalPrice = cabinsPrice + extrasPrice;
  
  // Since you don't have status, guestId, cabinId in DB, we'll use defaults
  const status = 'unconfirmed'; // Default status
  const cabinName = `Cabin ${bookingId}`; // Placeholder
  const guestName = 'Guest'; // Placeholder
  const guestEmail = 'guest@example.com'; // Placeholder

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <Table.Row role='row'>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{guestEmail}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}{' '}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), 'MMM dd yyyy')} &mdash;{' '}
          {format(new Date(endDate), 'MMM dd yyyy')}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              onClick={() => navigate(`/bookings/${bookingId}`)}
              icon={<HiEye />}
            >
              See details
            </Menus.Button>

            <Menus.Button icon={<HiPencil />}>Edit booking</Menus.Button>

            <Modal.Toggle opens='delete'>
              <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
            </Modal.Toggle>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name='delete'>
          <ConfirmDelete
            resource='booking'
            onConfirm={(options) => deleteBooking(bookingId, options)}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;