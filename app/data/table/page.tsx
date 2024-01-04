import axios from 'axios'
import React from 'react'
import AddTable from './addTable';
import DeleteTable from './deleteTable';
import UpdateTable from './updateTable';

type Table = {
  id: number;
  table_number: number;
  capacity: number;
  status: string;
}
 
const getTables = async () => {
  let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tables`);

  return response.data.data;
}

const Table = async () => {
  let categories: Table[] = await getTables();
  
  return (
    <div className='p-10 bg-gray-200 w-full' style={{ minHeight: '100vh' }}>
      <h1 className='font-bold text-black mb-5 text-2xl'>Meja</h1>
      <AddTable />
      <div className="rounded-md bg-white p-3 w-full">
        <table className="table w-full">
            <thead>
              <tr>
                <th className='text-base'>No</th>
                <th className='text-center'>No Meja</th>
                <th className='text-center'>Kapasitas</th>
                <th className='text-base'>Status</th>
                <th className='text-center text-base'>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((table, index) => (
                <tr key={table.id}>
                  <td>{index + 1}</td>
                  <td className='text-center'>{table.table_number}</td>
                  <td className='text-center'>{table.capacity}</td>
                  <td>{table.status}</td>
                  <td className='flex items-center justify-center gap-2'>
                    <UpdateTable {...table} />
                    <DeleteTable {...table} />
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table