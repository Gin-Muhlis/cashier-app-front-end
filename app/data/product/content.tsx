"use client"

import React, { useState } from 'react'
import AddProduct from './addProduct';
import DeleteProduct from './deleteProduct';
import UpdateProduct from './updateProduct';
import ExportProduct from './exportProduct';
import ImportProduct from './importProduct';
import PaginationSection from '@/app/components/pagination';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import SweetAlert from '@/app/components/sweetAlert';

type EntrustedProduct = {
    id: number;
    product_name: string;
    supplier_name: string;
    purchase_price: number;
    sell_price: number;
    stock: number;
    description: string;
}

const updateProduct = async (data: EntrustedProduct | undefined) => {
    try {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/entrusted-products/${data?.id}`, data);

        return response
    } catch (error: any) {
        return error.response
    }
}


const ContentProduct = ({ entrustedProducts }: { entrustedProducts: EntrustedProduct[] }) => {
    const [data, setData] = useState<EntrustedProduct[]>(entrustedProducts)
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [stock, setStock] = useState<any>([])
    const [status, setStatus] = useState<number | boolean>(false)
    const [message, setMessage] = useState<string | boolean>(false)

    // konfigurasi pagination
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = data.slice(firstItemIndex, lastItemIndex);

    const router = useRouter();

    const handleSearchData = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value

        if (value.length > 0) {
            const newData = data.filter((data) => data.product_name.toLowerCase().includes(value))

            setData(newData)
        } else {
            setData(entrustedProducts)
        }


        setSearch(value)
    }

    const handleDoubleClick = (id: number, amount: number) => {
        const data = {
            id,
            amount
        }
        const dataStock = [...stock]

        dataStock.push(data)

        setStock(dataStock)
        
    }

    const handleEditStockChange = (id: number, amount: string) => {
        const stocks = [...stock]
        const numericValue = Number(amount.replace(/\D/g, ''));

        const data = {
            id,
            amount: numericValue
        }

        const stockIndex = stocks.findIndex(data => data.id == id)

        if (stockIndex < 0) {
            stocks.push(data)
        } else {
            const dataStock = stocks[stockIndex]

            stocks[stockIndex] = { ...dataStock, amount: numericValue }
        }

        setStock(stocks)
    }

    const handleValue = (id: number) => {
        const isStock = stock.find((data: any) => data.id == id);

        if (isStock != undefined) {
            return isStock.amount
        } else {
            const dataProduct = entrustedProducts.find((data) => data.id == id);

            return dataProduct?.stock
        }
    }

    const handleBlurStockChange = () => {
        console.log('blur')
        setStock([])
    }

    const handleSubmitStock = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        const product = entrustedProducts.find(data => data.id == stock[0].id)

        if (product) {
            const data = {
                ...product,
                stock: stock[0].amount as number
            }
    
            const response = await updateProduct(data)
            setStatus(response.status)

            if (response.status == 200) {
                setMessage('Stok produk berhasil diperbarui')
            } else {
                setMessage('Gagal memperbarui stok produk')
            }
        }
        return 
        
    }

    const checkIsEdit = (id: number) => {
        const isStock = stock.find((data: any) => data.id == id);

        return isStock ? true : false
    }

    const resetState = () => {
        setStatus(false)
        setMessage(false)
        setStock([])
        location.reload()
    }

    return (
        <div className='p-10 bg-gray-200 w-full' style={{ minHeight: '100vh' }}>
            <h1 className='font-bold text-black mb-5 text-2xl'>Produk Titipan</h1>
            <div className="w-full flex items-center gap-3 justify-between mb-8">
                <div className="flex items-center gap-3 justify-start flex-1 ">
                    <AddProduct />
                    <ExportProduct />
                    <ImportProduct />
                </div>
                <div>
                    <input type="text" id='nama_produk' value={search} onChange={handleSearchData} placeholder='Cari Nama Produk' className='input input-md basis-1/3 input-bordered text-sm' />
                </div>
            </div>
            <div className="rounded-md bg-white p-3 w-full mb-3">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className='text-base'>No</th>
                            <th className='text-base'>Nama Produk</th>
                            <th className='text-base'>Nama Supplier</th>
                            <th className='text-base'>Harga Beli</th>
                            <th className='text-base'>Harga Jual</th>
                            <th className='text-base'>Stok</th>
                            <th className='text-base'>Deskripsi</th>
                            <th className='text-center text-base'>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((product, index) => (
                            <tr key={product.id}>
                                <td>{index + 1}</td>
                                <td>{product.product_name}</td>
                                <td>{product.supplier_name}</td>
                                <td>{product.purchase_price}</td>
                                <td>{product.sell_price}</td>
                                <td className='cursor-pointer' onDoubleClick={() => handleDoubleClick(product.id, product.stock)}>
                                    {checkIsEdit(product.id) ? <form onSubmit={handleSubmitStock}>
                                        <input type="text" className='w-8 border border-solid rounded outline-none' value={handleValue(product.id)} onChange={(e) => handleEditStockChange(product.id, e.target.value)} onBlur={handleBlurStockChange} />
                                    </form> : product.stock}
                                </td>
                                <td>{product.description}</td>
                                <td className='flex items-center justify-center gap-2'>
                                    <UpdateProduct {...product} />
                                    <DeleteProduct {...product} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <PaginationSection totalItems={data.length} itemsPerPage={itemsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            {status && <SweetAlert status={Number(status)} message={message.toString()} resetState={resetState} />}
        </div>
    )
}

export default ContentProduct