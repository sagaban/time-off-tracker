// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Employee } from '@customTypes/employee';

export default function handler(req: NextApiRequest, res: NextApiResponse<Employee[]>): void {
  res.status(200).json([{ fullName: 'John Doe' }, { fullName: 'Cosme Fulanito' }]);
}
