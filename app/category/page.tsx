import axios from 'axios'
import React from 'react'
import AddCategory from './addCategory';
import DeleteCategory from './deleteCategory';
import UpdateCategory from './updateCategory';

type Category = {
  id: number;
  name: string;
}
 
const getCategories = async () => {
  let response = await axios.get(`http://127.0.0.1:8000/api/categories`);

  return response.data.data;
}

const Category = async () => {
  let categories: Category[] = await getCategories();
  
  return (
    <div className='p-10 bg-gray-200 w-full' style={{ minHeight: '100vh' }}>
      <h1 className='font-bold text-black mb-5 text-2xl'>Kategori</h1>
      <AddCategory />
      <div className="rounded-md bg-white p-3 w-full">
        <table className="table w-full">
            <thead>
              <tr>
                <th className='text-base'>No</th>
                <th className='text-base'>Nama kategori</th>
                <th className='text-center text-base'>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category.id}>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td className='flex items-center justify-center gap-2'>
                    <UpdateCategory {...category} />
                    <DeleteCategory {...category} />
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default Category