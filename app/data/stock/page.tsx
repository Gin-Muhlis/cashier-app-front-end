import axios from 'axios'
import React from 'react'
import AddStock from './addStock';
import DeleteStock from './deleteStock';
import UpdateStock from './updateStock';

type Stock = {
  id: number;
  amount: number;
  menu: {
    id: number,
    name: string
  }
}

type Menu = {
    id: number;
    name: string;
  }
 
const getStocks = async () => {
  let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/stocks`);

  return response.data.data;
}

const getMenus = async () => {
    let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/menus`);

    return response.data.data;
}


const Type = async () => {
  let types: Stock[] = await getStocks();
  let menus: Menu[] = await getMenus();
  
  return (
    <div className='p-10 bg-gray-200 w-full' style={{ minHeight: '100vh' }}>
      <h1 className='font-bold text-black mb-5 text-2xl'>Stok</h1>
      <AddStock menus={menus} />
      <div className="rounded-md bg-white p-3 w-full">
        <table className="table w-full">
            <thead>
              <tr>
                <th className='text-base'>No</th>
                <th className='text-base'>Menu</th>
                <th className='text-base'>Jumlah</th>
                <th className='text-center text-base'>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {types.map((stock, index) => (
                <tr key={stock.id}>
                  <td>{index + 1}</td>
                  <td>{stock.menu.name}</td>
                  <td>{stock.amount}</td>
                  <td className='flex items-center justify-center gap-2'>
                    <UpdateStock stock={stock} menus={menus} />
                    <DeleteStock {...stock} />
                  </td>     
                </tr>
              ))}
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default Type