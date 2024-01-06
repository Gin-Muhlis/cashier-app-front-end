import axios from 'axios'
import React from 'react'
import AddCustomer from './addCustomer';
import DeleteCustomer from './deleteCustomer';
import UpdateCustomer from './updateCustomer';

type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}
 
const getCustomers = async () => {
  let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/customers`);

  return response.data.data;
}

const Customer = async () => {
  let customers: Customer[] = await getCustomers();
  
  return (
    <div className='p-10 bg-gray-200 w-full' style={{ minHeight: '100vh' }}>
      <h1 className='font-bold text-black mb-5 text-2xl'>Pelanggan</h1>
      <AddCustomer />
      <div className="rounded-md bg-white p-3 w-full">
        <table className="table w-full">
            <thead>
              <tr>
                <th className='text-base'>No</th>
                <th className='text-base'>Nama</th>
                <th className='text-base'>Email</th>
                <th className='text-base'>No Telp</th>
                <th className='text-base'>Alamat</th>
                <th className='text-center text-base'>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => (
                <tr key={customer.id}>
                  <td>{index + 1}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.address}</td>
                  <td className='flex items-center justify-center gap-2'>
                    <UpdateCustomer {...customer} />
                    <DeleteCustomer {...customer} />
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default Customer