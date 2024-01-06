import axios from 'axios'
import React from 'react'
import AddRole from './addRole';
import DeleteRole from './deleteRole';
import UpdateRole from './updateRole';

type Role = {
  id: number;
  name: string;
}
 
const getRoles = async () => {
  let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/roles`);

  return response.data.data;
}

const Role = async () => {
  let roles: Role[] = await getRoles();
  
  return (
    <div className='p-10 bg-gray-200 w-full' style={{ minHeight: '100vh' }}>
      <h1 className='font-bold text-black mb-5 text-2xl'>Role</h1>
      <AddRole />
      <div className="rounded-md bg-white p-3 w-full">
        <table className="table w-full">
            <thead>
              <tr>
                <th className='text-base'>No</th>
                <th className='text-base'>Role</th>
                <th className='text-center text-base'>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role, index) => (
                <tr key={role.id}>
                  <td>{index + 1}</td>
                  <td>{role.name}</td>
                  <td className='flex items-center justify-center gap-2'>
                    <UpdateRole {...role} />
                    <DeleteRole {...role} />
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default Role