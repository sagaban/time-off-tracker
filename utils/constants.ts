import { TimeOffCode } from '@customTypes/timeOff';

export const TimeOffTypes = {
  [TimeOffCode.PTO]: {
    code: TimeOffCode.PTO,
    label: 'Paid Time Off',
    color: 'red-600',
  },
  [TimeOffCode.NPTO]: {
    code: TimeOffCode.NPTO,
    label: 'No Paid Time Off',
    color: 'blue-600',
  },
  [TimeOffCode.Sick]: {
    code: TimeOffCode.Sick,
    label: 'Sick leave',
    color: 'green-600',
  },
  [TimeOffCode.BH]: {
    code: TimeOffCode.BH,
    label: 'Bank Holiday',
    color: 'yellow-600',
  },
};

export const TimeOffTypesArray = Object.values(TimeOffTypes);

export const SUPPORTED_YEARS = [2020, 2021, 2022];
