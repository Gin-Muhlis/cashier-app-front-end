import axios from 'axios'
import React from 'react'
import UpdateDetailTransaction from './updateDetailTransaction';
import DeleteDetailTransaction from './deleteDetailTransaction';
import AddDetailTransaction from './addDetailTransactions';

type DetailTransaction = {
  id: number;
  sub_total: number;
  unit_price: number;
  quantity: number;
  transaction: {
    id: number;
    total_payment: number
  };
  menu: {
    id: number;
    name: string
  }
}

type Transaction = {
    id: number;
    total_payment: number
}

type Menu = {
    id: number;
    name: string
}

 
const getDetailTransactions = async () => {
  let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/transaction-details`);

  return response.data.data;
}
 
const getTransactions = async () => {
  let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/transactions`);

  return response.data.data;
}
 
const getMenus = async () => {
  let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/menus`);

  return response.data.data;
}

const ListTransaction = async () => {
  let transactions: Transaction[] = await getTransactions();
  let detailTransactions: DetailTransaction[] = await getDetailTransactions();
  let menus: Menu[] = await getMenus();
  
  return (
    <div className='p-10 bg-gray-200 w-full' style={{ minHeight: '100vh' }}>
      <h1 className='font-bold text-black mb-5 text-2xl'>List Detail Transaksi</h1>
      {/* <AddDetailTransaction transactions={transactions} menus={menus} /> */}
      <div className="rounded-md bg-white p-3 w-full">
        <table className="table w-full">
            <thead>
              <tr>
                <th className='text-base'>No</th>
                <th className='text-base'>Sub Total</th>
                <th className='text-base'>Harga Satuan</th>
                <th className='text-base'>Jumlah</th>
                <th className='text-base'>Menu</th>
                <th className='text-base'>Transaksi (total)</th>
                {/* <th className='text-center text-base'>Aksi</th> */}
              </tr>
            </thead>
            <tbody>
              {detailTransactions.map((detailTransaction, index) => (
                <tr key={detailTransaction.id}>
                  <td>{index + 1}</td>
                  <td>{detailTransaction.sub_total}</td>
                  <td>{detailTransaction.unit_price}</td>
                  <td>{detailTransaction.quantity}</td>
                  <td>{detailTransaction.menu.name}</td>
                  <td>{detailTransaction.transaction.total_payment}</td>
                  {/* <td className='flex items-center justify-center gap-2'>
                    <UpdateDetailTransaction transactions={transactions} detailTransaction={detailTransaction} menus={menus} />
                    <DeleteDetailTransaction {...detailTransaction} />
                  </td> */}
                </tr>
              ))}
            </tbody>
        </table>
      </div>
      
    </div>
  )
}

export default ListTransaction