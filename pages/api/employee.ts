// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Employee } from '@customTypes/employee';
import { ErrorData } from '@customTypes/errors';
import EmployeeModel from '@models/Employee';
import dbConnect from '@utils/dbConnect';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Employee[] | ErrorData>,
): Promise<void> {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const employees = await EmployeeModel.find({});
        res.status(200).json(employees);
      } catch (error) {
        res.status(400).json({ message: "Employees couldn't be fetched", stack: error });
      }
      break;
    case 'POST':
      try {
        const employees = await EmployeeModel.create(req.body);
        res.status(201).json(employees);
      } catch (error) {
        res.status(400).json({ message: "Employee couldn't be created", stack: error });
      }
      break;
    default:
      res.status(400).json({ message: 'Error: HTTP method not supported' });
      break;
  }
}
