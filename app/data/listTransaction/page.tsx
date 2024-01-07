import axios from 'axios'
import React from 'react'
import DeleteTransaction from './deleteListrancation';
import UpdateTransaction from './updateListTransaction';

type Transaction = {
  id: number;
  date: string;
  total_payment: number;
  description: string;
  payment: {
    id: number;
    name: string
  };
  user: {
    id: number;
    name: string
  }
}

type Payment = {
    id: number;
    name: string
}

type User = {
    id: number;
    name: string
}

 
const getTransactions = async () => {
  let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/transactions`);

  return response.data.data;
}
 
const getPaymentMethods = async () => {
  let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/payment_methods`);

  return response.data.data;
}
 
const getUsers = async () => {
  let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);

  return response.data.data;
}

const ListTransaction = async () => {
  let transactions: Transaction[] = await getTransactions();
  let payments: Payment[] = await getPaymentMethods();
  let users: User[] = await getUsers();
  
  return (
    <div className='p-10 bg-gray-200 w-full' style={{ minHeight: '100vh' }}>
      <h1 className='font-bold text-black mb-5 text-2xl'>List Transaksi</h1>
      <div className="rounded-md bg-white p-3 w-full">
        <table className="table w-full">
            <thead>
              <tr>
                <th className='text-base'>No</th>
                <th className='text-base'>Tanggal</th>
                <th className='text-base'>Total Pembayaran</th>
                <th className='text-base'>Jenis Pembayaran</th>
                <th className='text-base'>Kasir</th>
                <th className='text-base'>Deskripsi</th>
                <th className='text-center text-base'>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={transaction.id}>
                  <td>{index + 1}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.total_payment}</td>
                  <td>{transaction.payment.name}</td>
                  <td>{transaction.user.name}</td>
                  <td>{transaction.description}</td>
                  <td className='flex items-center justify-center gap-2'>
                    <UpdateTransaction transaction={transaction} payments={payments} users={users} />
                    <DeleteTransaction {...transaction} />
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>
      
    </div>
  )
}

export default ListTransaction