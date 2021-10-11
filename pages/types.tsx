import type { NextPage } from 'next';
import { TimeOffTypesArray } from '@utils/constants';

const Home: NextPage = () => {
  return (
    <div className="prose mx-auto">
      <div className="flex justify-between">
        <h1>Time off types </h1>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>Code</th>
              <th>Label</th>
              <th>Color</th>
            </tr>
          </thead>
          <tbody>
            {TimeOffTypesArray.map((tot) => (
              <tr key={tot.code} className="overflow-x-auto">
                <th>{tot.code}</th>
                <td>{tot.label}</td>
                <td>
                  <div className={`badge bg-${tot.color} border-${tot.color}`}>{tot.color}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
