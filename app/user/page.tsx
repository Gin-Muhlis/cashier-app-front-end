import axios from 'axios'
import React from 'react'
import AddUser from './addUser';
import UpdateUser from './updateUser';
import DeleteUser from './deleteUser';

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}
 
const getUsers = async () => {
  let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);

  return response.data.data;
}

const Customer = async () => {
  let users: User[] = await getUsers();
  
  return (
    <div className='p-10 bg-gray-200 w-full' style={{ minHeight: '100vh' }}>
      <h1 className='font-bold text-black mb-5 text-2xl'>User</h1>
      <AddUser />
      <div className="rounded-md bg-white p-3 w-full">
        <table className="table w-full">
            <thead>
              <tr>
                <th className='text-base'>No</th>
                <th className='text-base'>Nama Pelanggan</th>
                <th className='text-base'>Email Pelanggan</th>
                <th className='text-base'>No Telp Pelanggan</th>
                <th className='text-base'>Alamat Pelangan</th>
                <th className='text-center text-base'>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>
                  <td className='flex items-center justify-center gap-2'>
                    <UpdateUser {...user} />
                    <DeleteUser {...user} />
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