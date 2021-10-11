// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { TimeOff } from '@customTypes/timeOff';
import { ErrorData } from '@customTypes/errors';
import TimeOffModel from '@models/TimeOff';
import dbConnect from '@utils/dbConnect';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TimeOff[] | ErrorData>,
): Promise<void> {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const timesOff = await TimeOffModel.find({});
        res.status(200).json(timesOff);
      } catch (error) {
        res.status(400).json({ message: "Times off couldn't be fetched", stack: error });
      }
      break;
    case 'POST':
      try {
        // TODO: Check that Time off does now exist
        const timeOff = await TimeOffModel.create(req.body);
        res.status(201).json(timeOff);
      } catch (error) {
        res.status(400).json({ message: "Time off couldn't be created", stack: error });
      }
      break;
    default:
      res.status(400).json({ message: 'Error: HTTP method not supported' });
      break;
  }
}
