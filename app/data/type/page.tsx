import axios from 'axios'
import React from 'react'
import AddType from './addType';
import DeleteType from './deleteType';
import UpdateType from './updateType';

type Type = {
  id: number;
  type_name: string;
  category: {
    id: number,
    name: string
  }
}

type Category = {
    id: number;
    name: string;
  }
 
const getTypes = async () => {
  let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/types`);

  return response.data.data;
}

const getCategories = async () => {
    let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);

    return response.data.data;
}


const Type = async () => {
  let types: Type[] = await getTypes();
  let categories: Category[] = await getCategories();
  
  return (
    <div className='p-10 bg-gray-200 w-full' style={{ minHeight: '100vh' }}>
      <h1 className='font-bold text-black mb-5 text-2xl'>Jenis</h1>
      <AddType categories={categories} />
      <div className="rounded-md bg-white p-3 w-full">
        <table className="table w-full">
            <thead>
              <tr>
                <th className='text-base'>No</th>
                <th className='text-base'>Nama Jenis</th>
                <th className='text-base'>Nama Kategori</th>
                <th className='text-center text-base'>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {types.map((type, index) => (
                <tr key={type.id}>
                  <td>{index + 1}</td>
                  <td>{type.type_name}</td>
                  <td>{type.category.name}</td>
                  <td className='flex items-center justify-center gap-2'>
                    <UpdateType type={type} categories={categories} />
                    <DeleteType {...type} />
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