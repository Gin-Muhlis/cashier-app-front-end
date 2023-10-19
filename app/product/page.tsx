import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../Config/config'
import DeleteCategory from './deleteCategory';
import UpdateCategory from './updateCategory';
import AddProduct from './addProduct';


type Product = {
  id: number;
  name: string;
  stock: number;
  price: number;
  tag: string;
  image: string;
  category: {
    name: string;
  };
}

type Category = {
  id: number;
  name: string;
}

const getProducts = async () => {
  let response = await axios.get(`${BASE_URL}/product`);

  return response.data.data;
}

const getCategories = async () => {
  let response = await axios.get(`${BASE_URL}/category`);

  return response.data.data;
}

const Product = async () => {
  let products: Product[] = await getProducts();
  let categories: Category[] = await getCategories();

  const formatPrice = (price: number) => {
    const formattedPrice = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(price);

    return formattedPrice;
  }
  
  return (
    <div className='p-10 bg-gray-200 w-full' style={{ minHeight: '100vh' }}>
      <h1 className='font-bold text-black mb-5 text-2xl'>Produk</h1>

      <AddProduct listCategories={categories} />

      <div className="rounded-md bg-white p-3 w-full">
        <table className="table w-full">
            <thead>
              <tr>
                <th className='text-base'>No</th>
                <th className='text-base'>Nama Produk</th>
                <th className='text-base'>Stok</th>
                <th className='text-base'>Harga</th>
                <th className='text-base'>Tag</th>
                <th className='text-base'>Kategori</th>
                <th className='text-base'>Gambar</th>
                <th className='text-center text-base'>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.stock}</td>
                  <td>{formatPrice(product.price)}</td>
                  <td>{product.tag}</td>
                  <td>{product.category.name}</td>
                  <td>
                    <img src={`${BASE_URL}/${product.image}`} alt="Gambar Produk" className='w-12 h-12' />
                  </td>
                  <td className='flex items-center justify-center gap-2'>
                    <UpdateCategory {...product} />
                    <DeleteCategory {...product} />
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default Product