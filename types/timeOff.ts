export type TimeOff = {
  _id?: string;
  startDate: Date;
  endDate: Date;
  employee: string; //ID
  type: TimeOffCode;
};

export enum TimeOffCode {
  PTO = 'pto',
  NPTO = 'npto',
  Sick = 'sick',
  BH = 'bh',
}
