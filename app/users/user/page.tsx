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
  role: {
    id: number,
    name: string
  }
}

type Role = {
  id: number,
  name: string
}
 
const getUsers = async () => {
  let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);

  return response.data.data;
}

const getRoles = async () => {
  let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/roles`);

  return response.data.data;
}

const Customer = async () => {
  let users: User[] = await getUsers();
  let roles: Role[] = await getRoles();
  
  return (
    <div className='p-10 bg-gray-200 w-full' style={{ minHeight: '100vh' }}>
      <h1 className='font-bold text-black mb-5 text-2xl'>User</h1>
      <AddUser roles={roles} />
      <div className="rounded-md bg-white p-3 w-full">
        <table className="table w-full">
            <thead>
              <tr>
                <th className='text-base'>No</th>
                <th className='text-base'>Nama</th>
                <th className='text-base'>Email</th>
                <th className='text-base'>No Telp</th>
                <th className='text-base'>Alamat</th>
                <th className='text-base'>Role</th>
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
                  <td>{user.role.name}</td>
                  <td className='flex items-center justify-center gap-2'>
                    <UpdateUser user={user} roles={roles} />
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