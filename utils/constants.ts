import { TimeOffCode } from '@customTypes/timeOff';

export const TimeOffTypes = [
  {
    code: TimeOffCode.PTO,
    label: 'Paid Time Off',
    color: 'red-600',
  },
  {
    code: TimeOffCode.NPTO,
    label: 'No Paid Time Off',
    color: 'blue-600',
  },
  {
    code: TimeOffCode.Sick,
    label: 'Sick leave',
    color: 'green-600',
  },
  {
    code: TimeOffCode.BH,
    label: 'Bank Holiday',
    color: 'yellow-600',
  },
];

export const SUPPORTED_YEARS = [2020, 2021, 2022];
