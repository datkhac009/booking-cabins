import { add } from 'date-fns';

function fromToday(numDays, withTime = false) {
  const date = add(new Date(), { days: numDays });
  if (!withTime) date.setUTCHours(0, 0, 0, 0);
  return date.toISOString().slice(0, -1);
}

export const bookings = [
  // CABIN 001
  {
    created_at: fromToday(-20, true),
    startDate: fromToday(0),
    endDate: fromToday(7),
    cabinId: 1,
    guestId: 1,
    hasBreakfast: true,
    obvervations:
      'I have a gluten allergy and would like to request a gluten-free breakfast.',
    isPaid: false,
    numGuests: 1,
  },
  {
    created_at: fromToday(-33, true),
    startDate: fromToday(-23),
    endDate: fromToday(-13),
    cabinId: 1,
    guestId: 2,
    hasBreakfast: true,
    obvervations: '',
    isPaid: true,
    numGuests: 2,
  },
  {
    created_at: fromToday(-27, true),
    startDate: fromToday(12),
    endDate: fromToday(18),
    cabinId: 1,
    guestId: 3,
    hasBreakfast: false,
    obvervations: '',
    isPaid: false,
    numGuests: 2,
  },

  // CABIN 002
  {
    created_at: fromToday(-45, true),
    startDate: fromToday(-45),
    endDate: fromToday(-29),
    cabinId: 2,
    guestId: 4,
    hasBreakfast: false,
    obvervations: '',
    isPaid: true,
    numGuests: 2,
  },
  {
    created_at: fromToday(-2, true),
    startDate: fromToday(15),
    endDate: fromToday(18),
    cabinId: 2,
    guestId: 5,
    hasBreakfast: true,
    obvervations: '',
    isPaid: true,
    numGuests: 2,
  },
  {
    created_at: fromToday(-5, true),
    startDate: fromToday(33),
    endDate: fromToday(48),
    cabinId: 2,
    guestId: 6,
    hasBreakfast: true,
    obvervations: '',
    isPaid: false,
    numGuests: 2,
  },

  // CABIN 003
  {
    created_at: fromToday(-65, true),
    startDate: fromToday(-25),
    endDate: fromToday(-20),
    cabinId: 3,
    guestId: 7,
    hasBreakfast: true,
    obvervations: '',
    isPaid: true,
    numGuests: 4,
  },
  {
    created_at: fromToday(-2, true),
    startDate: fromToday(-2),
    endDate: fromToday(0),
    cabinId: 3,
    guestId: 8,
    hasBreakfast: false,
    obvervations: 'We will be bringing our small dog with us',
    isPaid: true,
    numGuests: 3,
  },
  {
    created_at: fromToday(-14, true),
    startDate: fromToday(-14),
    endDate: fromToday(-11),
    cabinId: 3,
    guestId: 9,
    hasBreakfast: true,
    obvervations: '',
    isPaid: true,
    numGuests: 4,
  },

  // CABIN 004
  {
    created_at: fromToday(-30, true),
    startDate: fromToday(-4),
    endDate: fromToday(8),
    cabinId: 4,
    guestId: 1,
    hasBreakfast: true,
    obvervations: '',
    isPaid: true,
    numGuests: 4,
  },
  {
    created_at: fromToday(-1, true),
    startDate: fromToday(12),
    endDate: fromToday(17),
    cabinId: 4,
    guestId: 2,
    hasBreakfast: true,
    obvervations: '',
    isPaid: false,
    numGuests: 4,
  },
  {
    created_at: fromToday(-3, true),
    startDate: fromToday(18),
    endDate: fromToday(19),
    cabinId: 4,
    guestId: 3,
    hasBreakfast: false,
    obvervations: '',
    isPaid: true,
    numGuests: 1,
  },
];