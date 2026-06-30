import { useDarkMode } from '../../context/DarkModeContext';
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import styled from 'styled-components';
import Heading from '../../ui/Heading';
import DashboardBox from './DashboardBox';

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;
  padding: 2.8rem;

  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-200);
  }
`;

const ChartHeader = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 1.6rem;
`;

const ChartEyebrow = styled.p`
  color: var(--color-grey-500);
  font-size: 1.3rem;
  font-weight: 600;
`;

function SalesChart({ bookings, numDays }) {
  // In the chart we need to set colors, but we can't do it based on CSS variables, because we have no access to them here. So let's set them manually
  const { isDarkMode } = useDarkMode();

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });
  
  //Real data
  const data = allDates.map((date) => {
    return {
      label: format(date, 'MMM dd'),
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
        extrasSales: { stroke: '#22c55e', fill: '#22c55e' },
        text: '#e5e7eb',
        background: '#18212f',
      }
    : {
        totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
        extrasSales: { stroke: '#16a34a', fill: '#dcfce7' },
        text: '#374151',
        background: '#fff',
      };

  return (
    <StyledSalesChart>
      <ChartHeader>
        <div>
          <Heading type='h2'>Sales performance</Heading>
          <ChartEyebrow>
            {format(allDates.at(0), 'MMM dd yyyy')} -{' '}
            {format(allDates.at(-1), 'MMM dd yyyy')}
          </ChartEyebrow>
        </div>
      </ChartHeader>

      <ResponsiveContainer width='100%' height={320}>
        <AreaChart
          data={data}
          width='100%'
          height={400}
          margin={{ left: 6, right: 18, top: 12, bottom: 0 }}
        >
          <XAxis
            dataKey='label'
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit='$'
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray='3 6' vertical={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: colors.background,
              border: '1px solid var(--color-grey-200)',
              borderRadius: 'var(--border-radius-sm)',
              boxShadow: 'var(--shadow-md)',
            }}
          />
          <Area
            type='monotone'
            dataKey='totalSales'
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            unit='$'
            name='Total sales'
          />
          <Area
            type='monotone'
            dataKey='extrasSales'
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            unit='$'
            name='Extras sales'
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
